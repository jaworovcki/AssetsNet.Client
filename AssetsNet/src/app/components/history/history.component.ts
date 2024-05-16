import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from '../../models/stocks/stock';
import { StocksService } from '../../_services/stocks.service';
import { Request } from 'src/app/models/requests/request';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  stocks: any[] = [];
  symbols: string[] = ["AAPL"];


  constructor(private stocksService: StocksService, private router: Router) { }

  ngOnInit(): void {
     this.getMockStockData(); // Fake data
     //this.getStocksData(); // Real Data
  }


  getStocksData() {
    this.stocksService.getStocks(this.symbols).subscribe((stocks: Stock[]) => {
      this.stocks = stocks;
      console.log(stocks);

    }, (error) => {
      console.log(error);
    });
  }

  private getMockStockData() {
    this.stocks = this.stocksService.generateMockStocksArray(10);
  }

 PassStockName(stockName: string) {
  this.router.navigate(['/analysis'], { queryParams: { stockName: stockName } });
}


}
