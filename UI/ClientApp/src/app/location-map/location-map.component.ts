import { Component, OnInit } from '@angular/core';
import { SzpekHttpService } from '../app.http.service';
import { LocationMeassurements } from '../location-meassurements/location-meassurements.type';


@Component({
  selector: 'location-map',
  templateUrl: './location-map.component.html'
})
export class LocationMapComponent implements OnInit {
  public locationsMeassurements: LocationMeassurements[];

  ngOnInit() {
    this.szpekService.getLocationsMeassures().subscribe(result => {
      this.locationsMeassurements = result;
    }, error => console.error(error));
  }

  constructor(
    private szpekService: SzpekHttpService) {
  }
}
