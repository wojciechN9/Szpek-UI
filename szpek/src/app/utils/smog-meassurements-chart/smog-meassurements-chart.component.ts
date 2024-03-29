import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { getAirQualityColor, getAirQualityColorInRgba } from '../enum/air-quality';
import { SmogMeassurementChart } from './smog-meassurement-chart.type';
import { AirQualityEnum } from '../../location-meassurements/air-quality.type';

@Component({
  selector: 'smog-meassurements-chart',
  templateUrl: './smog-meassurements-chart.component.html'
})
export class SmogMeassurementsChartComponent implements AfterViewInit  {
  @ViewChild("chartCanvas", { static: true }) canvas: ElementRef;
  @Input() chartName: string;
  @Input() data: SmogMeassurementChart[];

  public chartData: ChartDataSets[];
  public chartLabels: Label[];
  public chartOptions: ChartOptions = {
    responsive: true,
    legend: {
      onClick: (e) => e.stopPropagation()
    }
  };
  public chartColors: Color[];
  public chartLegend = true;
  public chartType = 'line';
  public chartPlugins = [];

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    this.data = this.orderMeassurementsByDateTimeAsc(this.data);

    this.chartData = [
      {
        data: this.data.map(d => this.roundTwoDigits(d.value)),
        label: this.chartName, pointHoverRadius: 7, pointHitRadius: 5
      },
    ];

    this.chartLabels = this.data.map(d => this.datePipe.transform(d.periodTo, "HH:mm"));

    this.chartColors = [{ pointBackgroundColor: this.data.map(d => getAirQualityColor(d.airQuality)) }];
  }

  ngAfterViewInit() {
    const gradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(this.canvas.nativeElement.width, 0, 0, 0);
    this.paintGradient(gradient);
    this.chartColors = [{ backgroundColor: gradient }];
  }

  paintGradient(gradient: any) {
    if (this.data.length > 2) {
      //slice gradient to three parts
      const gradientStep = 0.5;
      let gradientValue = 1;
      const step = Math.floor(this.data.length / 3);
      const reminder = this.data.length % 3;

      for (let i = 0; i < 3; i++) {
        const arrayFragment = this.data.slice(0 + step * i, i !== 2 ? 1 + (step - 1) + step * i : 1 + (step - 1) + step * i + reminder);
        gradient.addColorStop(gradientValue, getAirQualityColorInRgba(this.countAverageQuality(arrayFragment.map(a => a.airQuality))));
        gradientValue -= gradientStep;
      }
    }
    else {
      gradient.addColorStop(1, getAirQualityColorInRgba(this.data[0].airQuality));
      gradient.addColorStop(0, getAirQualityColorInRgba(this.data[this.data.length - 1].airQuality));
    }
  }

  countAverageQuality(airQualites: Array<AirQualityEnum>) {
    let sum = 0;
    for (let i = 0; i < airQualites.length; i++) {
      sum += airQualites[i];
    }

    return Math.round(sum / airQualites.length);
  }

  orderMeassurementsByDateTimeAsc(meassurements: SmogMeassurementChart[]) {
    meassurements = meassurements.sort((a, b) => {
      if (a.periodTo < b.periodTo) { return -1; }
      if (a.periodTo > b.periodTo) { return 1; }
      if (a.periodTo === b.periodTo) { return 0; }
    });

    return meassurements;
  }

  roundTwoDigits(num: number) {
    return Math.round(num * 100) / 100;
  }
}
