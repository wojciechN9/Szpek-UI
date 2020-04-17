import { Component, Inject } from "@angular/core";
import { L10N_LOCALE, L10nLocale } from "angular-l10n";

@Component({
  selector: 'password-change-ok',
  templateUrl: 'password-change-ok.component.html'
})
export class PasswordChangeOkComponent {

  constructor(@Inject(L10N_LOCALE) public locale: L10nLocale) { }
}
