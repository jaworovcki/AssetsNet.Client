import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stocks/stock';
import { StocksService } from 'src/app/_services/stocks.service';

@Component({
  selector: 'app-stock-ticker',
  templateUrl: './stock-ticker.component.html',
  styleUrls: ['./stock-ticker.component.scss']
})
export class StockTickerComponent implements OnInit {

  stocks: Stock[] = [];
  symbols: string[] = ["AMZN", "AAPL", "NFLX", "GOOG", "NVDA"];

  constructor(private stocksService: StocksService) { }

  ngOnInit(): void {
    //this.getMockStockData(); // Fake data
    this.getStocksData(); // Real Data
  }

  getChangePercentClass(stock: Stock) {
    return {
      'up': +stock.percentChange > 0,
      'down': +stock.percentChange < 0
    };
  }

  getStocksData() {
    this.stocksService.getStocks(this.symbols).subscribe((stocks: Stock[]) => {
      this.stocks = stocks;
      console.log(stocks);
      
    }, (error) => {
      this.getMockStockData();
      console.log(error);
    });
  }

  toggleStar(stock: Stock): void {
    stock.starred = !stock.starred;
  }

  private getMockStockData() {
    this.stocks = this.stocksService.generateMockStocksArray(5);
  }

}
