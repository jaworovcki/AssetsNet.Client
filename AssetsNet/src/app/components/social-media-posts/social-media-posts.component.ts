import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/_services/news.service';
import { News } from 'src/app/models/news/news';
import { TwitterTimelinePost } from 'src/app/models/twitter/twitterTimeline/twitterTimelinePost';

@Component({
  selector: 'app-social-media-posts',
  templateUrl: './social-media-posts.component.html',
  styleUrls: ['./social-media-posts.component.scss']
})
export class SocialMediaPostsComponent implements OnInit {

  isOutOfRequest: boolean = false;
  news: News[] = [];

  pageSize: number = 4;
  currentPage: number = 1;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadYahooNews();
  }

  loadYahooNews() {
    this.news = this.newsService.generateMockNewsArray(6);
    this.newsService.getLatestNews('Stock Market').subscribe((news: News[]) => {
      if(news) {
        this.news = news;
      }
      console.log(this.news);
    }, (error) => {
      this.isOutOfRequest = true;
      this.news = this.newsService.generateMockNewsArray(8);
      console.log(error);
    });
  }

  getCurrentTwitterPosts(): News[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.news.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.news.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  hasNextPage(): boolean {
    const totalPages = Math.ceil(this.news.length / this.pageSize);
    return this.currentPage < totalPages;
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }
}