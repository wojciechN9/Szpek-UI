import { Component, Input, Inject, OnInit } from "@angular/core";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Meassurement } from "../../../location-meassurements/meassurement.type";
import { MeassurementsHttpService } from "../../../utils/http-services/meassurements.http.service";
import { AirQualityEnum } from "../../../location-meassurements/air-quality.type";
import { getAirQualityText, getAirQualityColor } from "../../../utils/enum/air-quality";
import { L10N_LOCALE, L10nLocale } from "angular-l10n";

@Component({
  selector: 'meassurements-calendar',
  templateUrl: './meassurements-calendar.component.html'
})

export class MeassurementsCalendarComponent implements OnInit {
  @Input() locationId: number;
  public calendarMeassurements: Array<Meassurement>;
  public loaderActive = false;
  public currentDay: NgbDate;
  public today: NgbDate;

  constructor(
    private meassurementsService: MeassurementsHttpService,
    @Inject(L10N_LOCALE) public locale: L10nLocale) { }


  ngOnInit() {
    const today = new Date();
    this.today = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
    this.currentDay = this.today;

    if (this.locationId !== null) {
      this.onDateSelected(this.today);
    }
  }

  onDateSelected(ngbDate: NgbDate) {
    this.loaderActive = true;
    this.meassurementsService.getMeassurementsByDate(this.locationId, this.convertToDate(ngbDate).toISOString())
      .subscribe((result) => {
        this.calendarMeassurements = result;
        this.loaderActive = false;
      });
  }

  convertToDate(ngbDate: NgbDate): Date {
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }

  getQualityText(airQuality: AirQualityEnum) {
    return getAirQualityText(airQuality);
  }

  getQualityColor(airQuality: AirQualityEnum) {
    return getAirQualityColor(airQuality);
  }
}
