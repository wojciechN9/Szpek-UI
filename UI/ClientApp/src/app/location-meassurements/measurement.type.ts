import { SmogMeasurement } from "./smog-measurement.type";
import { WeatherMeasurement } from "./weather-measurement";

export interface Measurement {
 //id: number;
  smogMeasurement: SmogMeasurement;
  weatherMeasurement?: WeatherMeasurement;
}
