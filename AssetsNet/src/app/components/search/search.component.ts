import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { StocksService } from 'src/app/_services/stocks.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  stockFilter = new FormControl('');
  stockNames: string[] | null = [];
  filteredStockNames?: Observable<string[]>;

  constructor(private stocksService: StocksService) { }

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
    console.log(filteredStockNames);
    return filteredStockNames || [];
  }

}