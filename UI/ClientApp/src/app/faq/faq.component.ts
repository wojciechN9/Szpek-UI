import { Title } from "@angular/platform-browser";
import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Subscription } from "rxjs";
import { L10N_LOCALE, L10nLocale, L10nTranslationService } from "angular-l10n";

@Component({
  selector: 'faq',
  templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit, OnDestroy {
  private titleTranslationSubscribtion: Subscription;

  constructor(
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private translation: L10nTranslationService,
    private titleService: Title) {}

  ngOnInit(): void {
    this.titleTranslationSubscribtion = this.translation.onChange().subscribe(() => {
      const title = this.translation.translate('frequentlyAskedQuestions') + " - " + this.translation.translate('appName');
      this.titleService.setTitle(title);
    });
  }

  ngOnDestroy(): void {
    this.titleTranslationSubscribtion.unsubscribe();
  }
}
