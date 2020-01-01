import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { MeassurementsHttpService } from "../http-services/meassurements.http.service";
import { Meassurement } from "../../location-meassurements/meassurement.type";
import { NgbDateStruct, NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { AirQualityEnum } from "../../location-meassurements/air-quality.type";
import { getAirQualityText, getAirQualityColor } from "../enum/air-quality";

@Component({
  selector: 'meassurements-calendar',
  templateUrl: './meassurements-calendar.component.html'
})
export class MeassurementsCalendarComponent implements OnChanges {
  @Input() locationId: number;
  @Input() initialMeassurementsData: Array<Meassurement>;
  public calendarMeassurements: Array<Meassurement>;
  public loaderActive = false;
  public currentCalendarDay: NgbDateStruct;
  public initialCalendarDay: NgbDateStruct;
  public dataFetched = false;

  constructor(private meassurementsService: MeassurementsHttpService) { }

  ngOnChanges() {
    if (this.initialMeassurementsData !== null && this.dataFetched === false) {
      this.calendarMeassurements = this.initialMeassurementsData;

      if (this.initialMeassurementsData.length !== 0)
        this.initialCalendarDay = {
          year: new Date(this.initialMeassurementsData[0].periodTo).getFullYear(),
          month: new Date(this.initialMeassurementsData[0].periodTo).getMonth() + 1,
          day: new Date(this.initialMeassurementsData[0].periodTo).getDate()
        };
      else {
        let today = new Date();
        this.initialCalendarDay = {
          year: today.getFullYear(),
          month: today.getMonth() + 1,
          day: today.getDate()
        };
      }
      this.currentCalendarDay = this.initialCalendarDay;

      this.dataFetched = true;
    }
  }

  onDateSelected(ngbDate: NgbDate) {
    this.loaderActive = true;
    this.meassurementsService.getMeassurementsByDate(this.locationId, new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day).toISOString())
      .subscribe((result) => {
        this.calendarMeassurements = result;
        this.loaderActive = false;
      });
  }

  getQualityText(airQuality: AirQualityEnum) {
    return getAirQualityText(airQuality);
  }

  getQualityColor(airQuality: AirQualityEnum) {
    return getAirQualityColor(airQuality);
  }
}
