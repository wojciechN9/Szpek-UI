import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { SensorCreate } from './sensors/sensors-create.type';
import { Sensor } from './sensors/sensor.type';
import { SensorDetails } from './sensors/sensors-details/sensor-details.type';
import { environment } from '../../environments/environment';
import { SensorUpdate } from './sensors/sensors-details/sensor-update.type';

@Injectable()
export class SensorsHttpService {
  private readonly apiEndpoint = environment.apiUrl;
  constructor(private http: HttpClient) { }

  postSensor(sensor: SensorCreate): Observable<number> {
    return this.http.post<number>(this.apiEndpoint + 'Sensors', sensor);
  }

  sensors$ = this.http.get<Array<Sensor>>(this.apiEndpoint + 'Sensors');

  getSensorDetails(sensorId: number): Observable<SensorDetails> {
    return this.http.get<SensorDetails>(this.apiEndpoint + 'Sensors/' + sensorId);
  }

  updateSensor(sensorUpdate: SensorUpdate): Observable<any> {
    return this.http.put<SensorUpdate>(this.apiEndpoint + 'Sensors/' + sensorUpdate.id, sensorUpdate);
  }
}
