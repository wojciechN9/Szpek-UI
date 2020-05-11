import { Component, OnInit, Inject } from "@angular/core";
import { SensorsOwnersHttpService } from "../../shared/services/sensor-owners.service";
import { SensorOwner } from "../../shared/models/sensor-owner.type";
import { L10N_LOCALE, L10nLocale } from "angular-l10n";

@Component({
  selector: 'my-sensors',
  templateUrl: './my-sensors.component.html'
})
export class MySensorsComponent implements OnInit {
  public sensorOwner: SensorOwner;

  constructor(
    private sensorsOwnersService: SensorsOwnersHttpService,
    @Inject(L10N_LOCALE) public locale: L10nLocale) { }

  ngOnInit(): void {
    this.sensorsOwnersService.getMySensors().subscribe(
      result => { this.sensorOwner = result });
  }
}
