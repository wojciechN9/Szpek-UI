import { AirQualityEnum } from "../../location-meassurements/air-quality.type";

export function getAirQualityText(airQuality: AirQualityEnum) {
  switch (airQuality) {
    case AirQualityEnum.VeryGood: {
      return "Bardzo dobry";
    }
    case AirQualityEnum.Good: {
      return "Dobry";
    }
    case AirQualityEnum.Ok: {
      return "Umiarkowany";
    }
    case AirQualityEnum.Poor: {
      return "Dostateczny";
    }
    case AirQualityEnum.Bad: {
      return "Zły";
    }
    case AirQualityEnum.VeryBad: {
      return "Bardzo zły";
    }
    case AirQualityEnum.Error: {
      return "Błąd pomiaru";
    }
  }
}

export function getAirQualityColor(airQuality: AirQualityEnum) {
  switch (airQuality) {
    case AirQualityEnum.VeryGood: {
      return "#56b207";
    }
    case AirQualityEnum.Good: {
      return "#b0dd10";
    }
    case AirQualityEnum.Ok: {
      return "#ffd912";
    }
    case AirQualityEnum.Poor: {
      return "#e48100";
    }
    case AirQualityEnum.Bad: {
      return "#e50000";
    }
    case AirQualityEnum.VeryBad: {
      return "#9a0000";
    }
    case AirQualityEnum.Error: {
      return "#bfbfbf";
    }
  }
}
