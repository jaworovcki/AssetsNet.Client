import { Component, OnInit } from '@angular/core';
import { UserJwt } from './models/user/userJwt';
import { AccountService } from './_services/account.service';
import { Router } from '@angular/router';
import { LoadingSpinnerService } from './_services/loading-spinner.service';
import { SidebarService } from './_services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sidebarActive = false;
  constructor(private accountService: AccountService, public spinnerService: LoadingSpinnerService, private sidebarService: SidebarService) { }


  ngOnInit(): void {
    this.setCurrentUser();
    this.sidebarService.sidebarActive$.subscribe(active => {
      this.sidebarActive = active;
  });
  }
  setCurrentUser() {
    const user: UserJwt = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.accountService.setCurrentUser(user);
    }
  }
}
