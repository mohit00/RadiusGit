import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { LoaderInterceptor } from '../app/interceptor/loaderiterceptor'
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { NewsletterService } from '../app/newsletterService';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ModalModule, AlertModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ScrollEventModule } from 'ngx-scroll-event';

import { DeviceProvisioningDialogComponent } from './device-provisioning/device-provisioning-dialog/device-provisioning-dialog.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { WebserModel } from './Service.model';
import { AttributeDialogComponent } from './attribute-template/attribute-dialog/attribute-dialog.component';
import { EventDialogComponent } from './event-template/event-dialog/event-dialog.component';
import { CommandDialogComponent } from './command-template/command-dialog/command-dialog.component';
import { DeviceDialogComponent } from './device-template/device-dialog/device-dialog.component';
import { SuccessDialogComponent } from './dialog/success-dialog/success-dialog.component';
import { ArrtibuteSelectComponent } from './arrtibute-select/arrtibute-select.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { MigrateDialogComponent } from './migrate-dialog/migrate-dialog.component';
import { AddFieldDialogComponent } from './add-field-dialog/add-field-dialog.component';
import { AccountDialogComponent } from './Account/account/account-dialog/account-dialog.component'
import { AccountService } from './Account/account.service';
import { MigrateAccountComponent } from './migrate-account/migrate-account.component';
import { RoleDialogComponent } from './role-dialog/role-dialog.component';
import { UserAddDialogComponent } from './user-add-dialog/user-add-dialog.component';
import { AssignDialogComponent } from './user/assign-dialog/assign-dialog.component';
import { AccountTreeComponent } from './Account/account-tree/account-tree.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
 import {CalendarModule} from 'primeng/calendar';
 import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AssignUnassignAlertDialogComponent } from './assign-unassign-alert-dialog/assign-unassign-alert-dialog.component';
import { PreferencesThingsDialogComponent } from './preferences/preferences-things/preferences-things-dialog/preferences-things-dialog.component';
import { PreferencesAccountDialogComponent } from './preferences/preferences-account/preferences-account-dialog/preferences-account-dialog.component';
 
@NgModule({
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule, 
    FooterModule,
    SidebarModule, TabsModule.forRoot(),CalendarModule,  // <--- Determines the data type of the model
     
    NgMultiSelectDropDownModule.forRoot(),
    AppRoutingModule,ScrollEventModule, 
  ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ModalModule.forRoot(), AlertModule.forRoot(), BsDatepickerModule.forRoot()
  ],
  declarations: [
    AppComponent, AccountDialogComponent,
    AdminLayoutComponent,
    DeviceProvisioningDialogComponent,
    LoginComponent,
    AttributeDialogComponent,
    EventDialogComponent,
    CommandDialogComponent,
    DeviceDialogComponent,
    SuccessDialogComponent,
    ArrtibuteSelectComponent, ChangeStatusComponent,
     MigrateDialogComponent, AddFieldDialogComponent,
      MigrateAccountComponent, RoleDialogComponent,
       UserAddDialogComponent, AssignDialogComponent, 
       AccountTreeComponent, AlertDialogComponent, AssignUnassignAlertDialogComponent, 
       PreferencesThingsDialogComponent, PreferencesAccountDialogComponent 

  ],
  entryComponents: [PreferencesThingsDialogComponent,PreferencesAccountDialogComponent,RoleDialogComponent, UserAddDialogComponent,AlertDialogComponent,AssignUnassignAlertDialogComponent,
    DeviceDialogComponent, AccountDialogComponent, AccountTreeComponent,
    DeviceProvisioningDialogComponent, AttributeDialogComponent,
    EventDialogComponent, CommandDialogComponent,
    SuccessDialogComponent, ChangeStatusComponent, MigrateDialogComponent, AddFieldDialogComponent, MigrateAccountComponent, AssignDialogComponent
  ],
  providers: [NewsletterService, AuthService, WebserModel, HttpClient, AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
