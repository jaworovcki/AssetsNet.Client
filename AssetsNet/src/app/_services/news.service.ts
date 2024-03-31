import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { News } from '../models/news/news';
import { RedditPost } from '../models/reddit/redditPost';
import { TwitterPost } from '../models/twitter/twitterTimeline/TwitterPost';

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

  getRedditPosts(filter: string, searchDate: number = 2) { // 2 = Week
    const url = `${this.baseUrl}news/reddit/${filter}/${searchDate}`;
    return this.http.get<RedditPost[]>(url);
  }

  getTwitterPostsFromUserTimeline(screenName:string = 'Stocktwits') {
    const url = `${this.baseUrl}news/twitter/userMedia/${screenName}`;
    return this.http.get<TwitterPost[]>(url);
  }

  // Fake data generator
  // REMOVE FOR PRODUCTION
  generateMockNewsArray(count: number): News[] {
    const mockNewsArray: News[] = [];
    for (let i = 0; i < count; i++) {
      mockNewsArray.push(this.generateMockNews());
    }
    return mockNewsArray;
  }

  private generateMockNews(): News {
    return {
      link: "https://example.com/news",
      publisher: this.generateString(8),
      providerPublishTime: new Date(),
      title: this.generateString(70),
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

  characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  private generateString(length: number) {
    let result = ' ';
    const charactersLength = this.characters.length;
    for (let i = 0; i < length; i++) {
      result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
