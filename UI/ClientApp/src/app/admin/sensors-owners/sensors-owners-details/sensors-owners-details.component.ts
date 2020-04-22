import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { SensorsOwnersHttpService } from "../../../shared/services/sensor-owners.service";
import { SensorOwner } from "../../../shared/models/sensor-owner.type";

@Component({
  selector: 'sensors-owners-details',
  templateUrl: './sensors-owners-details.component.html'
})

export class SensorsOwnersDetailsComponent implements OnInit {
  public form: FormGroup;
  public sensorsOwner: SensorOwner;
  public sensorOwnerId: number;

  constructor(
    private sensorsOwnersService: SensorsOwnersHttpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sensorOwnerId = +this.route.snapshot.params['id'];
    this.sensorsOwnersService.getSensorsOwner(this.sensorOwnerId).subscribe(
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
