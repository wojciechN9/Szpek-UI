import { HttpClient } from '@angular/common/http';
import { SensorCreate } from "../../admin/sensors/sensors-create.type";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.prod";
import { Injectable } from "@angular/core";
import { Sensor } from "../../admin/sensors/sensor.type";
import { SensorDetails } from '../../admin/sensors/sensors-details/sensor-details.type';

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
