import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/_services/news.service';
import { TwitterTimelinePost } from 'src/app/models/twitter/twitterTimeline/twitterTimelinePost';

@Component({
  selector: 'app-social-media-posts',
  templateUrl: './social-media-posts.component.html',
  styleUrls: ['./social-media-posts.component.scss']
})
export class SocialMediaPostsComponent implements OnInit {

  twitterPosts: TwitterTimelinePost[] = [];
  pageSize: number = 4;
  currentPage: number = 1;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    // this.getTwitterPostsFromUserTimeline(); // Real Data
    this.generateTwitterPostMockData(); // Fake Data
  }

  getTwitterPostsFromUserTimeline() {
    this.newsService.getTwitterPostsFromUserTimeline().subscribe(
      (tweets: TwitterTimelinePost[]) => {
        console.log(tweets);
        this.twitterPosts = tweets;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  generateTwitterPostMockData() {
    this.twitterPosts = this.newsService.generateTwitterTimelinePostsMockData(10);
  }

  getCurrentTwitterPosts(): TwitterTimelinePost[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.twitterPosts.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.twitterPosts.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  hasNextPage(): boolean {
    const totalPages = Math.ceil(this.twitterPosts.length / this.pageSize);
    return this.currentPage < totalPages;
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }
}