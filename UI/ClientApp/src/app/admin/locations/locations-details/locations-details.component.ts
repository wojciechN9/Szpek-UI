import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { LocationsHttpService } from "../../../shared/services/locations.http.service";
import { LocationDetails } from "../../../shared/models/location-details.type";

@Component({
  selector: 'locations-details',
  templateUrl: './locations-details.component.html'
})

export class LocationsDetailsComponent implements OnInit {
  public form: FormGroup;
  public location: LocationDetails;

  constructor(
    private locationsService: LocationsHttpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    const locationId = +this.route.snapshot.params['id'];
    this.locationsService.getLocationById(locationId).subscribe(
      result => {
        this.location = result;
        this.form = this.form = this.formBuilder.group({
          sensorId: [{ value: this.location.sensorId, disabled: true }, Validators.required],
          address: this.formBuilder.group({
            city: [this.location.address.city, Validators.required],
            street: [this.location.address.street, Validators.required],
            postCode: [this.location.address.postCode, Validators.required],
            voivodeship: [this.location.address.voivodeship, Validators.required],
            countryCode: [this.location.address.countryCode, [Validators.maxLength(2), Validators.required]],
            latitude: [this.location.address.latitude, Validators.required],
            longitude: [this.location.address.longitude, Validators.required],
            height: [this.location.address.height, Validators.required]
          })
        });
      })
  }

  onSubmit() {
    alert('not active');
  }
} 
