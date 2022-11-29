import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { LocationsHttpService } from "../../../shared/services/locations.http.service";
import { LocationDetails } from "../../../shared/models/location-details.type";
import { tap } from "rxjs/operators";

@Component({
  selector: 'locations-details',
  templateUrl: './locations-details.component.html'
})

export class LocationsDetailsComponent {
  public form: FormGroup;
  public locationId = +this.route.snapshot.params['id'];
  public location$ = this.locationsService.getLocationById(this.locationId).pipe(
    tap(location => this.form = this.buildForm(location)));

  constructor(
    private locationsService: LocationsHttpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  buildForm(location: LocationDetails) {
    return this.formBuilder.group({
      sensorId: [{ value: location.sensorId, disabled: true }, Validators.required],
      address: this.formBuilder.group({
        city: [location.address.city, Validators.required],
        street: [location.address.street, Validators.required],
        postCode: [location.address.postCode, Validators.required],
        voivodeship: [location.address.voivodeship, Validators.required],
        countryCode: [location.address.countryCode, [Validators.maxLength(2), Validators.required]],
        latitude: [location.address.latitude, Validators.required],
        longitude: [location.address.longitude, Validators.required],
        height: [location.address.height, Validators.required]
      })
    });
  }

  onSubmit() {
    alert('not active');
  }
} 
