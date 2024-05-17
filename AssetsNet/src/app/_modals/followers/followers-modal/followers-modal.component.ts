import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/_services/users.service';
import { User } from 'src/app/models/user/user';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-followers-modal',
  templateUrl: './followers-modal.component.html',
  styleUrls: ['./followers-modal.component.scss']
})
export class FollowersModalComponent implements OnInit {


  userIdFromRoute: string = '';
  user: User | null = null;
  recipient: User | null = null;

  constructor(public usersService: UsersService, @Inject(MAT_DIALOG_DATA) public data: { userId: string }, private toastr: ToastrService, private activatedRoute: ActivatedRoute ) { }

  followers: User[] = [];

  ngOnInit(): void {
    this.loadFollowers();
    this.getUser();
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

  truncate(text: string, limit: number): string {
    if (text.length <= limit) {
      return text;
    }
    return text.substring(0, limit) + '...';
  }

  unfollowUser(){

  }

  followUser() {
    if(!this.userIdFromRoute) {
      this.toastr.error('An error occured.Reload page');
      return;
    }

    if(!this.user) {
      this.toastr.error('An error occured.Reload page');
      return;
    }

    this.usersService.followUserById(this.userIdFromRoute, this.user?.userName).subscribe((response) => {
      console.log(response);
      this.toastr.info('Successfully subscribed');
    }, (error) => {
      this.toastr.error(error.error);
      console.log(error);
    });
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
