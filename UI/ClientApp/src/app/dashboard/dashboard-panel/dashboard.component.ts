import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AuthUser } from "../../utils/authentication/auth-user.type";
import { AuthenticationService } from "../../utils/authentication/authentication.service";
import { Role } from "../../utils/authentication/role.type";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  currentUser: AuthUser;

  constructor(private authenticationService: AuthenticationService, private titleService: Title) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.titleService.setTitle('Dashboard Panel - Szpek.pl');
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roles.indexOf(Role.Admin) !== -1;
  }

  get isSensorOwner() {
    return this.currentUser && this.currentUser.roles.indexOf(Role.SensorOwner) !== -1;
  }
}
