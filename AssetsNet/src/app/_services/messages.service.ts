import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SendMessage } from '../models/sendMessage';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { UserJwt } from '../models/user/userJwt';
import { BehaviorSubject, take } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private baseUrl: string = environment.baseUrl;
  private hubUrl: string = environment.hubUrl;
  private hubConnection?: HubConnection;

  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageSource$ = this.messageThreadSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  createHubConnection(user: UserJwt, otherUserId: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + "message?user=" + otherUserId, { accessTokenFactory: () => user.token })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => {
      console.log(error);
    });

    this.hubConnection.on("RecieveMessageThread", (messageThread) => {
      console.log(messageThread);
      this.messageThreadSource.next(messageThread);
    });

    this.hubConnection.on("NewMessage", (message) => {
      this.messageSource$.pipe(take(1)).subscribe((messages) => { // take(1) gets an array form this.messageSource$
        this.messageThreadSource.next([...messages, message])
      })
    });
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop().catch((error) => {
        console.log(error);
      })
    }
  }
  
  async sendMessage(sendMessage:SendMessage) { // async guarantees that we return a Promise from this method
    // return this.httpClient.post<Message>(this.baseUrl + 'message', {recipientUsername: username, content: content});
    this.hubConnection?.invoke("SendMessage", sendMessage).catch((error => {
      console.log(error);
    }));
  }
}
