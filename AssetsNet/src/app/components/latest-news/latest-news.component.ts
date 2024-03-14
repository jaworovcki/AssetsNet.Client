import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/_services/news.service';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getLatestNews("Google").subscribe((response) => {
      console.log(response);
      
    }, (error) => {
      console.log(error);
    });
  }

}
