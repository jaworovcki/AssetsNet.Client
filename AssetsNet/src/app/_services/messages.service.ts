import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SendMessage } from '../models/sendMessage';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private baseUrl: string = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getMessagesForUser(recipientId: string) {
    return this.httpClient.get(this.baseUrl + 'messages/' + recipientId);
  }

  sendMessage(model: SendMessage) {
    return this.httpClient.post(this.baseUrl + 'messages/send-message', model);
  }
}
