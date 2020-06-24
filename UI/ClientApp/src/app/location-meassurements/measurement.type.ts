import { SmogMeasurement } from "./smog-measurement.type";
import { WeatherMeasurement } from "./weather-measurement";

export interface Measurement {
  smogMeasurement: SmogMeasurement;
  weatherMeasurement?: WeatherMeasurement;
}
