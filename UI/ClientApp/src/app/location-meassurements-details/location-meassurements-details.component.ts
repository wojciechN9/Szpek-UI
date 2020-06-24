import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getAirQualityText, getAirQualityColor } from '../utils/enum/air-quality';
import { AirQualityEnum } from '../location-meassurements/air-quality.type';
import { FavouriteLocationsService } from '../utils/favourite-locations-service/favourite-locations-service';
import { MeassurementChart } from '../utils/meassurements-chart/meassurement-chart.type';
import { MeassurementsHttpService } from '../utils/http-services/meassurements.http.service';
import { Title } from '@angular/platform-browser';
import { L10N_LOCALE, L10nLocale, L10nTranslationService } from 'angular-l10n';
import { Subscription } from 'rxjs';
import { LocationMeassurements } from '../location-meassurements/location-meassurements.type';
import { Measurement } from '../location-meassurements/measurement.type';

@Component({
  selector: 'location-meassurements-details',
  templateUrl: './location-meassurements-details.component.html',
  styleUrls: ['../app.component.css']
})
export class LocationMeassurementsDetailsComponent implements OnInit, OnDestroy {
  private titleTranslationSubscribtion: Subscription;
  public locationMeassurements: LocationMeassurements;
  public currentMeassurement: Measurement;
  public id: number;
  favouritesIds: Array<number>;
  loaderActive = true;

  constructor(
    private meassurementsService: MeassurementsHttpService,
    private route: ActivatedRoute,
    private favouriteLocations: FavouriteLocationsService,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private translation: L10nTranslationService,
    private titleService: Title) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.meassurementsService.getLocationMeassure(this.id).subscribe(result => {
      this.locationMeassurements = this.orderMeassurementsByDateTimeDesc(result);
      this.currentMeassurement = this.locationMeassurements.meassurements[0];
      this.loaderActive = false;

      this.titleTranslationSubscribtion = this.translation.onChange().subscribe(() => {
        const title = this.locationMeassurements.address.city + ' - ' + this.translation.translate('airQuality') + " - " + this.translation.translate('appName');
        this.titleService.setTitle(title);
      });
    });        

    this.favouritesIds = this.favouriteLocations.getFavouriteLocationsIds();
  }

  ngOnDestroy() {
    this.titleTranslationSubscribtion.unsubscribe();
  }

  orderMeassurementsByDateTimeDesc(locationMeassurements: LocationMeassurements) {
    locationMeassurements.meassurements = locationMeassurements.meassurements.sort((a, b) => {
      if (a.smogMeasurement.periodTo < b.smogMeasurement.periodTo) { return 1; }
      if (a.smogMeasurement.periodTo > b.smogMeasurement.periodTo) { return -1; }
      if (a.smogMeasurement.periodTo === b.smogMeasurement.periodTo) { return 0; }
    });

    return locationMeassurements;
  }

  getPM10ChartData() {
    const smogMeasurement = this.locationMeassurements.meassurements.map(({ smogMeasurement }) => smogMeasurement)

    return smogMeasurement.map(m => this.convertToChart(m.id, m.pm10Quality, m.pm10Value, new Date(m.periodTo)));
  }

  getPM25ChartData() {
    const smogMeasurement = this.locationMeassurements.meassurements.map(({ smogMeasurement }) => smogMeasurement)

    return smogMeasurement.map(m => this.convertToChart(m.id, m.pm25Quality, m.pm25Value, new Date(m.periodTo)));
  }

  convertToChart(id: number, airQuality: AirQualityEnum, value: number, periodTo: Date) {
    return {
      id: id,
      airQuality: airQuality,
      value: value,
      periodTo: periodTo
    } as MeassurementChart
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
