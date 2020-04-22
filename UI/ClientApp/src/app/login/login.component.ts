import { OnInit, Component, OnDestroy, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { UserLogin } from "./userLogin.type";
import { Subscription } from "rxjs";
import { L10N_LOCALE, L10nLocale, L10nTranslationService } from "angular-l10n";
import { AuthenticationService } from "../auth/authentication.service";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private titleTranslationSubscribtion: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private translation: L10nTranslationService,
    private titleService: Title) { }

  ngOnInit() {
    this.titleTranslationSubscribtion = this.translation.onChange().subscribe(() => {
      const title = this.translation.translate('logIn') + " - " + this.translation.translate('appName');
      this.titleService.setTitle(title);
    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]});
  }

  ngOnDestroy() {
    this.titleTranslationSubscribtion.unsubscribe();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const userLogin = <UserLogin> {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };

    this.authenticationService.login(userLogin).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      });
  }

  onReset() {
    this.loginForm.reset();
  }
}
