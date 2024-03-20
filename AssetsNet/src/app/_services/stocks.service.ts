import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExchangeSymbol } from '../models/stocks/exchangeSymbol';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  eodhdApiUrl = environment.eodhdApiUrl;
  eodhdApiToken = environment.eohdApiToken;

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

}
