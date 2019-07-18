import { Component, OnInit } from "@angular/core";
import { SensorsOwnersHttpService } from "../../utils/http-services/sensor-owners.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Sensor } from "./sensor.type";
import { SensorOwner } from "../sensors-owners/sensor-owner.type";
import { SensorCreate } from "./sensors-create.type";
import { SensorsHttpService } from "../../utils/http-services/sensors.service";

@Component({
  selector: 'sensors',
  templateUrl: './sensors.component.html'
})
export class SensorsComponent implements OnInit {
  public form: FormGroup;
  public isAddFormVisible: boolean = false;
  public sensors: Array<Sensor>;
  public sensorsOwners: Array<SensorOwner>;

  constructor(
    private sensorsService: SensorsHttpService,
    private sensorsOwnersService: SensorsOwnersHttpService,
    private formBuilder: FormBuilder,
    private router: Router) {
    sensorsService.getSensors().subscribe(
      result => { this.sensors = result });

    sensorsOwnersService.getSensorsOwners().subscribe(
      result => { this.sensorsOwners = result });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: ['', Validators.required],
      publicKey: ['', Validators.required],
      ownerId: [0, Validators.required],
      isPrivate: [false, Validators.required]
    });
  }

  public triggerFormVisible() {
    this.isAddFormVisible = !this.isAddFormVisible;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    var sensorCreate = <SensorCreate>{
      code: this.form.controls.code.value,
      publicKey: this.form.controls.publicKey.value,
      ownerId: this.form.controls.ownerId.value,
      isPrivate: this.form.controls.isPrivate.value
    };

    this.sensorsService.postSensor(sensorCreate).subscribe(
      id => this.router.navigate(['/admin/sensors', id]));
  }

  onReset() {
    this.form.reset();
  }
}
