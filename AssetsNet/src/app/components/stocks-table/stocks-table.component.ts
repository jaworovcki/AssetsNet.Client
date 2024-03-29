import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stocks/stock';
import { StocksService } from 'src/app/_services/stocks.service';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.scss']
})
export class StocksTableComponent implements OnInit {
  
  stocks: Stock[] = this.stocksService.generateMockStocksArray(5);

  constructor(private stocksService: StocksService) { }

  ngOnInit(): void {
  }

  getChangePercentClass(stock: Stock) {
    return {
      'up': stock.changePercent > 0,
      'down': stock.changePercent < 0
    };
  }

}
