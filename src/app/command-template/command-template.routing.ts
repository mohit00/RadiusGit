import { Routes } from '@angular/router';
 import {CommandTemplateComponent} from './command-template.component'
 import {CommandTemplateDetailComponent} from './command-template-detail/command-template-detail.component'
export const CommandTemplateRoutes: Routes = [
    {
        path: '',
        component:CommandTemplateComponent ,
      },{
        path:'detail',
        component:CommandTemplateDetailComponent
      }
     
];
