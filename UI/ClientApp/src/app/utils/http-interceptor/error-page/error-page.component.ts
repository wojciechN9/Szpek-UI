import { Component, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';


@Component({
  selector: 'error-page',
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent {
  @Input() statusCode: string;
  @Input() reason: string;

  constructor(
    private _route: ActivatedRoute,
    @Inject(L10N_LOCALE) public locale: L10nLocale) {
    this.statusCode = this._route.snapshot.paramMap.get('statusCode');
    this.reason = this._route.snapshot.paramMap.get('reason');
  }
}
