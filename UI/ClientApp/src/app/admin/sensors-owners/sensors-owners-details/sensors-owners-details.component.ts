import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { SensorsOwnersHttpService } from "../../../shared/services/sensor-owners.service";
import { SensorOwner } from "../../../shared/models/sensor-owner.type";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: 'sensors-owners-details',
  templateUrl: './sensors-owners-details.component.html'
})

export class SensorsOwnersDetailsComponent implements OnInit {
  public form: FormGroup;
  public sensorsOwner$: Observable<SensorOwner>;
  public sensorOwnerId: number;

  constructor(
    private sensorsOwnersService: SensorsOwnersHttpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sensorOwnerId = +this.route.snapshot.params['id'];
    this.sensorsOwner$ = this.sensorsOwnersService.getSensorsOwner(this.sensorOwnerId).pipe(
      tap(sensorsOwner => {
        this.form = this.formBuilder.group({
          name: [{ value: sensorsOwner.name, disabled: true }, Validators.required],
          address: [sensorsOwner.address, Validators.required],
          isCompany: [sensorsOwner.isCompany, Validators.required]
        });
      }));
  }

  onSubmit() {
    alert('not active');
  }
} 
