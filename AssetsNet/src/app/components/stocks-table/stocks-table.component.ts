import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stocks/stock';
import { StocksService } from 'src/app/_services/stocks.service';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.scss']
})
export class StocksTableComponent implements OnInit {

  stocks: Stock[] = [];
  symbols: string[] = ["AMZN", "AAPL", "NFLX", "GOOG", "NVDA"];

  constructor(private stocksService: StocksService) { }

  ngOnInit(): void {
    this.getMockStockData(); // Fake data
    // this.getStocksData(); // Real Data
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
