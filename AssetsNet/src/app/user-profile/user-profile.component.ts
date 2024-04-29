import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../_services/users.service';
import { User } from '../models/user/user';
import { UserJwt } from '../models/user/userJwt';
import { AccountService } from '../_services/account.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FollowersModalComponent } from '../_modals/followers/followers-modal/followers-modal.component';
import { FollowingsModalComponent } from '../_modals/followings/followings-modal/followings-modal.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  user: User | null = null;
  userJwt: UserJwt | null = null;
  isChatVisible: boolean = false;

  constructor(public dialogRef: MatDialog, private usersService: UsersService, private accountService: AccountService, 
    private activatedRoute: ActivatedRoute) { 
      this.accountService.currentUser$.subscribe((userJwt) => {
        this.userJwt = userJwt;
      });
    }

  ngOnInit(): void {
    this.getUser();
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
        userId: this.userJwt?.id
      },
    })
  }

  getUser() {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(userId);

    if (userId) {
      this.usersService.getUserById(userId).subscribe((user) => {
        this.user = user;
        console.log(user);
      }, (error) => {
        console.log(error);
      })
    }
  }

  initiateChat() {
    this.isChatVisible = !this.isChatVisible;
  }
}
