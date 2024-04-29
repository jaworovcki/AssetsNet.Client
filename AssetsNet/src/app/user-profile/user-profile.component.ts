import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../_services/users.service';
import { User } from '../models/user/user';
import { UserJwt } from '../models/user/userJwt';
import { AccountService } from '../_services/account.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FollowersModalComponent } from '../_modals/followers/followers-modal/followers-modal.component';
import { FollowingsModalComponent } from '../_modals/followings/followings-modal/followings-modal.component';
import { MessagesService } from '../_services/messages.service';
import { Message } from '../models/message';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User | null = null;
  userJwt: UserJwt | null = null;
  isChatVisible: boolean = false;
  conversations: Message[] = [];
  recipient: User | null = null;

  userIdFromRoute: string = '';

  constructor(public dialogRef: MatDialog, private usersService: UsersService, private accountService: AccountService, 
    private activatedRoute: ActivatedRoute,private messagesService: MessagesService) { 
      this.accountService.currentUser$.subscribe((userJwt) => {
        this.userJwt = userJwt;
      });
    }

  ngOnInit(): void {
    this.getUser();
    this.getConversations();
  }

  openFollowersModal() {
    this.dialogRef.open(FollowersModalComponent, {
      height: '550px',
      width: '400px',
      data: {
        userId: this.userJwt?.id
      },
    })
  }

  openFollowingsModal() {
    this.dialogRef.open(FollowingsModalComponent, {
      height: '550px',
      width: '400px',
      data: {
        userId: this.userIdFromRoute
      },
    })
  }

  getUser() {
    this.userIdFromRoute = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    if (this.userIdFromRoute) {
      this.usersService.getUserById(this.userIdFromRoute).subscribe((user) => {
        this.user = user;
        this.recipient = user;
        console.log(user);
      }, (error) => {
        console.log(error);
      })
    }
  }

  getConversations() {
    if (this.userJwt) {
      this.messagesService.getConversations().subscribe({
        next: (conversations) => {
          this.conversations = conversations;
          console.log(conversations);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  initiateChat() {
    this.isChatVisible = !this.isChatVisible;
  }

  startChatting(message : Message) {
    const recipientId = message.senderId !== this.user!.id ? message.senderId : message.recipientId;
    this.usersService.getUserById(recipientId).subscribe((user) => {
      this.recipient = user;
      this.isChatVisible = true;
    });
  }
}
