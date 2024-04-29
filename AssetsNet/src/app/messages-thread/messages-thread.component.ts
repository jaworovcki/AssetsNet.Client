import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MessagesService } from '../_services/messages.service';
import { Message } from '../models/message';
import { UserJwt } from '../models/user/userJwt';
import { AccountService } from '../_services/account.service';
import { SendMessage } from '../models/sendMessage';
import { take } from 'rxjs';
import { User } from '../models/user/user';

@Component({
  selector: 'app-messages-thread',
  templateUrl: './messages-thread.component.html',
  styleUrls: ['./messages-thread.component.scss']
})
export class MessagesThreadComponent implements OnInit, OnDestroy, AfterViewChecked {
    
  @ViewChild('messagesContainer') private messagesContainer: ElementRef | null = null;
  @Input() recipient: User | null = null;
  @Input() isVisible: boolean = false;
  @Output() closeChat: EventEmitter<void> = new EventEmitter<void>();
  messageToSend : SendMessage = {
    recipientId: "",
    content: ''
  };

  userJwt: UserJwt | null = null;

  constructor(public messagesService: MessagesService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.userJwt = user
    });
  }

  ngAfterViewChecked(): void {
    this.smoothScrollToBottom();
  }

  ngOnInit(): void {
    console.log(this.recipient!.id);
    this.messageToSend.recipientId = this.recipient!.id;
    this.messagesService.createHubConnection(this.userJwt!, this.recipient!.id);
  }


  ngOnDestroy(): void {
    this.messagesService.stopHubConnection();
  }

  sendMessage() {
    console.log(this.messageToSend);
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

  toggleVisibility() {
    this.isVisible = !this.isVisible;
    if (!this.isVisible) {
        this.closeChat.emit(); 
    }
  }
}
