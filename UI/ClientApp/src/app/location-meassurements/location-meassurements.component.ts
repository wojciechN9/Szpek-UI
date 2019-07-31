import { Component, OnInit } from '@angular/core';
import { LocationMeassurements } from './location-meassurements.type';
import { MeassurementsHttpService } from '../utils/http-services/meassurements.http.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'location-meassurements',
  templateUrl: './location-meassurements.component.html'
})
export class LocationMeassurementsComponent implements OnInit {
  public locationsMeassurements: LocationMeassurements[];

  ngOnInit(): void {
    this.titleService.setTitle('Jakość i stan powietrza w twojej miejscowości, mapa  - Szpek.pl');
  }

  constructor(meassurementsService: MeassurementsHttpService, private titleService: Title) {

    meassurementsService.getLocationsMeassures().subscribe(
      result => { this.locationsMeassurements = result });
  }
}
