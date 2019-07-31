import { Component, OnInit } from "@angular/core";
import { AirQualityEnum } from "../location-meassurements/air-quality.type";
import { getEnumValues } from "../utils/enum/enum-conversion";
import { getAirQualityText, getAirQualityColor, getPM10QualityRange, getPM25QualityRange } from "../utils/enum/air-quality";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'legend',
  templateUrl: './legend.component.html'
})
export class LegendComponent implements OnInit {

   ngOnInit(): void {
      this.titleService.setTitle('Legenda jakości, stanu i zanieczyszczenia powietrza - Szpek.pl');
  }

  constructor(private titleService: Title) {}

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
