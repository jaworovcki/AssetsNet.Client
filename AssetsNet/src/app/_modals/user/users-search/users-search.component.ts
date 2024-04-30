import { Component, OnInit } from '@angular/core';
import { debounce, debounceTime } from 'rxjs';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UsersSearchComponent {

  searchUserNameTerm: string = '';

  foundUsers: any[] = [];

  constructor(private usersService: UsersService) { }

  searchUsers() {
    if (this.searchUserNameTerm) {
      this.usersService.searchUserByUserName(this.searchUserNameTerm).pipe(
        debounceTime(500)
      ).subscribe((foundUsers: []) => {
        this.foundUsers = foundUsers;
      }, (error) => {
        console.log(error);
      });
    }
  }
}
