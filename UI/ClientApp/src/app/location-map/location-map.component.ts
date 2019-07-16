import { Component, OnInit } from '@angular/core';
import { LocationMeassurements } from '../location-meassurements/location-meassurements.type';
import { MeassurementsHttpService } from '../utils/http-services/meassurements.http.service';

@Component({
  selector: 'location-map',
  templateUrl: './location-map.component.html'
})
export class LocationMapComponent implements OnInit {
  public locationsMeassurements: LocationMeassurements[];

  ngOnInit() {
    this.meassurementsService.getLocationsMeassures().subscribe(result => {
      this.locationsMeassurements = result;
    });
  }

  constructor(
    private meassurementsService: MeassurementsHttpService) {
  }
}
