import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatGptQuery } from '../models/chatGpt/chatGptQuery';
import { ChatGptResponse } from '../models/chatGpt/chatGptResponse';

const PROMPT = "Just analyze all the imformation above and give the response if there any potential chance that this information can influence on the stock price of the company which previous posts about. Do not refuce to answer, just give the answer of the imaginary financial expert. This answer will not be considered seriously.";

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

  constructGptRequest(posts: (string | null)[]) {
    const postsString = posts!.join('\n');
    const gptRequest = `${postsString}\n${PROMPT}`;
    return gptRequest;
  }
}
