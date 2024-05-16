import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserJwt } from '../models/user/userJwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = environment.baseUrl;

  private currentUserSource = new BehaviorSubject<UserJwt | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  private userRolesSource = new BehaviorSubject<string[]>([]);
  userRoles$ = this.userRolesSource.asObservable();

  constructor(private http: HttpClient, private usersService: UsersService) { }

  register(model: any) {
    return this.http.post<UserJwt>(this.baseUrl + 'account/register', model).pipe(
      map((userJwt: UserJwt) => {
        if (userJwt) {
          this.setCurrentUser(userJwt);
        }
      })
    );
  }

  login(model: any) {
    return this.http.post<UserJwt>(this.baseUrl + 'account/login', model).pipe(
      map((response: UserJwt) => {
        const userJwt = response;
        if (userJwt) {
          this.setCurrentUser(userJwt);
        }
      })
    );
  }

  loginWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(this.baseUrl + "account/google-account", JSON.stringify(credentials), { headers: header, withCredentials: true });
  }


  setCurrentUser(user: UserJwt) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
    this.usersService.getFollowedUsernames();
    this.setUserRoles(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setUserRoles(userJwt: UserJwt) {
    this.userRolesSource.next(userJwt.roles);
  }

  resetPassword(email: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(this.baseUrl + "account/send-password-restore-email", JSON.stringify(email), { headers: header});
  }
}
