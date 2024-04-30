import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UsersService } from 'src/app/_services/users.service';
import { FoundUser } from 'src/app/models/user/foundUser';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UsersSearchComponent {

  searchUserNameTerm: string = '';
  debounceTime: number = 500;

  foundUsers: FoundUser[] = [];

  constructor(private usersService: UsersService) { }

  searchUsers() {
    if (this.searchUserNameTerm) {
      this.usersService.searchUserByUserName(this.searchUserNameTerm).pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged() // to prevent duplicate
      ).subscribe((foundUsers: FoundUser[]) => {
        this.foundUsers = foundUsers;
      }, (error) => {
        console.log(error);
      });
    }
  }
}
