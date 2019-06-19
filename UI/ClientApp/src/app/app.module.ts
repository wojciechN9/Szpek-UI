import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './utils/nav-menu/nav-menu.component';
import { SidebarComponent } from './utils/sidebar/sidebar.component';
import { LocationMeassurementsComponent } from './location-meassurements/location-meassurements.component';
import { LocationMeassurementsDetailsComponent } from './location-meassurements-details/location-meassurements-details.component';
import { LocationMeassurementsListComponent } from './location-meassurements-list/location-meassurements-list';
import { LocationMeassurementsListElementComponent } from './location-meassurements-list/location-meassurements-list-element/location-meassurements-list-element.component';
import { SzpekHttpService } from './app.http.service';
import { MapComponent } from './utils/map/map.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationModalComponent } from './utils/map/location-modal/location-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LocationMeassurementsComponent,
    LocationMeassurementsDetailsComponent,
    SidebarComponent,
    LocationMeassurementsListComponent,
    LocationMeassurementsListElementComponent,
    MapComponent,
    LocationModalComponent
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
      { path: 'map', component: MapComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [SzpekHttpService, NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [LocationModalComponent]
})
export class AppModule {
  constructor() {
    library.add(faStar, faClock);
  }
}
