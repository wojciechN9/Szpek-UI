import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { MeasurementChart } from './measurements-chart.type';
import { convertHexToRgbA } from '../enum/air-quality';

@Component({
  selector: 'measurements-chart',
  templateUrl: './measurements-chart.component.html'
})
export class MeasurementsChartComponent implements AfterViewInit {
  @ViewChild("chartCanvas", { static: true }) canvas: ElementRef;
  @Input() chartName: string;
  @Input() data: MeasurementChart[];

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

    this.chartColors = [{ pointBackgroundColor: this.data.map(d => d.rgbColor) }];
  }

  ngAfterViewInit() {
    this.chartColors = [{ backgroundColor: convertHexToRgbA(this.data[0].rgbColor, 0.7) }];
  }

  orderMeassurementsByDateTimeAsc(meassurements: MeasurementChart[]) {
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
