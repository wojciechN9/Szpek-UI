import { Component } from '@angular/core';
import { LocationMeassurements } from './location-meassurements.type';
import { MeassurementsHttpService } from '../utils/http-services/meassurements.http.service';

@Component({
  selector: 'location-meassurements',
  templateUrl: './location-meassurements.component.html'
})
export class LocationMeassurementsComponent {
  public locationsMeassurements: LocationMeassurements[];

  constructor(meassurementsService: MeassurementsHttpService) {
    meassurementsService.getLocationsMeassures().subscribe(
      result => { this.locationsMeassurements = result });
  }
}
