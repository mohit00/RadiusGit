import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponentComponent } from '../../alert-component/alert-component.component';

import { LbdModule } from '../../lbd/lbd.module';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
 import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { EventACKTemplateComponent } from '../../event-acktemplate/event-acktemplate.component';
import { CommandACKTemplateComponent } from '../../command-acktemplate/command-acktemplate.component';
import { QuickHelpComponent } from '../../quick-help/quick-help.component';
import { D3Component } from '../../d3/d3.component';
import {VideoConferenceComponent} from '../../video-conference/video-conference.component'
import { AlertDetailComponent } from 'src/app/alert-detail/alert-detail.component';
 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule
   ],
  declarations: [    EventACKTemplateComponent,AlertComponentComponent
     , CommandACKTemplateComponent,AlertDetailComponent,
    HomeComponent,D3Component,
    
    TablesComponent,
    TypographyComponent,VideoConferenceComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent, QuickHelpComponent
  ]
})

export class AdminLayoutModule {}
