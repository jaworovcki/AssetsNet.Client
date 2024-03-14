import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/_services/news.service';
import { News } from 'src/app/models/news';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {

  news: News[] = [];
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getLatestNews("Google").subscribe((response:News[]) => {
      this.news = response;
      console.log(this.news);
    }, (error) => {
      console.log(error);
    });
  }

}
