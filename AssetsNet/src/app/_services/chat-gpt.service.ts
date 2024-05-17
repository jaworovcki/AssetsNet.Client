import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatGptQuery } from '../models/chatGpt/chatGptQuery';
import { ChatGptResponse } from '../models/chatGpt/chatGptResponse';

const PROMPT = "Analyze the posts above from different investors and traders to determine their potential impact on the stock price. Focus only on statements that have a significant impact on the price. Provide your answer in two parts: 1. A list of key considerations and for each consideration brief justification in a couple of words of the impact, 2. A conclusion that summarizes in 2 short sentences, along with advice. Note №1: Your response should be concise and well-organized and the conclusion will not be considered as financial advice. Note №2: Don't write any warnings like this (It's essential for investors to consider both short-term trading opportunities and long-term growth prospects when evaluating their positions in stock.), the readers of your answer are professional investors and traders!";

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
