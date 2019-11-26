import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponentComponent } from './roles-component/roles-component.component';
import {RoleDetailComponent} from '../roles/role-detail/role-detail.component'
const routes: Routes = [{
  path:'',
  component:RolesComponentComponent
},{
  path:'Details',
  component:RoleDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
