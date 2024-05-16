import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/_services/users.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-followings-modal',
  templateUrl: './followings-modal.component.html',
  styleUrls: ['./followings-modal.component.scss']
})
export class FollowingsModalComponent implements OnInit {

  followings: User[] = [];

  constructor(private usersService: UsersService, @Inject(MAT_DIALOG_DATA) public data: { userId: string }) { }

  ngOnInit(): void {
    this.loadFollowings();
  }

  truncate(text: string, limit: number): string {
    if (text.length <= limit) {
      return text;
    }
    return text.substring(0, limit) + '...';
  }

  loadFollowings() {
    if (this.data.userId) {
      this.usersService.getUserFollowings(this.data.userId).subscribe((followings) => {
        console.log(followings);
        this.followings = followings;
      }, (error) => {
        console.log(error);
      });
    }
  }
}
