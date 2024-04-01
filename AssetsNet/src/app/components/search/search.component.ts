import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, catchError, debounceTime, forkJoin, map, of, startWith } from 'rxjs';
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
  
      // Use RxJS forkJoin to handle both API calls simultaneously and wait for both to finish
      // If one fails, the other can still proceed
      const redditPosts$ = this.newsService.getRedditPosts(stockName).pipe(
        map(posts => posts.map(n => n.title)), // Map only the title for Reddit posts
        catchError(error => {
          console.error('Reddit fetch error:', error);
          return of([]); // In case of error, return an empty array to keep the flow going
        })
      );
  
      const twitterPosts$ = this.newsService.getTwitterPosts(stockName).pipe(
        map(posts => posts.map(n => n.text)), // Map only the text for Twitter posts
        catchError(error => {
          console.error('Twitter fetch error:', error);
          return of([]); // In case of error, return an empty array to keep the flow going
        })
      );
  
      forkJoin([redditPosts$, twitterPosts$]).subscribe({
        next: ([redditPosts, twitterPosts]) => {
          // Combine posts from Reddit and Twitter
          const combinedPosts = [...redditPosts, ...twitterPosts];
          console.log('Combined posts:', combinedPosts);
          // Check if combinedPosts is not empty
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