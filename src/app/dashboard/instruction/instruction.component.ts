import { Component, Inject } from "@angular/core";
import { L10N_LOCALE, L10nLocale } from "angular-l10n";

@Component({
  selector: 'instruction',
  templateUrl: './instruction.component.html'
})
export class InstructionComponent {
  constructor(@Inject(L10N_LOCALE) public locale: L10nLocale) { }
}
