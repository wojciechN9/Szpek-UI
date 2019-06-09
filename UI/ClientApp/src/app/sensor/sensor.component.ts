import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sensor-component',
  templateUrl: './sensor.component.html'
})
export class SensorComponent {
  public sensors: Sensor[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Sensor[]>(baseUrl + 'api/Sensors').subscribe(result => {
      this.sensors = result;
    }, error => console.error(error));
  }
}
