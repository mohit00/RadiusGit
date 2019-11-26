import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttributeTemplateComponent } from './attribute-template.component';
import { AttributeTemplateRoutes } from './attribute-template.routing';
import { AttributeTemplateDetailComponent } from './attribute-template-detail/attribute-template-detail.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AttributeTemplateRoutes),
    FormsModule,CollapseModule.forRoot()

   ],
  declarations: [  AttributeTemplateComponent, AttributeTemplateDetailComponent

  ],   entryComponents: [  ],


  providers: [ ]
})

export class AttributeTemplateModule {}
