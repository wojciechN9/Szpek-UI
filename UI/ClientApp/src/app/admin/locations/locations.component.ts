import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Sensor } from "../sensors/sensor.type";
import { SensorsHttpService } from "../sensors.service";
import { LocationsHttpService } from "../../shared/services/locations.http.service";
import { LocationCreate } from "../../shared/models/location-create.type";
import { Location } from "../../shared/models/location.type";

@Component({
  selector: 'locations',
  templateUrl: './locations.component.html'
})
export class LocationsComponent implements OnInit {
  public form: FormGroup;
  public isAddFormVisible = false;
  public locations: Array<Location>;
  public sensors: Array<Sensor>;

  constructor(
    private locationsService: LocationsHttpService,
    private sensorsService: SensorsHttpService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.locationsService.getLocations().subscribe(
      result => { this.locations = result })

    this.sensorsService.getSensors().subscribe(
      result => { this.sensors = result });

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

    const locationCreate = {
      sensorId: +this.form.controls.sensorId.value,
      address: {
        city: this.form.get('address.city').value,
        street: this.form.get('address.street').value,
        postCode: this.form.get('address.postCode').value,
        voivodeship: this.form.get('address.voivodeship').value,
        countryCode: this.form.get('address.countryCode').value,
        latitude: +this.form.get('address.latitude').value,
        longitude: +this.form.get('address.longitude').value
      }
    } as LocationCreate;

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
