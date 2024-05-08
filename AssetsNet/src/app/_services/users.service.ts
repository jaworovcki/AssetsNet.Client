import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user/user';
import { FoundUser } from '../models/user/foundUser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private followedUsernamesSource = new BehaviorSubject<string[]>([]);
  public followedUsernames$ = this.followedUsernamesSource.asObservable();

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

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

  public followUserById(userId: string) {
    return this.http.post(this.baseUrl + 'users/follow-user/' + userId, {});
  }

  public getFollowedUsernames() {
    this.http.get<string[]>(this.baseUrl + 'users/get-followings-names').subscribe((users:string[]) => {
      this.followedUsernamesSource.next(users);
    }, (error) => {
      console.log(error);
    });
  }
}
