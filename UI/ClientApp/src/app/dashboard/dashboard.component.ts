import { Component } from "@angular/core";
import { AuthenticationService } from "../utils/authentication/authentication.service";
import { Role } from "../utils/authentication/role.type";
import { AuthUser } from "../utils/authentication/auth-user.type";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  currentUser: AuthUser;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roles.indexOf(Role.Admin) !== -1;
  }

  get isSensorOwner() {
    return this.currentUser && this.currentUser.roles.indexOf(Role.SensorOwner) !== -1;
  }
}
