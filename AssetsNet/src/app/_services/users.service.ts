import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user/user';
import { FoundUser } from '../models/user/foundUser';
import { BehaviorSubject, map, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private followedUsernamesSource = new BehaviorSubject<string[]>([]);
  public followedUsernames$ = this.followedUsernamesSource.asObservable();

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  public getUserById(userId: string) {
    return this.http.get<User>(this.baseUrl + 'users/' + userId);
  }

  public getUserFollowers(userId: string) {
    return this.http.get<User[]>(this.baseUrl + 'users/followers/' + userId);
  }

  public getUserFollowings(userId: string) {
    return this.http.get<User[]>(this.baseUrl + 'users/followings/' + userId);
  }

  public searchUserByUserName(userName: string) {
    return this.http.get<FoundUser[]>(this.baseUrl + 'users/user-search/' + userName);
  }

  public followUserById(userId: string, userName: string) {
    return this.http.post(this.baseUrl + 'users/follow-user/' + userId, {}).pipe(map(() => {
      this.followedUsernamesSource.pipe(take(1)).subscribe((users) => {
        if(!users.includes(userName)) {
          users.push(userName);
        }
        this.followedUsernamesSource.next(users);
      })
    }));
  }

  public getFollowedUsernames() {
    this.http.get<string[]>(this.baseUrl + 'users/get-followings-names').subscribe((users: string[]) => {
      this.followedUsernamesSource.next(users);
    }, (error) => {
      this.toastr.error(error.error);
      console.log(error);
    });
  }
}
