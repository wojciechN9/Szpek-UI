import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LocationMeassurements } from '../location-meassurements/location-meassurements.type';
import { MeassurementsHttpService } from '../utils/http-services/meassurements.http.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { L10N_LOCALE, L10nLocale, L10nTranslationService } from 'angular-l10n';

@Component({
  selector: 'location-map',
  templateUrl: './location-map.component.html'
})
export class LocationMapComponent implements OnInit, OnDestroy {
  public locationsMeassurements: LocationMeassurements[];
  loaderActive = true;
  private titleTranslationSubscribtion: Subscription;

  constructor(
    private meassurementsService: MeassurementsHttpService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private translation: L10nTranslationService,
    private titleService: Title) { }

  ngOnInit() {
    this.meassurementsService.getLocationsMeassures().subscribe(result => {
      this.locationsMeassurements = result;
      this.loaderActive = false;
    });

    this.titleTranslationSubscribtion = this.translation.onChange().subscribe(() => {
      const title = this.translation.translate('mapOfQualityConditionAndAirPollution') + " - " + this.translation.translate('appName');
      this.titleService.setTitle(title);
    })
  }

  ngOnDestroy() {
    this.titleTranslationSubscribtion.unsubscribe();
  }
}
