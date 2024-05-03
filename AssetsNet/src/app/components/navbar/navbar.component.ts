import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { SidebarService } from 'src/app/_services/sidebar.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  sidebarActive = false;

  constructor(public accountService: AccountService, private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.sidebarActive$.subscribe(active => {
      this.sidebarActive = active;
    });
  }

  toggleSidebar() {
    this.sidebarService.setSidebarActive(!this.sidebarActive);
  }

  logout() {
    this.accountService.logout();
  }
}
