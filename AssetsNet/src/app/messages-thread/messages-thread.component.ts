import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessagesService } from '../_services/messages.service';
import { Message } from '../models/message';
import { UserJwt } from '../models/user/userJwt';
import { AccountService } from '../_services/account.service';
import { SendMessage } from '../models/sendMessage';
import { take } from 'rxjs';

@Component({
  selector: 'app-messages-thread',
  templateUrl: './messages-thread.component.html',
  styleUrls: ['./messages-thread.component.scss']
})
export class MessagesThreadComponent implements OnInit, OnDestroy {

  userJwt: UserJwt | null = null;;
  constructor(public messagesService: MessagesService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.userJwt = user
    });
  }

  resId: string = 'cd25656b-d095-428c-8b53-c495625dc9dd'

  messages: Message[] = [];


  ngOnInit(): void {
    this.messagesService.createHubConnection(this.userJwt!, this.resId);
    // this.loadMessagesForUser(this.resId);
  }

  ngOnDestroy(): void {
    this.messagesService.stopHubConnection();
  }

  loadMessagesForUser(recipientId: string) {
    this.messagesService.getMessagesForUser(recipientId).subscribe((res: any) => {
      this.messages = res;
      console.log(res);
    });
  }

  messageToSend: SendMessage =  {
    recipientId: this.resId,
    content: ''
  }


  sendMessage() {
    this.messagesService.sendMessage(this.messageToSend).then(() => {
      console.log();
      this.messageToSend.content = '';
    });
  }
}
