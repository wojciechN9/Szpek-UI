import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SensorsOwnersHttpService } from './services/sensor-owners.service';
import { LocationsHttpService } from './services/locations.http.service';
import { MeassurementsCalendarComponent } from './components/meassurements-calendar/meassurements-calendar.component';
import { AuthModule } from '../auth/auth.module';
import { L10nIntlModule, L10nTranslationModule } from 'angular-l10n';

@NgModule({
  declarations: [
    MeassurementsCalendarComponent
  ],
  imports: [
    AuthModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    L10nIntlModule,
    L10nTranslationModule
  ],
  providers: [
    SensorsOwnersHttpService,
    LocationsHttpService,
  ],
  exports: [
    MeassurementsCalendarComponent,
    FormsModule,
    ReactiveFormsModule,
    L10nIntlModule,
    L10nTranslationModule
  ]
})
export class SharedModule { }
