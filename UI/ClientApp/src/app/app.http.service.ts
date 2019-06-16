import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SzpekHttpService {
  private baseUrl;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getLocationsMeassures(): Observable<LocationMeassurements[]> {
    return this.http.get<LocationMeassurements[]>(this.baseUrl + 'api/LocationMeassurements');
  }

  getLocationsMeassuresDetails(id: number): Observable<LocationMeassurements> {
    return this.http.get<LocationMeassurements>(this.baseUrl + 'api/LocationMeassurements/' + id);
  }
}
