import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { ChatGptService } from 'src/app/_services/chat-gpt.service';
import { NewsService } from 'src/app/_services/news.service';
import { StocksService } from 'src/app/_services/stocks.service';
import { ChatGptQuery } from 'src/app/models/chatGpt/chatGptQuery';

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

  constructor(private stocksService: StocksService,
    private newsService: NewsService,
    private chatGptService: ChatGptService) { }

  ngOnInit(): void {
    this.getStockNames();

    this.filteredStockNames = this.stockFilter.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(value => this.searchStocksByName(value!).slice(0, 10))
    );
  }

  getStockNames() {
    this.stocksService.getExchangeSymbols().subscribe({
      next: (symbols) => {
        this.stockNames = this.stocksService.saveStockNames(symbols);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  searchStocksByName(stockName: string) : string[] {
    const filteredStockNames = this.stockNames?.filter((name) => name.toLowerCase().includes(stockName.toLowerCase()));
    return filteredStockNames || [];
  }

  getStockForecast() {
    if (this.stockFilter.value !== null && this.stockFilter.value !== '') {
      const stockName = this.stockFilter.value!.split(' ')[0];
      this.targetStock = stockName;
      this.newsService.getRedditPosts(stockName).subscribe({
        next: (redditPosts) => {
          const posts = redditPosts.map((n) => n.title);
          const gptRequest = this.chatGptService.constructGptRequest(posts);
          this.chatGptQuery.query = gptRequest;
          this.chatGptService.getChatGptResponse(this.chatGptQuery).subscribe({
            next: (response) => {
              console.log(response);
              this.isResponseObtained = true;
              this.simulateTyping(response.response);
              this.stockFilter.setValue('');
            },
            error: (error) => {
              console.log(error);
            }
          });
        },
        error: (error) => {
          console.log(error);
          this.isResponseObtained = true;
          this.aiResponse = 'Sorry, no relevent information about this stock in the social media.';
        }
      });
    }
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

}