import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { SensorCreate } from './sensors/sensors-create.type';
import { Sensor } from './sensors/sensor.type';
import { SensorDetails } from './sensors/sensors-details/sensor-details.type';
import { environment } from '../../environments/environment';

@Injectable()
export class SensorsHttpService {
  private readonly apiEndpoint;
  constructor(private http: HttpClient) {
    this.apiEndpoint = environment.apiUrl;
  }

  postSensor(sensor: SensorCreate): Observable<number> {
    return this.http.post<any>(this.apiEndpoint + 'Sensors', sensor);
  }

  getSensors(): Observable<Array<Sensor>> {
    return this.http.get<Array<Sensor>>(this.apiEndpoint + 'Sensors');
  }

  getSensorDetails(sensorId: number): Observable<SensorDetails> {
    return this.http.get<SensorDetails>(this.apiEndpoint + 'Sensors/' + sensorId);
  }
}
