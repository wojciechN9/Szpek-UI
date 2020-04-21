import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationsDetailsComponent } from './locations/locations-details/locations-details.component';
import { SensorsComponent } from './sensors/sensors.component';
import { SensorsDetailsComponent } from './sensors/sensors-details/sensors-details.component';
import { SensorsOwnersDetailsComponent } from './sensors-owners/sensors-owners-details/sensors-owners-details.component';
import { SensorsOwnersComponent } from './sensors-owners/sensors-owners.component';
import { UsersComponent } from './users/users-component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../utils/authentication/auth.guard';
import { Role } from '../utils/authentication/role.type';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminPanelComponent,
    LocationsComponent,
    LocationsDetailsComponent,
    SensorsComponent,
    SensorsDetailsComponent,
    SensorsOwnersDetailsComponent,
    SensorsOwnersComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    RouterModule.forChild([
      { path: '', component: AdminPanelComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'sensorsOwners', component: SensorsOwnersComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'sensorsOwners/:id', component: SensorsOwnersDetailsComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'sensors', component: SensorsComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'sensors/:id', component: SensorsDetailsComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'locations', component: LocationsComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'locations/:id', component: LocationsDetailsComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    ]),
  ],
  exports: [
  ]
})
export class AdminModule { }
