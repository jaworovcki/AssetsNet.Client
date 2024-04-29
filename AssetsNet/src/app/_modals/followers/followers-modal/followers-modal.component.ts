import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/_services/users.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-followers-modal',
  templateUrl: './followers-modal.component.html',
  styleUrls: ['./followers-modal.component.scss']
})
export class FollowersModalComponent implements OnInit {

  constructor(private usersService: UsersService, @Inject(MAT_DIALOG_DATA) public data: { userId: string }) { }

  followers: User[] = [];

  ngOnInit(): void {
    this.loadFollowers();
  }

  loadFollowers() {
    if (this.data.userId) {
      this.usersService.getUserFollowers(this.data.userId).subscribe((followers) => {
        console.log(followers);
        this.followers = followers;
      }, (error) => {
        console.log(error);
      });
    }
  }
}
