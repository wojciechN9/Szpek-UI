import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment.prod";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { SensorOwner } from '../../admin/sensors-owners/sensor-owner.type';
import { SensorOwnerPost } from '../../admin/sensors-owners/sensor-owner-post.type';

@Injectable()
export class SensorsOwnersHttpService {
  private readonly apiEndpoint;
  constructor(private http: HttpClient) {
    this.apiEndpoint = environment.apiUrl;
  }

  postSensorOwner(sensorOwner: SensorOwnerPost): Observable<number> {
    return this.http.post<any>(this.apiEndpoint + 'SensorsOwners', sensorOwner);
  }

  getSensorsOwners(): Observable<Array<SensorOwner>> {
    return this.http.get<Array<SensorOwner>>(this.apiEndpoint + 'SensorsOwners');
  }

  getSensorsOwner(id: number): Observable<SensorOwner> {
    return this.http.get<SensorOwner>(this.apiEndpoint + 'SensorsOwners/' + id);
  }

  getMySensors(): Observable<SensorOwner> {
    return this.http.get<SensorOwner>(this.apiEndpoint + 'SensorsOwners/my');
  }
}
