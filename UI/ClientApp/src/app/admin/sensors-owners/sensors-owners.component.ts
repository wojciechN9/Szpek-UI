import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SensorsOwnersHttpService } from "../../shared/services/sensor-owners.service";
import { SensorOwnerPost } from "../../shared/models/sensor-owner-post.type";
import { AuthenticationService } from "../../auth/authentication.service";

@Component({
  selector: 'sensors-owners',
  templateUrl: './sensors-owners.component.html'
})
export class SensorsOwnersComponent implements OnInit {
  public form: FormGroup;
  public isAddFormVisible = false;
  public sensorsOwners$ = this.sensorsOwnersService.sensorsOwners$;
  public users$ = this.authenticationService.usersWithoutOwner$;

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
      id => this.router.navigate(['/admin/sensorsOwners', id]));
  }

  onReset() {
    this.form.reset();
  }
}
