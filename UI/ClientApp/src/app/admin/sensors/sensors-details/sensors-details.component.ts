import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { SensorDetails } from "./sensor-details.type";
import { SensorsHttpService } from "../../sensors.service";
import { SensorUpdate } from "./sensor-update.type";
import { tap } from "rxjs/operators";

@Component({
  selector: 'sensors-details',
  templateUrl: './sensors-details.component.html'
})

export class SensorsDetailsComponent {
  public form: FormGroup;
  public isSubmitButtonEnabled = true;
  public sensorId = +this.route.snapshot.params['id'];
  public sensor$ = this.sensorsService.getSensorDetails(this.sensorId).pipe(
    tap(sensor => this.buildForm(sensor)));

  constructor(
    private sensorsService: SensorsHttpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  buildForm(sensor: SensorDetails) {
    this.form = this.formBuilder.group({
      code: [{ value: sensor.code, disabled: true }, Validators.required],
      isPrivate: [sensor.isPrivate, Validators.required],
      ownerId: [{ value: sensor.owner.id, disabled: true }, Validators.required]
    });
  }

  onSubmit() {
    const sensorUpdate = {
      id: this.sensorId,
      isPrivate: this.form.controls.isPrivate.value
    } as SensorUpdate;

    this.isSubmitButtonEnabled = false;
    this.sensorsService.updateSensor(sensorUpdate).subscribe(() => {
      window.alert('sensor edited');
      this.isSubmitButtonEnabled = true;
    });
  }
} 
