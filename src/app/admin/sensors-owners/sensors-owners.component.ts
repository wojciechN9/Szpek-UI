import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SensorsOwnersHttpService } from "../../shared/services/sensor-owners.service";
import { SensorOwnerPost } from "../../shared/models/sensor-owner-post.type";
import { AuthenticationService } from "../../auth/authentication.service";
import { SensorOwner } from "../../shared/models/sensor-owner.type";
import { Subject, merge } from "rxjs";
import { scan } from "rxjs/operators";

@Component({
  selector: 'sensors-owners',
  templateUrl: './sensors-owners.component.html'
})
export class SensorsOwnersComponent implements OnInit {
  public form: FormGroup;
  public isAddFormVisible = false;
  public sensorsOwners$ = this.sensorsOwnersService.sensorsOwners$;
  public users$ = this.authenticationService.usersWithoutOwner$;
  private sensorOwnerAddedSubject = new Subject<SensorOwner>();
  private sensorOwnerAddedAction$ = this.sensorOwnerAddedSubject.asObservable();

  sensorsOwnersWithAdded$ = merge(this.sensorsOwners$, this.sensorOwnerAddedAction$).pipe(
    scan((acc: SensorOwner[], value: SensorOwner) => [value, ...acc])
  );

  constructor(
    private sensorsOwnersService: SensorsOwnersHttpService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userId: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      isCompany: [false, Validators.required]
    });
  }

  public triggerFormVisible() {
    this.isAddFormVisible = !this.isAddFormVisible;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const sensorOwner = {
      userId: this.form.controls.userId.value,
      name: this.form.controls.name.value,
      address: this.form.controls.address.value,
      isCompany: this.form.controls.isCompany.value
    } as SensorOwnerPost;

    this.sensorsOwnersService.postSensorOwner(sensorOwner).subscribe(
      (id) => this.sensorOwnerAddedSubject.next(this.convertToSensorOwner(sensorOwner, id)));
  }

  private convertToSensorOwner(sensorOwnerPost: SensorOwnerPost, sensorId: number) {
    return {
      id: sensorId,
      address: sensorOwnerPost.address,
      name: sensorOwnerPost.name,
      isCompany: sensorOwnerPost.isCompany
    } as SensorOwner;
  }

  onReset() {
    this.form.reset();
  }
}
