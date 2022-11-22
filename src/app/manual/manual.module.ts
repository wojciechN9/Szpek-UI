import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualPageComponent } from './manual-page/manual-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ManualPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ManualPageComponent, },
    ])
  ]
})
export class ManualModule { }
