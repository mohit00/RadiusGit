import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesAccountComponent } from './preferences-account/preferences-account.component';
import { PreferencesThingsComponent } from './preferences-things/preferences-things.component';
import { PreferencesThingsDetailComponent } from './preferences-things/preferences-things-detail/preferences-things-detail.component';
import { PreferencesAccountDetailComponent } from './preferences-account/preferences-account-detail/preferences-account-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PreferencesAccountComponent, PreferencesThingsComponent, PreferencesThingsDetailComponent, PreferencesAccountDetailComponent],
  imports: [FormsModule,
    CommonModule,
    PreferencesRoutingModule
  ]
})
export class PreferencesModule { }
