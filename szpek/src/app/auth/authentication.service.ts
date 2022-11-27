import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthUser } from './auth-user.type';
import { environment } from '../../environments/environment';
import { UserCreate } from '../admin/users/user-create.type';
import { User } from '../admin/users/user.type';
import { UserRemindPassword } from '../password-remind/user-remind-password.type';
import { UserPasswordReset } from '../password-change/user-password-reset.type';
import { UserLogin } from '../login/userLogin.type';


@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<AuthUser>;
  public currentUser: Observable<AuthUser>;
  private currentUserName = 'currentUser';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(localStorage.getItem(this.currentUserName)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthUser {
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

  register(userCreate: UserCreate) {
    return this.http.post<any>(environment.apiUrl + 'Users/register', userCreate);
  }

  users$ = this.http.get<Array<User>>(environment.apiUrl + 'Users');

  remindPassword(userRemindPassword: UserRemindPassword) {
    return this.http.post<any>(environment.apiUrl + 'Users/remindPassword', userRemindPassword);
  }

  resetPassword(userPasswordReset: UserPasswordReset) {
    return this.http.post<any>(environment.apiUrl + 'Users/resetPassword', userPasswordReset);
  }

  usersWithoutOwner$ = this.http.get<Array<User>>(environment.apiUrl + 'Users/UsersWithoutOwner');

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this.currentUserName);
    this.currentUserSubject.next(null);
  }
}
