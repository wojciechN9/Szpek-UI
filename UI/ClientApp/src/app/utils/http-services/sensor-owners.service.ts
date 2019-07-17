import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment.prod";
import { Observable } from "rxjs";
import { SensorOwner } from "../../dashboard/my-sensors/sensor-owner.type";
import { Injectable } from '@angular/core';

@Injectable()
export class SensorsOwnersHttpService {
  private readonly apiEndpoint;
  constructor(private http: HttpClient) {
    this.apiEndpoint = environment.apiUrl;
  }

  getMySensors(): Observable<SensorOwner> {
    return this.http.get<SensorOwner>(this.apiEndpoint + 'SensorsOwners/my');
  }
}
