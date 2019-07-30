import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { User } from './user.type';
import { UserRemindPassword } from '../../password-remind/user-remind-password.type';
import { UserPasswordReset } from '../../password-change/user-password-reset.type';

@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private currentUserName = 'currentUser';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.currentUserName)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(userLogin: UserLogin) {
    return this.http.post<any>(environment.apiUrl + 'Users/login', userLogin)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(this.currentUserName, JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  remindPassword(userRemindPassword: UserRemindPassword) {
    return this.http.post<any>(environment.apiUrl + 'Users/remindPassword', userRemindPassword);
  }

  resetPassword(userPasswordReset: UserPasswordReset) {
    return this.http.post<any>(environment.apiUrl + 'Users/resetPassword', userPasswordReset);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this.currentUserName);
    this.currentUserSubject.next(null);
  }
}
