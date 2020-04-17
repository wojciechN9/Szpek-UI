import { Component, Inject } from "@angular/core";
import { L10N_LOCALE, L10nLocale } from "angular-l10n";

@Component({
  selector: 'remind-password-ok',
  templateUrl: 'remind-password-ok.component.html'
})
export class RemindPasswordOkComponent {

  constructor(@Inject(L10N_LOCALE) public locale: L10nLocale) { }
}
