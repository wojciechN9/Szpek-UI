import { OnInit, Component, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../utils/authentication/authentication.service";
import { UserRemindPassword } from "./user-remind-password.type";
import { L10N_LOCALE, L10nLocale } from "angular-l10n";

@Component({
  selector: 'remind-password',
  templateUrl: 'remind-password.component.html'
})
export class RemindPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
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
