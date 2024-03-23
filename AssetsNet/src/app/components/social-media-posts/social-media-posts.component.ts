import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post/post';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-social-media-posts',
  templateUrl: './social-media-posts.component.html',
  styleUrls: ['./social-media-posts.component.scss']
})
export class SocialMediaPostsComponent implements OnInit {

  posts: Post[] = []
  pageSize: number = 4;
  currentPage: number = 1;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
		this.getMockPosts();
  }

  getMockPosts() {
		this.posts = this.postsService.generateMockPostsArray(10);
  }

	getCurrentPosts(): Post[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.posts.slice(startIndex, endIndex);
  }

  previousPage() {
		if (this.currentPage > 1) {
			this.currentPage--;
		}
  }

  nextPage() {
		const totalPages = Math.ceil(this.posts.length / this.pageSize);
		if (this.currentPage < totalPages) {
			this.currentPage++;
		}
  }

  hasNextPage(): boolean {
		const totalPages = Math.ceil(this.posts.length / this.pageSize);
		return this.currentPage < totalPages;
  }

  hasPreviousPage(): boolean {
		return this.currentPage > 1;
  }

}
