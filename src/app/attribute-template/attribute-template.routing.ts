import { Routes } from '@angular/router';
 import {AttributeTemplateComponent} from './attribute-template.component'
 import {AttributeTemplateDetailComponent} from './attribute-template-detail/attribute-template-detail.component'
export const AttributeTemplateRoutes: Routes = [
    {
        path: '',
        component:AttributeTemplateComponent ,
      },{
        path:'detail',
        component:AttributeTemplateDetailComponent
      }
     
];
