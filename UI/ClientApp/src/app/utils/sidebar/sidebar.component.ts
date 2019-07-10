import { Component, OnInit } from '@angular/core';
import { getEnumValues } from '../enum/enum-conversion';
import { AirQualityEnum } from '../../location-meassurements/air-quality.type';
import { getAirQualityText, getAirQualityColor } from '../enum/air-quality';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../app.component.css']
})
export class SidebarComponent{
  airQualities: Array<AirQualityEnum> = getEnumValues(AirQualityEnum); 

  getQualityText(airQuality: AirQualityEnum) {
    return getAirQualityText(airQuality);
  }

  getQualityColor(airQuality: AirQualityEnum) {
    return getAirQualityColor(airQuality);
  }
}
