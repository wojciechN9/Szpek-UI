import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SzpekHttpService } from '../app.http.service';
import { getAirQualityText, getAirQualityColor } from '../utils/enum/air-quality';
import { AirQualityEnum } from '../location-meassurements/air-quality.type';
import { LocationMeassurements } from '../location-meassurements/location-meassurements.type';
import { Meassurement } from '../location-meassurements/meassurement.type';


@Component({
  selector: 'location-meassurements-details',
  templateUrl: './location-meassurements-details.component.html'
})
export class LocationMeassurementsDetailsComponent implements OnInit {
  public locationMeassurements: LocationMeassurements;
  public currentMeassurement: Meassurement;
  public id: number;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.szpekService.getLocationsMeassuresDetails(this.id).subscribe(result => {
      this.locationMeassurements = result;
      this.currentMeassurement = this.locationMeassurements.meassurements[0];
    });
  }

  constructor(
    private szpekService: SzpekHttpService,
    private route: ActivatedRoute) {
  }

  getQualityText(airQuality: AirQualityEnum) {
    return getAirQualityText(airQuality);
  }

  getQualityColor(airQuality: AirQualityEnum) {
    return getAirQualityColor(airQuality);
  }
}
