import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class MessagesThreadComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('messagesContainer') private messagesContainer: ElementRef | null = null;
  resId: string = 'cd25656b-d095-428c-8b53-c495625dc9dd';

  messageToSend: SendMessage = {
    recipientId: this.resId,
    content: ''
  };

  userJwt: UserJwt | null = null;

  constructor(public messagesService: MessagesService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.userJwt = user
    });
  }

  ngOnInit(): void {
    this.messagesService.createHubConnection(this.userJwt!, this.resId);
  }

  ngAfterViewInit(): void {
    this.smoothScrollToBottom();
  }

  ngOnDestroy(): void {
    this.messagesService.stopHubConnection();
  }

  sendMessage() {
    this.messagesService.sendMessage(this.messageToSend).then(() => {
      console.log(this.messageToSend);
      this.messageToSend.content = '';
      this.smoothScrollToBottom();
    });
  }

  private smoothScrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTo({
          top: this.messagesContainer.nativeElement.scrollHeight,
          behavior: 'smooth'
        })
      }
    }, 400);
  }
}
