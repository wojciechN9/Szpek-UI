import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { SensorDetails } from "./sensor-details.type";
import { SensorsHttpService } from "../../sensors.service";

@Component({
  selector: 'sensors-details',
  templateUrl: './sensors-details.component.html'
})

export class SensorsDetailsComponent implements OnInit {
  public form: FormGroup;
  public sensor: SensorDetails;
  public sensorId: number;

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
    alert('not active');
  }
} 
