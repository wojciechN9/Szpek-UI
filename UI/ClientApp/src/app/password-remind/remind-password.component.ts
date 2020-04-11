import { OnInit, Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../utils/authentication/authentication.service";
import { UserRemindPassword } from "./user-remind-password.type";

@Component({
  selector: 'remind-password',
  templateUrl: 'remind-password.component.html'
})
export class RemindPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const userRemindPassword = {
      email: this.form.controls.email.value
    } as UserRemindPassword;

    this.authenticationService.remindPassword(userRemindPassword).subscribe(
      () => {
        this.router.navigate(['/remindPassword/ok']);
      });
  }
}
