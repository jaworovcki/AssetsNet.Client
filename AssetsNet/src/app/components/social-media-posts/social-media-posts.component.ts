import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post/post';
import { PostsService } from 'src/app/_services/posts.service';
import { NewsService } from 'src/app/_services/news.service';
import { TwitterPost } from 'src/app/models/twitter/twitterTimeline/TwitterPost';

@Component({
  selector: 'app-social-media-posts',
  templateUrl: './social-media-posts.component.html',
  styleUrls: ['./social-media-posts.component.scss']
})
export class SocialMediaPostsComponent implements OnInit {

  twitterPosts: TwitterPost[] = [];
  pageSize: number = 4;
  currentPage: number = 1;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getTwitterPostsFromUserTimeline();
  }

  getTwitterPostsFromUserTimeline() {
    this.newsService.getTwitterPostsFromUserTimeline().subscribe(
      (tweets: TwitterPost[]) => {
        console.log(tweets);
        this.twitterPosts = tweets;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCurrentTwitterPosts(): TwitterPost[] {
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