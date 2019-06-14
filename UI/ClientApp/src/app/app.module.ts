import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SensorComponent } from './sensor/sensor.component';
import { SensorDetailsComponent } from './sensor-details/sensor-details.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { SensorListElementComponent } from './sensor-list/sensor-list-element/sensor-list-element.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SensorComponent,
    SensorDetailsComponent,
    SidebarComponent,
    SensorListComponent,
    SensorListElementComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', component: SensorComponent, pathMatch: 'prefix' },
      { path: 'sensor', component: SensorComponent },
      { path: 'sensor/:id', component: SensorDetailsComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faStar, faClock);
  }
}
