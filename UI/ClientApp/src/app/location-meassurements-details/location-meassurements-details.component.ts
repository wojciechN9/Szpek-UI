import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'location-meassurements-details',
  templateUrl: './location-meassurements-details.component.html'
})
export class LocationMeassurementsDetailsComponent {
  public locationsMeassurements: LocationMeassurements[];
  public currentData: LocationMeassurements;
  public id: number;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private route: ActivatedRoute) {
    http.get<LocationMeassurements[]>(baseUrl + 'api/LocationMeassurements/' + this.id).subscribe(result => {
      this.locationsMeassurements = result;
      this.currentData = this.locationsMeassurements[0];
    }, error => console.error(error));
  }
}
