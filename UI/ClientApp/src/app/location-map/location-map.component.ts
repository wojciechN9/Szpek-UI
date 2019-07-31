import { Component, OnInit } from '@angular/core';
import { LocationMeassurements } from '../location-meassurements/location-meassurements.type';
import { MeassurementsHttpService } from '../utils/http-services/meassurements.http.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'location-map',
  templateUrl: './location-map.component.html'
})
export class LocationMapComponent implements OnInit {
  public locationsMeassurements: LocationMeassurements[];

  ngOnInit() {
    this.titleService.setTitle('Mapa jakości, stanu i zanieczyszczenia powietrza - Szpek.pl');
    this.meassurementsService.getLocationsMeassures().subscribe(result => {
      this.locationsMeassurements = result;
    });
  }

  constructor(
    private meassurementsService: MeassurementsHttpService,
    private titleService: Title) {
  }
}
