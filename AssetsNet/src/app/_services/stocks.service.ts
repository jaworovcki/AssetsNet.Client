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

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getExchangeSymbols(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}stocks/stock-names-list`);
  }

  getStocks(symbols: string[]) {
    return this.http.post<Stock[]>(this.baseUrl + 'stocks/stocks-list', symbols);
  }

  // TODO: Remove on Production
  private generateMockStock(): Stock {
    const randomNumber = (min: number, max: number) => (Math.random() * (max - min) + min).toFixed(2);
    const randomBoolean = () => Math.random() > 0.5;
    const randomChange = () => {
      const positiveOrNegative = Math.random() > 0.5 ? 1 : -1;
      return (Math.random() * 15 * positiveOrNegative).toFixed(2);
    };
  
    return {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      exchange: 'NASDAQ',
      micCode: 'XNAS',
      currency: 'USD',
      timestamp: new Date().toISOString(),
      datetime: new Date().toISOString(),
      open: randomNumber(100, 200),
      low: randomNumber(90, 100),
      high: randomNumber(200, 250),
      close: randomNumber(150, 180),
      volume: randomNumber(1000000, 2000000),
      previousClose: randomNumber(150, 180),
      change: randomChange(),
      percentChange: randomChange(),
      averageVolume: randomNumber(800000, 1500000),
      isMarketOpen: randomBoolean(),
      starred: randomBoolean()
    };
  }

  generateMockStocksArray(count: number): Stock[] {
    let stocks: Stock[] = [];
    for (let i = 0; i < count; i++) {
      stocks.push(this.generateMockStock());
    }
    return stocks;
  }

}
