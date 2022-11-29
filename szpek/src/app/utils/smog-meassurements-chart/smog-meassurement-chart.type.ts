import { AirQualityEnum } from "../../location-meassurements/air-quality.type";

export interface SmogMeassurementChart {
  id: number;
  airQuality: AirQualityEnum;
  value: number;
  periodTo: Date;
}
