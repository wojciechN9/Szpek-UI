import { AirQualityEnum } from "../../location-meassurements/air-quality.type";

export interface MeassurementChart {
  id: number;
  airQuality: AirQualityEnum;
  value: number;
  periodTo: Date;
}
