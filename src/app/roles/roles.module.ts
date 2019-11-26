import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponentComponent } from './roles-component/roles-component.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';

@NgModule({
  declarations: [RolesComponentComponent, RoleDetailComponent],
  imports: [
    CommonModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
