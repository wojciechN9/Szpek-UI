import { Component } from "@angular/core";
import { SzpekHttpService } from "../../app.http.service";
import { SensorOwner } from "./sensor-owner.type";

@Component({
  selector: 'my-sensors',
  templateUrl: './my-sensors.component.html'
})
export class MySensorsComponent {
  public sensorOwner: SensorOwner;

  constructor(szpekService: SzpekHttpService) {
    szpekService.getMySensors().subscribe(
      result => { this.sensorOwner = result });
  }
}
