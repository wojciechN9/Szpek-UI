import { AirQualityEnum } from "../../location-meassurements/air-quality.type";

export function getAirQualityText(airQuality: AirQualityEnum) {
  switch (airQuality) {
    case AirQualityEnum.VeryGood: {
      return "veryGood";
    }
    case AirQualityEnum.Good: {
      return "good";
    }
    case AirQualityEnum.Ok: {
      return "ok";
    }
    case AirQualityEnum.Poor: {
      return "poor";
    }
    case AirQualityEnum.Bad: {
      return "bad";
    }
    case AirQualityEnum.VeryBad: {
      return "veryBad";
    }
    case AirQualityEnum.Error: {
      return "measurementError";
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

export function convertHexToRgbA(hex: string, opacity: number) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')';
  }
  throw new Error('Bad Hex');
}

export function getAirQualityColorInRgba(airQuality: AirQualityEnum) {
  const hexColor = getAirQualityColor(airQuality);

  return convertHexToRgbA(hexColor, 0.7)
}

export function getPM10QualityRange(airQuality: AirQualityEnum) {
  switch (airQuality) {
    case AirQualityEnum.VeryGood: {
      return "0 - 20";
    }
    case AirQualityEnum.Good: {
      return "20 - 50";
    }
    case AirQualityEnum.Ok: {
      return "50 - 80";
    }
    case AirQualityEnum.Poor: {
      return "80 - 110";
    }
    case AirQualityEnum.Bad: {
      return "110 - 150";
    }
    case AirQualityEnum.VeryBad: {
      return "> 150";
    }
    case AirQualityEnum.Error: {
      return "-";
    }
  }
}

export function getPM25QualityRange(airQuality: AirQualityEnum) {
  switch (airQuality) {
    case AirQualityEnum.VeryGood: {
      return "0 - 13";
    }
    case AirQualityEnum.Good: {
      return "13 - 35";
    }
    case AirQualityEnum.Ok: {
      return "35 - 55";
    }
    case AirQualityEnum.Poor: {
      return "55 - 75";
    }
    case AirQualityEnum.Bad: {
      return "75 - 110";
    }
    case AirQualityEnum.VeryBad: {
      return "> 110";
    }
    case AirQualityEnum.Error: {
      return "-";
    }
  }
}
