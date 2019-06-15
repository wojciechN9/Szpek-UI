import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SzpekHttpService } from '../app.http.service';


@Component({
  selector: 'location-meassurements-details',
  templateUrl: './location-meassurements-details.component.html'
})
export class LocationMeassurementsDetailsComponent {
  public locationMeassurements: LocationMeassurements;
  public currentMeassurement: Meassurement;
  public id: number;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  constructor(
    szpekService: SzpekHttpService,
    private route: ActivatedRoute) {
    szpekService.getLocationsMeassuresDetails(this.id).subscribe(result => {
      this.locationMeassurements = result;
      this.currentMeassurement = this.locationMeassurements.meassurements[0];
    }, error => console.error(error));
  }
}
