import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SensorsOwnersHttpService } from './services/sensor-owners.service';
import { LocationsHttpService } from './services/locations.http.service';
import { MeassurementsCalendarComponent } from './components/meassurements-calendar/meassurements-calendar.component';

@NgModule({
  declarations: [
    MeassurementsCalendarComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SensorsOwnersHttpService,
    LocationsHttpService
  ],
  exports: [
    MeassurementsCalendarComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
