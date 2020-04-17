import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { AuthUser } from '../authentication/auth-user.type';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';

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

  //TODO add dropdown with flags
  //TODO fix ol map warning, map does not work on click on element
  //TODO style app height 100%
  //TODO create a folder for pages and cmponents and services
  //TODO create a separate file for each language

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
