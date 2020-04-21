import { Component, OnInit } from "@angular/core";
import { SensorsOwnersHttpService } from "../../shared/services/sensor-owners.service";
import { SensorOwner } from "../../shared/models/sensor-owner.type";

@Component({
  selector: 'my-sensors',
  templateUrl: './my-sensors.component.html'
})
export class MySensorsComponent implements OnInit {
  public sensorOwner: SensorOwner;

  constructor(private sensorsOwnersService: SensorsOwnersHttpService) { }

  ngOnInit(): void {
    this.sensorsOwnersService.getMySensors().subscribe(
      result => { this.sensorOwner = result });
  }
}
