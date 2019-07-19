import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LocationsHttpService } from "../../../utils/http-services/locations.http.service";
import { ActivatedRoute } from "@angular/router";
import { LocationDetails } from "./location-details.type";
import { AirQualityEnum } from "../../../location-meassurements/air-quality.type";
import { getAirQualityText, getAirQualityColor } from "../../../utils/enum/air-quality";

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
    var locationId = +this.route.snapshot.params['id'];
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
          })
        });
      })}

  onSubmit() {
    alert('not active');
  }

  getQualityText(airQuality: AirQualityEnum) {
    return getAirQualityText(airQuality);
  }

  getQualityColor(airQuality: AirQualityEnum) {
    return getAirQualityColor(airQuality);
  }
} 
