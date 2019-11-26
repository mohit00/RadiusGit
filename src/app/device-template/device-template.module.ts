import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceTemplateComponent } from './device-template.component';
import { DeviceTemplateRoutes } from './device-template.routing';
import {DeviceTemplateDetailComponent} from './device-template-detail/device-template-detail.component';
import { from } from 'rxjs';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DeviceTemplateRoutes),
    FormsModule,

   ],
  declarations: [  DeviceTemplateComponent,   DeviceTemplateDetailComponent

  ],   entryComponents: [  ],


  providers: [ ]
})

export class DeviceTemplateModule {}
