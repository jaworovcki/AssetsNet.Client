import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PostsService {

	constructor() { }

	private generateString(length: number) {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	}

	private generateMockPost() {
		return {
			link: "https://www.instagram.com/barbersfailsig/p/C0pQiOBvmmv/",
			author: "@" + this.generateString(8).toLowerCase(),
			content: this.generateString(100)
		};
	}

	generateMockPostsArray(count: number = 4) {
		const mockPostsArray = [];
		for (let i = 0; i < count; i++) {
			mockPostsArray.push(this.generateMockPost());
		}
		return mockPostsArray;
	}

}
