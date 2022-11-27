import { Component, Input, Inject } from '@angular/core';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';

@Component({
  selector: 'input-error',
  templateUrl: './input-error.component.html',
  providers: []
})
export class InputError {
  @Input("control")
  control: any;

  constructor(@Inject(L10N_LOCALE) public locale: L10nLocale) {}
}
