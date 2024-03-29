import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { SensorOwnerPost } from '../models/sensor-owner-post.type';
import { SensorOwner } from '../models/sensor-owner.type';
import { environment } from '../../../environments/environment';

@Injectable()
export class SensorsOwnersHttpService {
  private readonly apiEndpoint = environment.apiUrl;
  constructor(private http: HttpClient) { }

  postSensorOwner(sensorOwner: SensorOwnerPost): Observable<number> {
    return this.http.post<any>(this.apiEndpoint + 'SensorsOwners', sensorOwner);
  }

  sensorsOwners$ = this.http.get<Array<SensorOwner>>(this.apiEndpoint + 'SensorsOwners');

  getSensorsOwner(id: number): Observable<SensorOwner> {
    return this.http.get<SensorOwner>(this.apiEndpoint + 'SensorsOwners/' + id);
  }

  getMySensors(): Observable<SensorOwner> {
    return this.http.get<SensorOwner>(this.apiEndpoint + 'SensorsOwners/my');
  }
}
