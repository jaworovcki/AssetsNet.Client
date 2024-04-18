import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../_services/messages.service';
import { Message } from '../models/message';
import { UserJwt } from '../models/user/userJwt';
import { AccountService } from '../_services/account.service';
import { SendMessage } from '../models/sendMessage';

@Component({
  selector: 'app-messages-thread',
  templateUrl: './messages-thread.component.html',
  styleUrls: ['./messages-thread.component.scss']
})
export class MessagesThreadComponent implements OnInit {

  userJwt: UserJwt | null = null;;
  constructor(private messagesService: MessagesService, private accountService: AccountService) {
    this.accountService.currentUser$.subscribe((user) => {
      this.userJwt = user
    });
  }

  resId: string = 'cd25656b-d095-428c-8b53-c495625dc9dd'

  messages: Message[] = [];


  ngOnInit(): void {
    this.loadMessagesForUser(this.resId);
  }

  loadMessagesForUser(recipientId: string) {
    this.messagesService.getMessagesForUser(recipientId).subscribe((res: any) => {
      this.messages = res;
      console.log(res);
    });
  }

  sendMessage() {
    let msg: SendMessage = {
      recipientId: this.resId,
      content: 'sdfdsfdsfdsfsd'
    };
    this.messagesService.sendMessage(msg).subscribe((res) => {
      console.log(res);
    });
  }
}
