import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { AuthenticationService } from '../../auth/authentication.service';
import { AuthUser } from '../../auth/auth-user.type';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  currentUser: AuthUser;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    @Inject(L10N_LOCALE) public locale: L10nLocale) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
