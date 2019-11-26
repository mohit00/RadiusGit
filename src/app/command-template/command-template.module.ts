import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommandTemplateComponent } from './command-template.component';
import { CommandTemplateRoutes } from './command-template.routing';
import { CommandTemplateDetailComponent } from './command-template-detail/command-template-detail.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CommandTemplateRoutes),
    FormsModule,

   ],
  declarations: [  CommandTemplateComponent, CommandTemplateDetailComponent

  ],   entryComponents: [  ],


  providers: [ ]
})

export class CommandTemplateModule {}
