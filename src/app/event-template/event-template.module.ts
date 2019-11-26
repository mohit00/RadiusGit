import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventTemplateComponent } from './event-template.component';
import { EventTemplateRoutes } from './event-template.routing';
import { EventTemplateDetailComponent } from './event-template-detail/event-template-detail.component';
   @NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EventTemplateRoutes),
    FormsModule,
     
   ],
  declarations: [  EventTemplateComponent, EventTemplateDetailComponent   
   
  ],   entryComponents:[  ],

 
  providers:[ ]
})

export class EventTemplateModule {}
