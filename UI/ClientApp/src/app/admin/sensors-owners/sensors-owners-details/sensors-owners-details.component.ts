import { SensorsOwnersHttpService } from "../../../utils/http-services/sensor-owners.service";
import { SensorOwner } from "../sensor-owner.type";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'sensors-owners-details',
  templateUrl: './sensors-owners-details.component.html'
})

export class SensorsOwnersDetailsComponent implements OnInit {
  public form: FormGroup;
  public sensorsOwner: SensorOwner;
  public sensorId: number;

  constructor(
    private sensorsOwnersService: SensorsOwnersHttpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sensorId = +this.route.snapshot.params['id'];
    this.sensorsOwnersService.getSensorsOwner(this.sensorId).subscribe(
      result => {
        this.sensorsOwner = result;
        this.form = this.formBuilder.group({
          name: [{ value: this.sensorsOwner.name, disabled: true }, Validators.required],
          address: [this.sensorsOwner.address, Validators.required],
          isCompany: [this.sensorsOwner.isCompany, Validators.required]
        });
      });
  }
  
  onSubmit() {
    alert('not active');
  }
} 
