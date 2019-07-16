import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { LocationMeassurements } from './location-meassurements/location-meassurements.type';
import { tap, shareReplay } from 'rxjs/operators';

@Injectable()
export class SzpekHttpService {
  private readonly apiEndpoint;
  constructor(private http: HttpClient) {
    this.apiEndpoint = environment.apiUrl;
    //TODO delete this
    console.log("isProd: " + environment.production);
  }

  //Meassurements
  getLocationsMeassures(): Observable<LocationMeassurements[]> {
    return this.http.get<LocationMeassurements[]>(this.apiEndpoint + 'Meassurements');
  }

  getLocationsMeassuresDetails(id: number): Observable<LocationMeassurements> {
    return this.http.get<LocationMeassurements>(this.apiEndpoint + 'Meassurements/' + id);
  }
}
