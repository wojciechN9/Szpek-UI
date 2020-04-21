import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserCreate } from "./user-create.type";
import { User } from "./user.type";
import { AuthenticationService } from "../../utils/authentication/authentication.service";


@Component({
  selector: 'users',
  templateUrl: './users-component.html'
})
export class UsersComponent implements OnInit {
  public form: FormGroup;
  public isAddFormVisible = false;
  public users: Array<User>;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.authenticationService.getAll().subscribe(
      result => { this.users = result });

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  public triggerFormVisible() {
    this.isAddFormVisible = !this.isAddFormVisible;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    var user = <UserCreate>{
      username: this.form.controls.username.value,
      email: this.form.controls.email.value
    };

    this.authenticationService.register(user).subscribe(
      () => alert('dodany, odswież stonę żeby zobaczyć'));
  }

  onReset() {
    this.form.reset();
  }
}
