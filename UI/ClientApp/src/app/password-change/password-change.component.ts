import { OnInit, Component, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../utils/authentication/authentication.service";
import { UserPasswordReset } from "./user-password-reset.type";
import { MustMatch } from "../utils/input-error/must-match.validator";
import { PasswordValidator } from "../utils/input-error/password.validator";
import { L10N_LOCALE, L10nLocale } from "angular-l10n";

@Component({
  selector: 'password-change',
  templateUrl: 'password-change.component.html'
})
export class PasswordChangeComponent implements OnInit {
  form: FormGroup;
  username: string;
  token: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.username = this.route.snapshot.queryParamMap.get('username');
    this.token = this.route.snapshot.queryParamMap.get('token');

    this.form = this.formBuilder.group({
      newPassword: ['',
        [Validators.required, Validators.minLength(6), PasswordValidator]
      ],
      newPasswordConfirmed: [''],
      username: [''],
      token: ['']
    }, { validator: MustMatch('newPassword', 'newPasswordConfirmed') });
  }


  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    var userRemindPassword = <UserPasswordReset>{
      newPassword: this.form.controls.newPassword.value,
      username: this.username,
      token: this.token
    };

    this.authenticationService.resetPassword(userRemindPassword).subscribe(
      () => {
        this.router.navigate(['/passwordChange/ok']);
      });
  }
}
