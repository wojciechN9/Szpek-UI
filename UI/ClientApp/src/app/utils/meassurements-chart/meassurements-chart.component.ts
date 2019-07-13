import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { getAirQualityColor, getAirQualityColorInRgba } from '../enum/air-quality';
import { MeassurementChart } from './meassurement-chart.type';

@Component({
  selector: 'meassurements-chart',
  templateUrl: './meassurements-chart.component.html'
})
export class MeassurementsChartComponent {
  @ViewChild("chartCanvas", { static: true }) canvas: ElementRef;
  @Input() chartName: string;
  @Input() data: MeassurementChart[];

  public chartData: ChartDataSets[];
  public chartLabels: Label[];
  public chartOptions: ChartOptions= {
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
        label: this.chartName + ' (μg/m3)', pointHoverRadius: 7, pointHitRadius: 5
      },
    ];

    this.chartLabels = this.data.map(d => this.datePipe.transform(d.periodTo, "HH:mm"));

    let gradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(500, 0, 100, 0);
    gradient.addColorStop(1, getAirQualityColorInRgba(this.data[0].airQuality));
    gradient.addColorStop(0, getAirQualityColorInRgba(this.data[this.data.length - 1].airQuality));

    this.chartColors = [
      {
        pointBackgroundColor: this.data.map(d => getAirQualityColor(d.airQuality)),
        backgroundColor: gradient,
      },
    ];
  }

  orderMeassurementsByDateTimeAsc(meassurements: MeassurementChart[]) {
     meassurements = meassurements.sort((a, b) => {
      if (a.periodTo < b.periodTo) { return -1; }
      if (a.periodTo > b.periodTo) { return 1; }
      if (a.periodTo == b.periodTo) { return 0; }
    });

    return meassurements;
  }

  roundTwoDigits(num: number) {
    return Math.round(num * 100) / 100;
  }
}
