import { Routes } from '@angular/router';
 import {DeviceProvisioningComponent} from './device-provisioning.component'
 import { DeviceProvisiongDetailComponent } from './device-provisiong-detail/device-provisiong-detail.component';

export const DeviceProvisioningRoutes: Routes = [
    {
        path: '',
        component:DeviceProvisioningComponent ,
      },{
          path:'Detail',
          component:DeviceProvisiongDetailComponent
      }
     
];
