import { Component, OnInit, OnDestroy } from '@angular/core';
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

@Component({
  selector: 'location-meassurements-details',
  templateUrl: './location-meassurements-details.component.html',
  styleUrls: ['../app.component.css']
})
export class LocationMeassurementsDetailsComponent implements OnInit, OnDestroy {
  public locationMeassurements: LocationMeassurementsDetails;
  public currentMeassurement: MeassurementDetails;
  public pm10Meassurements: MeassurementChart[];
  public pm25Meassurements: MeassurementChart[];
  public id: number;
  favouritesIds: Array<number>;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.meassurementsService.getLocationsMeassuresDetails(this.id).subscribe(result => {
      this.locationMeassurements = this.orderMeassurementsByDateTimeDesc(result);
      this.currentMeassurement = this.locationMeassurements.meassurements[0];
      this.pm10Meassurements = this.convertToPM10(this.locationMeassurements.meassurements);
      this.pm25Meassurements = this.convertToPM25(this.locationMeassurements.meassurements);
      this.titleService.setTitle(this.locationMeassurements.address.city + ' - Jakość i stan powietrza - Szpek.pl');
    });

    this.favouritesIds = this.favouriteLocations.getFavouriteLocationsIds();
    this.sidebarService.showSidebar();
  }

  ngOnDestroy() {
    this.sidebarService.showSidebar();
  }

  constructor(
    private meassurementsService: MeassurementsHttpService,
    private route: ActivatedRoute,
    private favouriteLocations: FavouriteLocationsService,
    private titleService: Title,
    private sidebarService: SidebarService) {
  }

  orderMeassurementsByDateTimeDesc(locationMeassurements: LocationMeassurementsDetails) {
    locationMeassurements.meassurements = locationMeassurements.meassurements.sort((a, b) => {
      if (a.periodTo < b.periodTo) { return 1; }
      if (a.periodTo > b.periodTo) { return -1; }
      if (a.periodTo == b.periodTo) { return 0; }
    });

    return locationMeassurements;
  }

  convertToPM10(meassurements: Array<Meassurement>) {
    return meassurements.map(m => this.convertToChart(m.id, m.pm10Quality, m.pm10Value, m.periodTo));
  }

  convertToPM25(meassurements: Array<Meassurement>) {
    return meassurements.map(m => this.convertToChart(m.id, m.pm25Quality, m.pm25Value, m.periodTo));
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
