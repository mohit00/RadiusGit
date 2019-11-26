import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceProvisioningComponent } from './device-provisioning.component';
import { DeviceProvisioningRoutes } from './device-provisioning.routing';
import { DeviceProvisiongDetailComponent } from './device-provisiong-detail/device-provisiong-detail.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DeviceProvisioningRoutes),
    FormsModule,

   ],
  declarations: [  DeviceProvisioningComponent, DeviceProvisiongDetailComponent,  

  ],   entryComponents: [   ],


  providers: [ ]
})

export class DeviceProvisioningModule {}
