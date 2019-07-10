import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SzpekHttpService } from '../app.http.service';
import { getAirQualityText, getAirQualityColor } from '../utils/enum/air-quality';
import { AirQualityEnum } from '../location-meassurements/air-quality.type';
import { LocationMeassurements } from '../location-meassurements/location-meassurements.type';
import { Meassurement } from '../location-meassurements/meassurement.type';
import { FavouriteLocationsService } from '../utils/favourite-locations-service/favourite-locations-service';


@Component({
  selector: 'location-meassurements-details',
  templateUrl: './location-meassurements-details.component.html',
  styleUrls: ['../app.component.css']
})
export class LocationMeassurementsDetailsComponent implements OnInit {
  public locationMeassurements: LocationMeassurements;
  public currentMeassurement: Meassurement;
  public id: number;
  favouritesIds: Array<number>;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.szpekService.getLocationsMeassuresDetails(this.id).subscribe(result => {
      this.locationMeassurements = this.orderMeassurementsByDateTimeDesc(result);
      this.currentMeassurement = this.locationMeassurements.meassurements[0];
    });

    this.favouritesIds = this.favouriteLocations.getFavouriteLocationsIds();
  }

  constructor(
    private szpekService: SzpekHttpService,
    private route: ActivatedRoute,
    private favouriteLocations: FavouriteLocationsService) {
  }

  orderMeassurementsByDateTimeDesc(locationMeassurements: LocationMeassurements) {
    locationMeassurements.meassurements = locationMeassurements.meassurements.sort((a, b) => {
      if (a.periodTo < b.periodTo) { return 1; }
      if (a.periodTo > b.periodTo) { return -1; }
      if (a.periodTo == b.periodTo) { return 0; }
    });

    return locationMeassurements;
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
