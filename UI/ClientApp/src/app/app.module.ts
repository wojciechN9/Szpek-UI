import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, UrlSerializer } from '@angular/router';
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
import { MySensorsComponent } from './dashboard/my-sensors/my-sensors.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AuthenticationService } from './utils/authentication/authentication.service';
import { AuthGuard } from './utils/authentication/auth.guard';
import { Role } from './utils/authentication/role.type';
import { SensorsOwnersHttpService } from './utils/http-services/sensor-owners.service';
import { MeassurementsHttpService } from './utils/http-services/meassurements.http.service';
import { SensorsOwnersComponent } from './admin/sensors-owners/sensors-owners.component';
import { SensorsOwnersDetailsComponent } from './admin/sensors-owners/sensors-owners-details/sensors-owners-details.component';
import { SensorsHttpService } from './utils/http-services/sensors.service';
import { SensorsComponent } from './admin/sensors/sensors.component';
import { SensorsDetailsComponent } from './admin/sensors/sensors-details/sensors-details.component';
import { LocationsHttpService } from './utils/http-services/locations.http.service';
import { LocationsComponent } from './admin/locations/locations.component';
import { LocationsDetailsComponent } from './admin/locations/locations-details/locations-details.component';
import { RemindPasswordOkComponent } from './password-remind/remind-password-ok/remind-password-ok.component';
import { RemindPasswordComponent } from './password-remind/remind-password.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PasswordChangeOkComponent } from './password-change/password-change-ok/password-change-ok.component';
import { UsersComponent } from './admin/users/users-component';
import { InstructionComponent } from './dashboard/instruction/instruction.component';
import { TokenUrlSerializer } from './utils/token-serializer/token-serializer';
import { FaqComponent } from './faq/faq.component';

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
    MeassurementsChartComponent,
    DashboardComponent,
    MySensorsComponent,
    AdminPanelComponent,
    SensorsOwnersComponent,
    SensorsOwnersDetailsComponent,
    SensorsComponent,
    SensorsDetailsComponent,
    LocationsComponent,
    LocationsDetailsComponent,
    RemindPasswordComponent,
    RemindPasswordOkComponent,
    PasswordChangeComponent,
    PasswordChangeOkComponent,
    UsersComponent,
    InstructionComponent,
    FaqComponent
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
      { path: 'faq', component: FaqComponent },
      { path: 'remindPassword', component: RemindPasswordComponent },
      { path: 'remindPassword/ok', component: RemindPasswordOkComponent },
      { path: 'passwordChange', component: PasswordChangeComponent },
      { path: 'passwordChange/ok', component: PasswordChangeOkComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'dashboard/instruction', component: InstructionComponent, canActivate: [AuthGuard], data: { roles: [Role.SensorOwner] } },
      { path: 'sensors/my', component: MySensorsComponent, canActivate: [AuthGuard], data: { roles: [Role.SensorOwner] } },
      { path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'admin/sensorsOwners', component: SensorsOwnersComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'admin/sensorsOwners/:id', component: SensorsOwnersDetailsComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'admin/sensors', component: SensorsComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'admin/sensors/:id', component: SensorsDetailsComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'admin/locations', component: LocationsComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'admin/locations/:id', component: LocationsDetailsComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: UrlSerializer, useClass: TokenUrlSerializer },
    SensorsOwnersHttpService,
    MeassurementsHttpService,
    SensorsHttpService,
    LocationsHttpService,
    NgbActiveModal,
    FavouriteLocationsService,
    DatePipe,
    AuthenticationService,
    AuthGuard
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
