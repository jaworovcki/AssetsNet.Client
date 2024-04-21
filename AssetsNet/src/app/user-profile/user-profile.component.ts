import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private usersService: UsersService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(userId);
    
    if(userId) {
      this.usersService.getUserById(userId).subscribe((user) => {
        console.log(user);
      }, (error) => {
        console.log(error);
      })
    }
  }
}
