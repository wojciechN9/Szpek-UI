import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { L10nTranslationService, L10N_LOCALE, L10nLocale } from "angular-l10n";
import { Subscription } from "rxjs";

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html'
})

export class ContactComponent implements OnInit, OnDestroy {
  private titleTranslationSubscribtion: Subscription;

  constructor(
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private translation: L10nTranslationService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleTranslationSubscribtion = this.translation.onChange().subscribe(() => {
      const title = this.translation.translate('contact') + " - " + this.translation.translate('appName');
      this.titleService.setTitle(title);
    })

  }

  ngOnDestroy(): void {
    this.titleTranslationSubscribtion.unsubscribe();
  }
}
