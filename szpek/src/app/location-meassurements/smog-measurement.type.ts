import { AirQualityEnum } from "./air-quality.type";

export interface SmogMeasurement {
  id: number;
  airQuality: AirQualityEnum;
  pm10Value: number;
  pm10Quality: AirQualityEnum;
  pm25Value: number;
  pm25Quality: AirQualityEnum;
  pm1Value: number;
  periodTo: string;
}
