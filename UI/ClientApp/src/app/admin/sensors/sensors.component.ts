import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SensorCreate } from "./sensors-create.type";
import { SensorsHttpService } from "../sensors.service";
import { SensorsOwnersHttpService } from "../../shared/services/sensor-owners.service";

@Component({
  selector: 'sensors',
  templateUrl: './sensors.component.html'
})
export class SensorsComponent implements OnInit {
  public form: FormGroup;
  public isAddFormVisible = false;
  public sensors$ = this.sensorsService.sensors$;
  public sensorsOwners$ = this.sensorsOwnersService.sensorsOwners$;

  constructor(
    private sensorsService: SensorsHttpService,
    private sensorsOwnersService: SensorsOwnersHttpService,
    private formBuilder: FormBuilder,
    private router: Router) { }

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

    const sensorCreate = {
      code: this.form.controls.code.value,
      publicKey: this.form.controls.publicKey.value,
      ownerId: +this.form.controls.ownerId.value,
      isPrivate: this.form.controls.isPrivate.value
    } as SensorCreate;

    this.sensorsService.postSensor(sensorCreate).subscribe(
      id => this.router.navigate(['/admin/sensors', id]));
  }

  onReset() {
    this.form.reset();
  }
}
