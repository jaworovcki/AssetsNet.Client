import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getLatestNews(companyName: string, region: string = "US") {
    const url = `${this.baseUrl}news?companyName=${companyName}&region=${region}`;
    return this.http.get(url);
  }
}
