import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sensor-list-element',
  templateUrl: './sensor-list-element.component.html',
  styleUrls: ['./sensor-list-element.component.css']
})
export class SensorListElementComponent {
  @Input() sensor: Sensor;
  @Input() isFavourite: boolean;
  @Output() favouriteStatusChanged = new EventEmitter<number>();

  onClickFavourite() {
    this.isFavourite = !this.isFavourite;
    this.favouriteStatusChanged.emit(this.sensor.id);
  }
}
