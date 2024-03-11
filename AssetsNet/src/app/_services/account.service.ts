import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { UserJwt } from '../models/user/userJwt';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = environment.baseUrl;

  private currentUserSource = new BehaviorSubject<UserJwt | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  private userRolesSource = new BehaviorSubject<string[]>([]);
  userRoles$ = this.userRolesSource.asObservable();

  constructor(private http: HttpClient) { }

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


  setCurrentUser(user: UserJwt) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);

    this.setUserRoles(user);
  }

  setUserRoles(userJwt: UserJwt) {
    this.userRolesSource.next(userJwt.roles);
  }
}
