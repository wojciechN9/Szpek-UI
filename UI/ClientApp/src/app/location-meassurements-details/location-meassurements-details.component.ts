import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getAirQualityText, getAirQualityColor } from '../utils/enum/air-quality';
import { AirQualityEnum } from '../location-meassurements/air-quality.type';
import { Meassurement } from '../location-meassurements/meassurement.type';
import { FavouriteLocationsService } from '../utils/favourite-locations-service/favourite-locations-service';
import { MeassurementChart } from '../utils/meassurements-chart/meassurement-chart.type';
import { MeassurementsHttpService } from '../utils/http-services/meassurements.http.service';
import { Title } from '@angular/platform-browser';
import { MeassurementDetails } from './meassurement-details.type';
import { LocationMeassurementsDetails } from './location-meassurements-details.type';
import { SidebarService } from '../utils/sidebar-service/sidebar-service';
import { L10N_LOCALE, L10nLocale, L10nTranslationService } from 'angular-l10n';
import { Subscription } from 'rxjs';

@Component({
  selector: 'location-meassurements-details',
  templateUrl: './location-meassurements-details.component.html',
  styleUrls: ['../app.component.css']
})
export class LocationMeassurementsDetailsComponent implements OnInit, OnDestroy {
  private titleTranslationSubscribtion: Subscription;
  public locationMeassurements: LocationMeassurementsDetails;
  public currentMeassurement: MeassurementDetails;
  public pm10Meassurements: MeassurementChart[];
  public pm25Meassurements: MeassurementChart[];
  public id: number;
  favouritesIds: Array<number>;
  loaderActive = true;

  constructor(
    private meassurementsService: MeassurementsHttpService,
    private route: ActivatedRoute,
    private favouriteLocations: FavouriteLocationsService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private translation: L10nTranslationService,
    private titleService: Title,
    private sidebarService: SidebarService) {
    this.sidebarService.showSidebar();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.meassurementsService.getLocationsMeassuresDetails(this.id).subscribe(result => {
      this.locationMeassurements = this.orderMeassurementsByDateTimeDesc(result);
      this.currentMeassurement = this.locationMeassurements.meassurements[0];
      this.pm10Meassurements = this.convertToPM10(this.locationMeassurements.meassurements);
      this.pm25Meassurements = this.convertToPM25(this.locationMeassurements.meassurements);
      this.loaderActive = false;

      this.titleTranslationSubscribtion = this.translation.onChange().subscribe(() => {
        const title = this.locationMeassurements.address.city + ' - ' + this.translation.translate('airQuality') + " - " + this.translation.translate('appName');
        this.titleService.setTitle(title);
      });
    });        

    this.favouritesIds = this.favouriteLocations.getFavouriteLocationsIds();
  }

  ngOnDestroy() {
    this.sidebarService.hideSidebar();
    this.titleTranslationSubscribtion.unsubscribe();
  }

  orderMeassurementsByDateTimeDesc(locationMeassurements: LocationMeassurementsDetails) {
    locationMeassurements.meassurements = locationMeassurements.meassurements.sort((a, b) => {
      if (a.periodTo < b.periodTo) { return 1; }
      if (a.periodTo > b.periodTo) { return -1; }
      if (a.periodTo === b.periodTo) { return 0; }
    });

    return locationMeassurements;
  }

  convertToPM10(meassurements: Array<Meassurement>) {
    return meassurements.map(m => this.convertToChart(m.id, m.pm10Quality, m.pm10Value, new Date(m.periodTo)));
  }

  convertToPM25(meassurements: Array<Meassurement>) {
    return meassurements.map(m => this.convertToChart(m.id, m.pm25Quality, m.pm25Value, new Date(m.periodTo)));
  }

  convertToChart(id: number, airQuality: AirQualityEnum, value: number, periodTo: Date) {
    return <MeassurementChart>{
      id: id,
      airQuality: airQuality,
      value: value,
      periodTo: periodTo
    }
  }

  getQualityText(airQuality: AirQualityEnum) {
    return getAirQualityText(airQuality);
  }

  getQualityColor(airQuality: AirQualityEnum) {
    return getAirQualityColor(airQuality);
  }

  onClickFavourite() {
    this.favouritesIds = this.favouriteLocations.toggleLocation(this.favouritesIds, this.id);

    this.favouriteLocations.setFavouriteLocationsIds(this.favouritesIds);
  }

  isFavourite() {
    if (this.favouritesIds.indexOf(this.id) === -1) {
      return false;
    }

    return true;
  }
}
