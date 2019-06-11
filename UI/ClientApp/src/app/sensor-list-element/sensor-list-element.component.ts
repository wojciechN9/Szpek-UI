import { Component, Input } from '@angular/core';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sensor-list-element',
  templateUrl: './sensor-list-element.component.html',
  styleUrls: ['./sensor-list-element.component.css']
})
export class SensorListElementComponent {
  @Input() sensor: Sensor;
  faStar = faStar;
  faClock = faClock;
}
