import { Component, OnInit } from '@angular/core';
import { UserJwt } from './models/user/userJwt';
import { AccountService } from './_services/account.service';
import { Router } from '@angular/router';
import { LoadingSpinnerService } from './_services/loading-spinner.service';
import { UsersService } from './_services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private accountService: AccountService,
    public usersService: UsersService,
    public spinnerService: LoadingSpinnerService) { }

  ngOnInit(): void {
    this.setCurrentUser();

    this.usersService.getFollowedUsernames();
  }

  setCurrentUser() {
    const user: UserJwt = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.accountService.setCurrentUser(user);
    }
  }
}
