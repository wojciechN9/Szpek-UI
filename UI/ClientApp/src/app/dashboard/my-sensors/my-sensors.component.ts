import { Component } from "@angular/core";
import { SensorOwner } from "./sensor-owner.type";
import { SensorsOwnersHttpService } from "../../utils/http-services/sensor-owners.service";

@Component({
  selector: 'my-sensors',
  templateUrl: './my-sensors.component.html'
})
export class MySensorsComponent {
  public sensorOwner: SensorOwner;

  constructor(sensorsOwnersService: SensorsOwnersHttpService) {
    sensorsOwnersService.getMySensors().subscribe(
      result => { this.sensorOwner = result });
  }
}
