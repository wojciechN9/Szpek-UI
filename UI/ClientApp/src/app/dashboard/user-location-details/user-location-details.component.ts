import { OnInit, Component, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LocationsHttpService } from "../../shared/services/locations.http.service";
import { LocationDetails } from "../../shared/models/location-details.type";
import { L10N_LOCALE, L10nLocale } from "angular-l10n";

@Component({
  selector: 'user-location-details',
  templateUrl: './user-location-details.component.html'
})

export class UserLocationDetailsComonent implements OnInit {
  public location: LocationDetails;

  constructor(
    private locationsService: LocationsHttpService,
    private route: ActivatedRoute,
    @Inject(L10N_LOCALE) public locale: L10nLocale) { }

  ngOnInit() {
   const locationId = +this.route.snapshot.params['id'];
    this.locationsService.getLocationById(locationId).subscribe(
      result => {
        this.location = result;
      });
  }
}
