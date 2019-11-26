import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import {TreeTableModule} from "ng-treetable";
import { AccountDetailComponent } from './account-detail/account-detail.component';
@NgModule({
  declarations: [AccountComponent, AccountDetailComponent ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    TreeTableModule
  ], providers: [],
 })
export class AccountModule {}
