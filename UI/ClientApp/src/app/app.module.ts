import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { HttpConfigInterceptor } from './utils/http-error-interceptor/http-error-interceptor';
import { ErrorPageComponent } from './utils/http-error-interceptor/error-page/error-page.component';
import { FavouriteLocationsService } from './utils/favourite-locations-service/favourite-locations-service';

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
    ErrorPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: LocationMeassurementsComponent, pathMatch: 'prefix' },
      { path: 'location', component: LocationMeassurementsComponent },
      { path: 'location/:id', component: LocationMeassurementsDetailsComponent },
      { path: 'map', component: LocationMapComponent },
      { path: 'error', component: ErrorPageComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    SzpekHttpService,
    NgbActiveModal,
    FavouriteLocationsService
    ],
  bootstrap: [AppComponent],
  entryComponents: [LocationModalComponent]
})
export class AppModule {
  constructor() {
    library.add(faStar, faClock);
  }
}
