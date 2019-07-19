import { Component, OnInit } from "@angular/core";
import { SensorsOwnersHttpService } from "../../utils/http-services/sensor-owners.service";
import { SensorOwner } from "./sensor-owner.type";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SensorOwnerPost } from "./sensor-owner-post.type";
import { Router } from "@angular/router";
import { UsersHttpService } from "../../utils/http-services/users.service";
import { User } from "./user.type";

@Component({
  selector: 'sensors-owners',
  templateUrl: './sensors-owners.component.html'
})
export class SensorsOwnersComponent implements OnInit {
  public form: FormGroup;
  public isAddFormVisible: boolean = false;
  public sensorsOwners: Array<SensorOwner>;
  public users: Array<User>;

  constructor(
    private sensorsOwnersService: SensorsOwnersHttpService,
    private usersService: UsersHttpService,
    private formBuilder: FormBuilder,
    private router: Router) {
    sensorsOwnersService.getSensorsOwners().subscribe(
      result => { this.sensorsOwners = result });

    usersService.getUsersWithoutOwner().subscribe(
      result => { this.users = result });
  }

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

    var sensorOwner = <SensorOwnerPost>{
      userId: this.form.controls.userId.value,
      name: this.form.controls.name.value,
      address: this.form.controls.address.value,
      isCompany: this.form.controls.isCompany.value
    };

    this.sensorsOwnersService.postSensorOwner(sensorOwner).subscribe(
      id => this.router.navigate(['/admin/sensorsOwners', id]));
  }

  onReset() {
    this.form.reset();
  }
}
