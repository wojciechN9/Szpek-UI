import { Component, OnInit, Input, Inject } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { getAirQualityText, getAirQualityColor } from "../../enum/air-quality";
import { L10N_LOCALE, L10nLocale } from "angular-l10n";

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
    public modal: NgbActiveModal,
    @Inject(L10N_LOCALE) public locale: L10nLocale) { }

  ngOnInit() {
  }

  getQualityText(airQuality: any) {
    return getAirQualityText(airQuality);
  }

  getQualityColor(airQuality: any) {
    return getAirQualityColor(airQuality);
  }
}
