import { Component } from "@angular/core";
import { SensorsOwnersHttpService } from "../../utils/http-services/sensor-owners.service";
import { SensorOwner } from "../../admin/sensors-owners/sensor-owner.type";

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
