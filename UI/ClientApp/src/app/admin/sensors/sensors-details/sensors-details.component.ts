import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { SensorDetails } from "./sensor-details.type";
import { SensorsHttpService } from "../../sensors.service";
import { SensorUpdate } from "./sensor-update.type";

@Component({
  selector: 'sensors-details',
  templateUrl: './sensors-details.component.html'
})

export class SensorsDetailsComponent implements OnInit {
  public form: FormGroup;
  public sensor: SensorDetails;
  public sensorId: number;
  public isSubmitButtonEnabled = true;

  constructor(
    private sensorsService: SensorsHttpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sensorId = +this.route.snapshot.params['id'];
    this.sensorsService.getSensorDetails(this.sensorId).subscribe(
      result => {
        this.sensor = result;
        this.form = this.formBuilder.group({
          code: [{ value: this.sensor.code, disabled: true }, Validators.required],
          isPrivate: [this.sensor.isPrivate, Validators.required],
          ownerId: [{ value: this.sensor.owner.id, disabled: true }, Validators.required]
        });
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
