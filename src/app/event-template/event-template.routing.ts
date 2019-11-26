import { Routes } from '@angular/router';
 import {EventTemplateComponent} from './event-template.component';
 import {EventTemplateDetailComponent} from './event-template-detail/event-template-detail.component'
  export const EventTemplateRoutes: Routes = [
    {
        path: '',
        component:EventTemplateComponent ,
      },{
        path:'detail',
        component:EventTemplateDetailComponent
      }
];
