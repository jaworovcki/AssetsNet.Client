import { Component, OnInit } from '@angular/core';
import { StocksService } from 'src/app/_services/stocks.service';
import { ExchangeSymbol } from 'src/app/models/stocks/exchangeSymbol';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private stocksService: StocksService) { }

  ngOnInit(): void {
    this.getStockNames();
  }

  getStockNames() {
    this.stocksService.getExchangeSymbols().subscribe({
      next: (symbols) => {
        this.stocksService.saveStockNames(symbols);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}