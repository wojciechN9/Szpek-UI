import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, UrlSerializer } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './utils/nav-menu/nav-menu.component';
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
import { ChartsModule } from 'ng2-charts';
import { MeassurementsHttpService } from './utils/http-services/meassurements.http.service';
import { RemindPasswordOkComponent } from './password-remind/remind-password-ok/remind-password-ok.component';
import { RemindPasswordComponent } from './password-remind/remind-password.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PasswordChangeOkComponent } from './password-change/password-change-ok/password-change-ok.component';
import { TokenUrlSerializer } from './utils/token-serializer/token-serializer';
import { FaqComponent } from './faq/faq.component';
import { ProgressBarComponent } from './utils/progress-bar/progress-bar.component';
import { L10nTranslationModule, L10nIntlModule, L10nLoader } from 'angular-l10n';
import { l10nConfig, initL10n } from './l10n-config';
import { LocalisationDropdown } from './utils/localisation-dropdown/localisation-dropdown.component';
import { AuthModule } from './auth/auth.module';
import { SmogMeassurementsChartComponent } from './utils/smog-meassurements-chart/smog-meassurements-chart.component';
import { MeasurementsChartComponent } from './utils/measurements-chart/measurements-chart.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        LocationMeassurementsComponent,
        LocationMeassurementsDetailsComponent,
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
        SmogMeassurementsChartComponent,
        MeasurementsChartComponent,
        RemindPasswordComponent,
        RemindPasswordOkComponent,
        PasswordChangeComponent,
        PasswordChangeOkComponent,
        FaqComponent,
        ProgressBarComponent,
        LocalisationDropdown
    ],
    imports: [
        AuthModule,
        BrowserModule,
        HttpClientModule,
        FontAwesomeModule,
        NgbModule,
        ReactiveFormsModule,
        ChartsModule,
        L10nTranslationModule.forRoot(l10nConfig),
        L10nIntlModule,
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
            { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'manual', loadChildren: () => import('./manual/manual.module').then(m => m.ManualModule) },
            { path: '**', redirectTo: '' }
        ], { relativeLinkResolution: 'legacy' })
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
        { provide: UrlSerializer, useClass: TokenUrlSerializer },
        MeassurementsHttpService,
        NgbActiveModal,
        FavouriteLocationsService,
        DatePipe,
        {
            provide: APP_INITIALIZER,
            useFactory: initL10n,
            deps: [L10nLoader],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faStar, faClock);
    registerLocaleData(localePl);
  }
}
