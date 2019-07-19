import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SensorsHttpService } from "../../utils/http-services/sensors.service";
import { Sensor } from "../sensors/sensor.type";
import { Location } from "./location.type";
import { LocationCreate } from "./location-create.type";
import { LocationsHttpService } from "../../utils/http-services/locations.http.service";

@Component({
  selector: 'locations',
  templateUrl: './locations.component.html'
})
export class LocationsComponent implements OnInit {
  public form: FormGroup;
  public isAddFormVisible: boolean = false;
  public locations: Array<Location>;
  public sensors: Array<Sensor>;

  constructor(
    private locationsService: LocationsHttpService,
    private sensorsService: SensorsHttpService,
    private formBuilder: FormBuilder,
    private router: Router) {
    locationsService.getLocations().subscribe(
      result => { this.locations = result })

    sensorsService.getSensors().subscribe(
      result => { this.sensors = result });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      sensorId: ['', Validators.required],
      address: this.formBuilder.group({
        city: ['', Validators.required],
        street: ['', Validators.required],
        postCode: ['', Validators.required],
        voivodeship: ['', Validators.required],
        countryCode: ['', [Validators.maxLength(2), Validators.required]],
        latitude: ['', Validators.required],
        longitude: ['', Validators.required],
      })
    });
  }

  public triggerFormVisible() {
    this.isAddFormVisible = !this.isAddFormVisible;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    var locationCreate = <LocationCreate>{
      sensorId: this.form.controls.sensorId.value,
      address: {
        city: this.form.get('address.city').value,
        street: this.form.get('address.street').value,
        postCode: this.form.get('address.postCode').value,
        voivodeship: this.form.get('address.voivodeship').value,
        countryCode: this.form.get('address.countryCode').value,
        latitude: this.form.get('address.latitude').value,
        longitude: this.form.get('address.longitude').value
      }
    };

    this.locationsService.postLocation(locationCreate).subscribe(
      id => this.router.navigate(['/admin/locations', id]));
  }

  getSensorCode(sensorId: number) {
    return this.sensors.filter(s => s.id == sensorId)[0].code;
  }

  onReset() {
    this.form.reset();
  }
}
