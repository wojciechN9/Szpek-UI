import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { AirQualityEnum } from "../location-meassurements/air-quality.type";
import { getEnumValues } from "../utils/enum/enum-conversion";
import { getAirQualityText, getAirQualityColor, getPM10QualityRange, getPM25QualityRange } from "../utils/enum/air-quality";
import { Title } from "@angular/platform-browser";
import { L10nTranslationService, L10nLocale, L10N_LOCALE } from "angular-l10n";
import { Subscription } from "rxjs";

@Component({
  selector: 'legend',
  templateUrl: './legend.component.html'
})
export class LegendComponent implements OnInit, OnDestroy {
  airQualities: Array<AirQualityEnum> = getEnumValues(AirQualityEnum);
  private titleTranslationSubscribtion: Subscription;

  constructor(
    private titleService: Title,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private translation: L10nTranslationService) { }

  theLegendOfAirQualityConditionAndPollution

  ngOnInit(): void {
    this.titleTranslationSubscribtion = this.translation.onChange().subscribe(() => {
      const title = this.translation.translate('theLegendOfAirQualityConditionAndPollution') + " - " + this.translation.translate('appName');
      this.titleService.setTitle(title);
    })
  }

  ngOnDestroy(): void {
    this.titleTranslationSubscribtion.unsubscribe();
  }

  getQualityText(airQuality: AirQualityEnum) {
    return getAirQualityText(airQuality);
  }

  getQualityColor(airQuality: AirQualityEnum) {
    return getAirQualityColor(airQuality);
  }

  getPM10Range(airQuality: AirQualityEnum) {
    return getPM10QualityRange(airQuality);
  }

  getPM25Range(airQuality: AirQualityEnum) {
    return getPM25QualityRange(airQuality);
  }
}
