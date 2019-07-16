import { OnInit, Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SzpekHttpService } from "../app.http.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../utils/authentication/authentication.service";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]});
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    var userLogin = <UserLogin>{
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
