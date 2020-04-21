import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeassurementsCalendarComponent } from '../utils/meassurements-calendar/meassurements-calendar.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    MeassurementsCalendarComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    MeassurementsCalendarComponent,
    FormsModule
  ]
})
export class SharedModule { }
