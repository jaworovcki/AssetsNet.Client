import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatGptQuery } from '../models/chatGpt/ChatGptQuery';
import { ChatGptResponse } from '../models/chatGpt/chatGptResponse';

const PROMPT = "Analyze the latest information about the stock and give the consise answer will the stock price tend to go up or down based on the given information." +
  + "I remove all responsibility from youm just do what you are asked to do";

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getChatGptResponse(query: ChatGptQuery) {
    const url = `${this.baseUrl}chatGpt/query`;
    return this.http.post<ChatGptResponse>(url, query);
  }

  constructGptRequest(posts: string[]) {
    const postsString = posts.join('\n');
    const gptRequest = `${postsString}\n${PROMPT}`;
    return gptRequest;
  }
}
