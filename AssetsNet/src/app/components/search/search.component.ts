import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, debounceTime, forkJoin, map, of, startWith } from 'rxjs';
import { UpgradeTariffPlanComponent } from 'src/app/_modals/tariffplan/upgrade-tariff-plan/upgrade-tariff-plan.component';
import { ChatGptService } from 'src/app/_services/chat-gpt.service';
import { NewsService } from 'src/app/_services/news.service';
import { PaymentService } from 'src/app/_services/payment.service';
import { StocksService } from 'src/app/_services/stocks.service';
import { UpgradeTariffService } from 'src/app/_services/upgrade-tariff.service';
import { ChatGptQuery } from 'src/app/models/chatGpt/chatGptQuery';
import { PaymentState } from 'src/app/models/tariffPlan/paymentState';
import { UpgradeTariffRequest } from 'src/app/models/tariffPlan/upgradeTariffRequest';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  stockFilter = new FormControl('');
  stockNames: string[] | null = [];
  filteredStockNames?: Observable<string[]>;
  chatGptQuery: ChatGptQuery = {
    query: '',
    conversationId: null
  }
  targetStock: string = '';
  aiResponse: string = '';
  isResponseObtained: boolean = false;
  upgradeTariffPlanRequest: UpgradeTariffRequest = {
    tariffPlan: 0,
    paymentState: 0
  }

  constructor(private stocksService: StocksService,
    private newsService: NewsService,
    private chatGptService: ChatGptService,
    public dialogRef: MatDialog,
    private upgradeTariffService: UpgradeTariffService,
    private paymentService: PaymentService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
  ) { }
    

  ngOnInit(): void {
    const passedStockName = this.route.snapshot.queryParamMap.get('stockName');
    if (passedStockName) {
      console.log(passedStockName);
      this.getFastForecast(passedStockName);
    }
    else {
      this.getStockNames();

      this.filteredStockNames = this.stockFilter.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        map(value => this.searchStocksByName(value!).slice(0, 10))
      );

      if (this.upgradeTariffService.getOrderForUpgradeFromLocalStorage !== null) {
        this.upgradeTariffPlan();
      }
    }
  }

  getStockNames() {
    if (this.stocksService.checkIfStockNamesExistsInLocalStorage()) {
      this.stockNames = JSON.parse(localStorage.getItem('stockNames')!);
    } else {
      this.stocksService.getExchangeSymbols().subscribe({
        next: (symbols) => {
          this.stockNames = this.stocksService.saveStockNames(symbols);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  searchStocksByName(stockName: string): string[] {
    const filteredStockNames = this.stockNames?.filter((name) => name.toLowerCase().includes(stockName.toLowerCase()));
    return filteredStockNames || [];
  }

  getStockForecast() {
    if (this.stockFilter.value !== null && this.stockFilter.value !== '') {
      const stockName = this.stockFilter.value!.split(' ')[0];
      this.targetStock = stockName;
  
      const redditPosts$ = this.newsService.getRedditPosts(stockName).pipe(
        map(posts => posts.map(n => n.title)), 
        catchError(error => {
          console.error('Reddit fetch error:', error);
          if (error.error === "Gpt requests limit exceeded") {
            this.openUpgradeTariffPlanWindow();
          }
          return of([]); 
        })
      );
  
      const twitterPosts$ = this.newsService.getTwitterPosts(stockName).pipe(
        map(posts => posts.map(n => n.text)), 
        catchError(error => {
          console.error('Twitter fetch error:', error);
          return of([]); 
        })
      );
      
      //wait for both requests to complete
      forkJoin([redditPosts$, twitterPosts$]).subscribe({
        next: ([redditPosts, twitterPosts]) => {
          const combinedPosts = [...redditPosts, ...twitterPosts];
          console.log('Combined posts:', combinedPosts);
          if (combinedPosts.length > 0) {
            const gptRequest = this.chatGptService.constructGptRequest(combinedPosts);
            this.chatGptQuery.query = gptRequest;
            this.chatGptService.getChatGptResponse(this.chatGptQuery).subscribe({
              next: (response) => {
                console.log(response);
                this.isResponseObtained = true;
                this.simulateTyping(response.response);
                this.stockFilter.setValue('');
              },
              error: (error) => {
                console.error('ChatGPT fetch error:', error);
              }
            });
          } else {
            console.log('No relevant posts found on Reddit or Twitter.');
            this.isResponseObtained = true;
            this.aiResponse = 'Sorry, no relevant information about this stock on social media.';
            
          }
        },
        error: (error) => {
          console.error('An unexpected error occurred:', error);
          this.isResponseObtained = true;
          this.aiResponse = 'An unexpected error occurred while fetching posts.';
        }
      });
    }
  }

  openUpgradeTariffPlanWindow() {
    this.dialogRef.open(UpgradeTariffPlanComponent, {
    });
  }

  simulateTyping(text: string, index: number = 0) {
    if (index < text.length) {
      this.aiResponse = text.substring(0, index + 1);
      index++;
      setTimeout(() => {
        this.simulateTyping(text, index);
      }, 50); // Adjust typing speed here (milliseconds)
    }
  }

  getFastForecast(stockName: string) {
    this.stockFilter.setValue(stockName);
    this.getStockForecast()
  }

  upgradeTariffPlan() {
    let order = this.upgradeTariffService.getOrderForUpgradeFromLocalStorage();
    if(!order) {
      return;
    }
    this.paymentService.getSessionState(order.orderId).subscribe({
      next: (state : PaymentState) => {
        if (state.paymentState === 3) {
          this.upgradeTariffPlanRequest.tariffPlan = order.tariffPlan;
          this.upgradeTariffPlanRequest.paymentState = state.paymentState;
          this.upgradeTariffService.upgradeTariffPlan(this.upgradeTariffPlanRequest).subscribe({
            next: (response) => {
              console.log(response);
              this.upgradeTariffService.removeOrderForUpgradeFromLocalStorage();
              this.toastService.success('Tariff plan successfully upgraded!');
            },
            error: (error) => {
              console.log(error);
            }
          });
        } else {
          this.toastService.error('Payment not completed!');
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
