import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { News } from '../models/news/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getLatestNews(companyName: string, region: string = "US") {
    const url = `${this.baseUrl}news?companyName=${companyName}&region=${region}`;
    return this.http.get<News[]>(url);
  }

  generateMockNewsArray(count: number): News[] {
    const mockNewsArray: News[] = [];
    for (let i = 0; i < count; i++) {
      mockNewsArray.push(this.generateMockNews());
    }
    return mockNewsArray;
  }


  generateMockNews(): News {
    return {
      link: "https://example.com/news",
      publisher: "Example News",
      providerPublishTime: new Date(),
      title: "Sample News Title",
      type: "article",
      uuid: "1234567890",
      thumbnail: {
        resolutions: [
          {
            url: "https://fakeimg.pl/300/",
            width: "300",
            height: "200",
            tag: "thumbnail"
          }
        ]
      }
    };
  }
}
