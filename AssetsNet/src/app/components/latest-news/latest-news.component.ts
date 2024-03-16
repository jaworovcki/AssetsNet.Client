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

  currentPage: number = 1;
  pageSize:number = 3;

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
      if(news) {
        this.news = news;
      }
      console.log(this.news);
    }, (error) => {
      this.news = this.newsService.generateMockNewsArray(6);
      console.log(error);
    });
  }

  onCompanySelected(selectedCompany: { name: string, value: string }) {
    this.selectedCompany = selectedCompany;
    this.loadNews();
  }

  getCurrentPageNews(): News[] {
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
