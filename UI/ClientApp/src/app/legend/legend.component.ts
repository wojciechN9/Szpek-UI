import { Component, OnInit, OnDestroy } from "@angular/core";
import { AirQualityEnum } from "../location-meassurements/air-quality.type";
import { getEnumValues } from "../utils/enum/enum-conversion";
import { getAirQualityText, getAirQualityColor, getPM10QualityRange, getPM25QualityRange } from "../utils/enum/air-quality";
import { Title } from "@angular/platform-browser";
import { SidebarService } from "../utils/sidebar-service/sidebar-service";

@Component({
  selector: 'legend',
  templateUrl: './legend.component.html'
})
export class LegendComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    this.titleService.setTitle('Legenda jakości, stanu i zanieczyszczenia powietrza - Szpek.pl');
    this.sidebarService.showSidebar();
  }

  ngOnDestroy(): void {
    this.sidebarService.hideSidebar();
  }

  constructor(private titleService: Title, private sidebarService: SidebarService) { }

  airQualities: Array<AirQualityEnum> = getEnumValues(AirQualityEnum);

  getQualityText(airQuality: AirQualityEnum) {
    return getAirQualityText(airQuality);
  }

  getQualityColor(airQuality: AirQualityEnum) {
    return getAirQualityColor(airQuality);
  }

  getPM10Range(airQuality: AirQualityEnum) {
    return getPM10QualityRange(airQuality);
  }

  getPM25Range(airQuality: AirQualityEnum) {
    return getPM25QualityRange(airQuality);
  }
}
