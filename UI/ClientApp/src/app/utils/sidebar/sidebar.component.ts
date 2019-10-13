import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { getEnumValues } from '../enum/enum-conversion';
import { AirQualityEnum } from '../../location-meassurements/air-quality.type';
import { getAirQualityText, getAirQualityColor } from '../enum/air-quality';
import { SidebarService } from '../sidebar-service/sidebar-service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../app.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Output() isSidebarShow = new EventEmitter<boolean>();

  constructor(private readonly sidebarService: SidebarService) { }

  ngOnInit() {
    this.sidebarService.OnShowSidebar.subscribe(value => {
      this.isSidebarShow.emit(value);
    });
  }

  ngOnDestroy() {
    this.sidebarService.OnShowSidebar.unsubscribe();
  }

  airQualities: Array<AirQualityEnum> = getEnumValues(AirQualityEnum); 

  getQualityText(airQuality: AirQualityEnum) {
    return getAirQualityText(airQuality);
  }

  getQualityColor(airQuality: AirQualityEnum) {
    return getAirQualityColor(airQuality);
  }
}
