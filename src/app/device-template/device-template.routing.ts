import { Routes } from '@angular/router';
import {DeviceTemplateComponent} from './device-template.component';
import {DeviceTemplateDetailComponent} from './device-template-detail/device-template-detail.component';
export const DeviceTemplateRoutes: Routes = [
    {
        path: '',
        component: DeviceTemplateComponent ,
      } , {
        path: 'detail',
    component: DeviceTemplateDetailComponent
      }

];
