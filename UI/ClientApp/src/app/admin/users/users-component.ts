import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserCreate } from "./user-create.type";
import { AuthenticationService } from "../../auth/authentication.service";
import { Subject, merge } from "rxjs";
import { User } from "./user.type";
import { scan } from "rxjs/operators";


@Component({
  selector: 'users',
  templateUrl: './users-component.html'
})
export class UsersComponent implements OnInit {
  public form: FormGroup;
  public isAddFormVisible = false;
  public users$ = this.authenticationService.users$;

  private userCreatedSubject = new Subject<User>();
  userCreatedAction$ = this.userCreatedSubject.asObservable();
  usersWithAdd$ = merge(this.users$, this.userCreatedAction$).pipe(
    scan((acc: User[], value: User) => [value, ...acc]));

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
      () => this.userCreatedSubject.next(this.convertToUser(user)));
  }

  private convertToUser(userCreate: UserCreate) {
    return {
      userName: userCreate.username,
      email: userCreate.email
    } as User;
  }

  onReset() {
    this.form.reset();
  }
}
