import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import {TreeTableModule} from "ng-treetable";
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccountComponent, AccountDetailComponent ],
  imports: [
    CommonModule,FormsModule,
    AccountRoutingModule,
    TreeTableModule
  ], providers: [],
 })
export class AccountModule {}
