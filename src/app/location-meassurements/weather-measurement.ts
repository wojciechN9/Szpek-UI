export interface WeatherMeasurement{
  id: number;
  celciusTemperature: number;
  atmosphericPreassure: number;
  humidityPercentage: number;
  measurementDate: string; //why not Date?
}
