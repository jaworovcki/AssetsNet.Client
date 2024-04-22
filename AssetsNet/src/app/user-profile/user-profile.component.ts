import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../_services/users.service';
import { User } from '../models/user/user';
import { UserJwt } from '../models/user/userJwt';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  user: User | null = null;
  userJwt: UserJwt | null = null;

  constructor(private usersService: UsersService, private accountService: AccountService, 
    private activatedRoute: ActivatedRoute) { 
      this.accountService.currentUser$.subscribe((userJwt) => {
        this.userJwt = userJwt;
      });
    }


  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(userId);

    if (userId) {
      this.usersService.getUserById(userId).subscribe((user) => {
        this.user = user;
        console.log(user);
      }, (error) => {
        console.log(error);
      })
    }
  }
}
