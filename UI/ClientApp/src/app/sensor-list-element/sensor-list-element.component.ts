import { Component, Input } from '@angular/core';

@Component({
  selector: 'sensor-list-element',
  templateUrl: './sensor-list-element.component.html',
  styleUrls: ['./sensor-list-element.component.css']
})
export class SensorListElementComponent {
  @Input() sensor: Sensor;
}
