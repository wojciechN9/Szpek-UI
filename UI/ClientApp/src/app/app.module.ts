import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './utils/nav-menu/nav-menu.component';
import { SidebarComponent } from './utils/sidebar/sidebar.component';
import { LocationMeassurementsComponent } from './location-meassurements/location-meassurements.component';
import { LocationMeassurementsDetailsComponent } from './location-meassurements-details/location-meassurements-details.component';
import { LocationMeassurementsListComponent } from './location-meassurements-list/location-meassurements-list.component';
import { LocationMeassurementsListElementComponent } from './location-meassurements-list/location-meassurements-list-element/location-meassurements-list-element.component';
import { SzpekHttpService } from './app.http.service';
import { MapFactoryComponent } from './utils/map-factory/map-factory.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationModalComponent } from './utils/map-factory/location-modal/location-modal.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { FavouriteLocationsService } from './utils/favourite-locations-service/favourite-locations-service';
import { LegendComponent } from './legend/legend.component';
import { LoginComponent } from './login/login.component';
import { InputError } from './utils/input-error/input-error.component';
import { ErrorPageComponent } from './utils/http-interceptor/error-page/error-page.component';
import { HttpConfigInterceptor } from './utils/http-interceptor/http-interceptor';
import { registerLocaleData, DatePipe } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { ContactComponent } from './contact/contact.component';
import { CookieConsentComponent } from './utils/cookie-consent/cookie-consent.component';
import { MeassurementsChartComponent } from './utils/meassurements-chart/meassurements-chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LocationMeassurementsComponent,
    LocationMeassurementsDetailsComponent,
    SidebarComponent,
    LocationMeassurementsListComponent,
    LocationMeassurementsListElementComponent,
    MapFactoryComponent,
    LocationModalComponent,
    LocationMapComponent,
    ErrorPageComponent,
    LegendComponent,
    LoginComponent,
    InputError,
    ContactComponent,
    CookieConsentComponent,
    MeassurementsChartComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    ChartsModule,
    RouterModule.forRoot([
      { path: '', component: LocationMeassurementsComponent, pathMatch: 'prefix' },
      { path: 'location', component: LocationMeassurementsComponent },
      { path: 'location/:id', component: LocationMeassurementsDetailsComponent },
      { path: 'map', component: LocationMapComponent },
      { path: 'error', component: ErrorPageComponent },
      { path: 'legend', component: LegendComponent },
      { path: 'login', component: LoginComponent },
      { path: 'contact', component: ContactComponent },
      { path: '**', redirectTo: '' }
    ], { useHash: true })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    SzpekHttpService,
    NgbActiveModal,
    FavouriteLocationsService,
    DatePipe
    ],
  bootstrap: [AppComponent],
  entryComponents: [LocationModalComponent]
})
export class AppModule {
  constructor() {
    library.add(faStar, faClock);
    registerLocaleData(localePl);
  }
}
