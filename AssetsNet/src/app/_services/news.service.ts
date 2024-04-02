import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { News } from '../models/news/news';
import { RedditPost } from '../models/reddit/redditPost';
import { NewsApiArticle } from '../models/newsApi/newsApiArticle';
import { TwitterTimelinePost } from '../models/twitter/twitterTimeline/twitterTimelinePost';
import { TwitterPost } from '../models/twitter/twitterPost';

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

  getNewsApiNews(query: string) {
    const url = `${this.baseUrl}news/newsApi/${query}`;
    return this.http.get<NewsApiArticle[]>(url);

  getTwitterPosts(filter: string) {
    const url = `${this.baseUrl}news/twitter/${filter}`;
    return this.http.get<TwitterPost[]>(url);
  }

  getTwitterPostsFromUserTimeline(screenName:string = 'Stocktwits') {
    const url = `${this.baseUrl}news/twitter/userMedia/${screenName}`;
    return this.http.get<TwitterTimelinePost[]>(url);
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

  generateTwitterTimelinePostsMockData(amount: number): TwitterTimelinePost[] {
    const mockData: TwitterTimelinePost[] = [];

    // Generate mock data for demonstration purposes
    for (let i = 0; i < amount; i++) {
      const mockTweet: TwitterTimelinePost = {
        tweet_id: `tweet_${i}`,
        bookmarks: Math.floor(Math.random() * 100),
        created_at: new Date().toISOString(),
        favorites: Math.floor(Math.random() * 1000),
        text: `This is a sample tweet number ${i}`,
        lang: 'en',
        views: `${Math.floor(Math.random() * 10000)}`,
        quotes: Math.floor(Math.random() * 100),
        replies: Math.floor(Math.random() * 100),
        retweets: Math.floor(Math.random() * 1000),
        conversation_id: `conversation_${i}`,
        media: {
          photo: [{
            media_url_https: `https://example.com/image_${i}.jpg`,
            id: `image_${i}`
          }]
        }
      };

      mockData.push(mockTweet);
    }

    return mockData;
  }
}
