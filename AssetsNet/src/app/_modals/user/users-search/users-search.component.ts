import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UsersService } from 'src/app/_services/users.service';
import { FoundUser } from 'src/app/models/user/foundUser';
import { User } from 'src/app/models/user/user';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UsersSearchComponent {

  user: User | null = null;
  userIdFromRoute: string = '';
  recipient: User | null = null;

  searchUserNameTerm: string = '';
  debounceTime: number = 500;

  foundUsers: FoundUser[] = [];

  constructor(public usersService: UsersService,  private toastr: ToastrService, private activatedRoute: ActivatedRoute ) { }

  truncate(text: string, limit: number): string {
    if (text.length <= limit) {
      return text;
    }
    return text.substring(0, limit) + '...';
  }

  ngOnInit():void{
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

  followUser(foundUser:FoundUser) {
    this.usersService.followUserById(foundUser.id, foundUser.userName).subscribe((response) => {
      this.toastr.info('Followed ' + foundUser.userName);
    }, (error) => {
      this.toastr.error(error.error);
      console.log(error);
    });
  }

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
