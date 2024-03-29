import { Component, OnInit } from '@angular/core';
import { UserJwt } from './models/user/userJwt';
import { AccountService } from './_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AssetsNet';
  userJwt: UserJwt | null = null;

  constructor(private accountService: AccountService) {
    this.accountService.currentUser$.subscribe((user) => {
      this.userJwt = user;
    })
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: UserJwt = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.accountService.setCurrentUser(user);
    }
  }
}
