import { Component, Inject } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { AuthUser } from '../authentication/auth-user.type';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  currentUser: AuthUser;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    @Inject(L10N_LOCALE) public locale: L10nLocale) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x)
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  //fix this add get or subscribe it by rxjs events
  isUserLogged() {
    return this.currentUser ? true : false;
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
