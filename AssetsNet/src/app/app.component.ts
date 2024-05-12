import { Component, OnInit } from '@angular/core';
import { UserJwt } from './models/user/userJwt';
import { AccountService } from './_services/account.service';
import { Router } from '@angular/router';
import { LoadingSpinnerService } from './_services/loading-spinner.service';
import { UsersService } from './_services/users.service';
import { SidebarService } from './_services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sidebarActive = false;
  constructor(private accountService: AccountService,
    public usersService: UsersService,
    public spinnerService: LoadingSpinnerService,
    private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.setCurrentUser();
    this.sidebarService.sidebarActive$.subscribe(active => {
      this.sidebarActive = active;
    });
    this.usersService.getFollowedUsernames();
  }
  
  setCurrentUser() {
    const user: UserJwt = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.accountService.setCurrentUser(user);
    }
  }
}
