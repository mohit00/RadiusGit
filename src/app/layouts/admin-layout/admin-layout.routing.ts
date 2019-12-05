import { Routes } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
  import { EventACKTemplateComponent } from '../../event-acktemplate/event-acktemplate.component';
 import { CommandACKTemplateComponent } from '../../command-acktemplate/command-acktemplate.component';
 import { QuickHelpComponent } from '../../quick-help/quick-help.component';
import { D3Component } from '../../d3/d3.component';
import { AlertDetailComponent } from 'src/app/alert-detail/alert-detail.component';
import { AlertComponentComponent } from 'src/app/alert-component/alert-component.component';
 
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
     { path: 'd3',        component: D3Component },
     {path:'Alert/management',
     component: AlertComponentComponent },
     {path:'Alert/management/detail',
     component: AlertDetailComponent },
    {
        path: 'Properties/Prototype',
        loadChildren: '../../attribute-template/attribute-template.module#AttributeTemplateModule'
      },{
        path: 'Event/Prototype',
        loadChildren: '../../event-template/event-template.module#EventTemplateModule'
      },{
        path: 'Event/ACK/Prototype',
        component:EventACKTemplateComponent ,
      },{
        path: 'Command/Prototype',
        loadChildren: '../../command-template/command-template.module#CommandTemplateModule'
      },{
        path: 'Command/ACK/Prototype',
        component:CommandACKTemplateComponent ,
      },{
        path: 'Template/Things',
        loadChildren: '../../device-template/device-template.module#DeviceTemplateModule'
      },{
        path:'Things',
        loadChildren: '../../device-provisioning/device-provisioning.module#DeviceProvisioningModule'


      },{
        path:'Account',
        loadChildren: '../../Account/account/account.module#AccountModule'


      },{
        path:'user',
        loadChildren: '../../user/user/user.module#UserModule'


      },{
        path:'Roles',
        loadChildren: '../../roles/roles.module#RolesModule'


      },{
        path:'quickHelp',
        component:QuickHelpComponent
      },{
        path:'preference',
        loadChildren: '../../preferences/preferences.module#PreferencesModule'
      }
];
