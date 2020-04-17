import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LocationMeassurements } from './location-meassurements.type';
import { MeassurementsHttpService } from '../utils/http-services/meassurements.http.service';
import { Title } from '@angular/platform-browser';
import { SidebarService } from '../utils/sidebar-service/sidebar-service';
import { L10nLocale, L10N_LOCALE, L10nTranslationService } from 'angular-l10n';
import { Subscription } from 'rxjs';

@Component({
  selector: 'location-meassurements',
  templateUrl: './location-meassurements.component.html'
})
export class LocationMeassurementsComponent implements OnInit, OnDestroy {
  public locationsMeassurements: LocationMeassurements[];
  loaderActive = true;
  private titleTranslationSubscribtion: Subscription;

  constructor(
    private meassurementsService: MeassurementsHttpService,
    private titleService: Title,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private translation: L10nTranslationService,
    private readonly sidebarService: SidebarService,
  ) {
    this.sidebarService.showSidebar();
  }

  ngOnInit(): void {
    this.meassurementsService.getLocationsMeassures().subscribe(
      result => {
        this.locationsMeassurements = result;
        this.loaderActive = false;
      });

    this.titleTranslationSubscribtion = this.translation.onChange().subscribe(() => {
      const title = this.translation.translate('qualityAndConditionOfAirPollutionInYourTown') + " - " + this.translation.translate('appName');
      this.titleService.setTitle(title);
    })
  }

  ngOnDestroy(): void {
    this.sidebarService.hideSidebar();
    this.titleTranslationSubscribtion.unsubscribe();
  }
}
