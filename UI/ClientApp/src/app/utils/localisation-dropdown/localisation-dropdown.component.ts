import { Component, OnInit, Inject } from "@angular/core";
import {
  L10N_CONFIG,
  L10nConfig,
  L10N_LOCALE,
  L10nLocale,
  L10nTranslationService
} from "angular-l10n";

@Component({
  selector: 'localisation-dropdown',
  templateUrl: './localisation-dropdown.component.html',
  styleUrls: ['./localisation-dropdown.component.css']
})
export class LocalisationDropdown implements OnInit {
  schema = this.l10nConfig.schema;

  constructor(
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    @Inject(L10N_CONFIG) private l10nConfig: L10nConfig,
    private translation: L10nTranslationService
  ) { }

  ngOnInit() {
    this.translation.onChange().subscribe({
      next: (locale: L10nLocale) => console.log(locale)
    });
    this.translation.onError().subscribe({
      next: (error: any) => {
        if (error) console.log(error);
      }
    });
  }

  setLocale(locale: L10nLocale): void {
    this.translation.setLocale(locale);
  }
}
