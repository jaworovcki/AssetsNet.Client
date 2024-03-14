import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/_services/news.service';
import { News } from 'src/app/models/news/news';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {
  
  news: News[] = [];

  availableCompanies = [
    { name: "Google", value: "Google" },
    { name: "Microsoft", value: "Microsoft" },
    { name: "Readdle", value: "Readdle" },
    { name: "Apple", value: "Apple" },
  ];

  selectedCompany: { name: string, value: string } = this.availableCompanies[0];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews() {
    this.newsService.getLatestNews(this.selectedCompany?.value).subscribe((news: News[]) => {
      this.news = news;
      console.log(this.news);
    }, (error) => {
      console.log(error);
    });
  }

  onCompanySelected(selectedCompany: { name: string, value: string }) {
    this.selectedCompany = selectedCompany;
    this.loadNews();
  }
}
