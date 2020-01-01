import { OnInit, Component } from "@angular/core";
import { LocationDetails } from "../../admin/locations/locations-details/location-details.type";
import { LocationsHttpService } from "../../utils/http-services/locations.http.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'user-location-details',
  templateUrl: './user-location-details.component.html'
})

export class UserLocationDetailsComonent implements OnInit {
  public location: LocationDetails;

  constructor(
    private locationsService: LocationsHttpService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    var locationId = +this.route.snapshot.params['id'];
    this.locationsService.getLocationById(locationId).subscribe(
      result => {
        this.location = result;
      });
  }
}
