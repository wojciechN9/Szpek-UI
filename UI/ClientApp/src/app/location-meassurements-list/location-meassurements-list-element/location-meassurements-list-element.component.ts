import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LocationMeassurements } from '../../location-meassurements/location-meassurements.type';
import { AirQualityEnum } from '../../location-meassurements/air-quality.type';
import { getAirQualityColor } from '../../utils/enum/air-quality';

@Component({
  selector: 'location-meassurements-list-element',
  templateUrl: './location-meassurements-list-element.component.html',
  styleUrls: ['./location-meassurements-list-element.component.css']
})
export class LocationMeassurementsListElementComponent {
  @Input() locationMeassurements: LocationMeassurements;
  @Input() isFavourite: boolean;
  @Output() favouriteStatusChanged = new EventEmitter<number>();

  onClickFavourite() {
    this.isFavourite = !this.isFavourite;
    this.favouriteStatusChanged.emit(this.locationMeassurements.id);
  }

  getQualityColor(airQuality: AirQualityEnum) {
    return getAirQualityColor(airQuality);
  }
}
