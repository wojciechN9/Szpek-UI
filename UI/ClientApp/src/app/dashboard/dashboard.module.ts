import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { InstructionComponent } from '../dashboard/instruction/instruction.component';
import { MySensorsComponent } from '../dashboard/my-sensors/my-sensors.component';
import { UserLocationDetailsComonent } from '../dashboard/user-location-details/user-location-details.component';
import { AuthGuard } from '../utils/authentication/auth.guard';
import { Role } from '../utils/authentication/role.type';


@NgModule({
  declarations: [
    DashboardComponent,
    InstructionComponent,
    MySensorsComponent,
    UserLocationDetailsComonent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'instruction', component: InstructionComponent, canActivate: [AuthGuard], data: { roles: [Role.SensorOwner] } },
      { path: 'sensors/my', component: MySensorsComponent, canActivate: [AuthGuard], data: { roles: [Role.SensorOwner] } },
      { path: 'userLocations/:id', component: UserLocationDetailsComonent, canActivate: [AuthGuard], data: { roles: [Role.SensorOwner] } },
    ])
  ]
})
export class DashboardModule { }
