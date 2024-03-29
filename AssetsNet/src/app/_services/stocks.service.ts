import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExchangeSymbol } from '../models/stocks/exchangeSymbol';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Stock } from '../models/stocks/stock';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  eodhdApiUrl = environment.eodhdApiUrl;
  eodhdApiToken = environment.eohdApiToken;

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getExchangeSymbols() : Observable<ExchangeSymbol[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('api_token', this.eodhdApiToken);
    queryParams = queryParams.append('fmt', 'json');
    return this.http.get<ExchangeSymbol[]>(`${this.eodhdApiUrl}exchange-symbol-list/US`, { params: queryParams });
  }

  saveStockNames(symbols: ExchangeSymbol[]) : string[] | null {
    let stockNames = symbols.map((symbol) => symbol.Name);
    localStorage.setItem('stockNames', JSON.stringify(stockNames));
    return stockNames;
  }

  checkIfStockNamesExistsInLocalStorage() : boolean {
    return localStorage.getItem('stockNames') !== null;
  }

  getStocks(symbols: string[]) {
    return this.http.post(this.baseUrl + 'stocks/stocks-list', symbols);
  }

  // private generateMockStock(): Stock {
  //   return {
  //     symbol: 'AAPL',
  //     name: 'Apple Inc.',
  //     price: +(Math.random() * 100).toFixed(2),
  //     changePercent: +(Math.random() * (-15) + 10).toFixed(2),
  //     volume: +(Math.random() * 100).toFixed(3),
  //     marketCap: +(Math.random() * 1000000).toFixed(2)
  //   };
  // }
  
  // generateMockStocksArray(count: number): Stock[] {
  //   let stocks: Stock[] = [];
  //   for (let i = 0; i < count; i++) {
  //     stocks.push(this.generateMockStock());
  //   }
  //   return stocks;
  // }
  
}
