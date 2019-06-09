import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'sensor-details',
  templateUrl: './sensor-details.component.html'
})
export class SensorDetailsComponent {
  public sensorsDetails: Sensor[];
  public currentData: Sensor;
  public id: number;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];      
      console.log(this.id);
    });
  }

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private route: ActivatedRoute) {
    http.get<Sensor[]>(baseUrl + 'api/Sensors/' + this.id).subscribe(result => {
      this.sensorsDetails = result;
      this.currentData = this.sensorsDetails[0];
    }, error => console.error(error));
  }
}
