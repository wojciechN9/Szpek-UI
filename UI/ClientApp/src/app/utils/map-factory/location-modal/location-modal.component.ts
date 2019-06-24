import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AirQualityEnum } from "../../../location-meassurements/air-quality.type";
import { getAirQualityText, getAirQualityClass } from "../../enum/air-quality";

@Component({
  selector: 'location-modal',
  templateUrl: './location-modal.component.html'
})
export class LocationModalComponent implements OnInit {
  @Input() locationId = "";
  @Input() address = "";
  @Input() airQuality = "";
  @Input() pm10Value = "";
  @Input() pm25Value = "";
  @Input() periodTo = "";

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  getQualityText(airQuality: AirQualityEnum) {
    return getAirQualityText(airQuality);
  }

  getQualityClass(airQuality: AirQualityEnum) {
    return getAirQualityClass(airQuality);
  }
}
