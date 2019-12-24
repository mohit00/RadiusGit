import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreferencesAccountComponent } from './preferences-account/preferences-account.component';
import { PreferencesThingsComponent } from './preferences-things/preferences-things.component';
import { PreferencesThingsDetailComponent } from './preferences-things/preferences-things-detail/preferences-things-detail.component';
import { PreferencesAccountDetailComponent } from './preferences-account/preferences-account-detail/preferences-account-detail.component';

const routes: Routes = [ 
   {
    path:'Account',
    component:PreferencesAccountComponent
  },{
    path:'Things',
    component:PreferencesThingsComponent
  },{
    path:'Things/Detail',
    component:PreferencesThingsDetailComponent
  },{
    path:'Account/Detail',
    component:PreferencesAccountDetailComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferencesRoutingModule { }
