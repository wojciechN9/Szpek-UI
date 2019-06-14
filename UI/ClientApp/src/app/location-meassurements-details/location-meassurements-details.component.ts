import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SzpekHttpService } from '../app.http.service';


@Component({
  selector: 'location-meassurements-details',
  templateUrl: './location-meassurements-details.component.html'
})
export class LocationMeassurementsDetailsComponent {
  public locationMeassurements: LocationMeassurements;
  public id: number;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  constructor(szpekService: SzpekHttpService,
    private route: ActivatedRoute) {
    szpekService.getLocationsMeassuresDetails(this.id).subscribe(result => {
      this.locationMeassurements = result;
    }, error => console.error(error));
  }
}
