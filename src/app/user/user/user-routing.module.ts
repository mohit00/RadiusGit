import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from '../user/user.component';
import {UserDetailComponent} from '../user-detail/user-detail.component'
const routes: Routes = [{
  path:'management',
  component:UserComponent
},{
  path:'Detail',
  component:UserDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {

 }
