import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment.prod";
import { Observable } from "rxjs";
import { User } from '../../admin/sensors-owners/user.type';

@Injectable()
export class UsersHttpService {
  private readonly apiEndpoint;
  constructor(private http: HttpClient) {
    this.apiEndpoint = environment.apiUrl;
  }

  getUsersWithoutOwner(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.apiEndpoint + 'Users/UsersWithoutOwner');
  }
}
