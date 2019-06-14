import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'location-meassurements',
  templateUrl: './location-meassurements.component.html'
})
export class LocationMeassurementsComponent {
  public locationsMeassurements: LocationMeassurements[];

  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    http.get<LocationMeassurements[]>(baseUrl + 'api/LocationMeassurements').subscribe(result => {
      this.locationsMeassurements = result;
    }, error => console.error(error));
  }
}
