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

  constructor(private stocksService: StocksService) { }

  ngOnInit(): void {
  }

}
