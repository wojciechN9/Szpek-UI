import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserCreate } from "./user-create.type";
import { AuthenticationService } from "../../auth/authentication.service";


@Component({
  selector: 'users',
  templateUrl: './users-component.html'
})
export class UsersComponent implements OnInit {
  public form: FormGroup;
  public isAddFormVisible = false;
  public users$ = this.authenticationService.users$;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
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

    const user = {
      username: this.form.controls.username.value,
      email: this.form.controls.email.value
    } as UserCreate;

    this.authenticationService.register(user).subscribe(
      () => alert('dodany, odswież stonę żeby zobaczyć'));
  }

  onReset() {
    this.form.reset();
  }
}
