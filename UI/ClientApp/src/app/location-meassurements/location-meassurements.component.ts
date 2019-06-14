import { Component } from '@angular/core';
import { SzpekHttpService } from '../app.http.service';

@Component({
  selector: 'location-meassurements',
  templateUrl: './location-meassurements.component.html'
})
export class LocationMeassurementsComponent {
  public locationsMeassurements: LocationMeassurements[];

  constructor(szpekService: SzpekHttpService) {
    szpekService.getLocationsMeassures().subscribe(
      result => { this.locationsMeassurements = result },
      error => console.error(error));
  }
}
