import { Component, OnInit } from '@angular/core';
import {WebserModel} from '../../Service.model';
import {AuthService} from '../../auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ChangeStatusComponent} from '../../change-status/change-status.component';
import {MigrateDialogComponent} from '../../migrate-dialog/migrate-dialog.component';
import {MigrateAccountComponent} from '../../migrate-account/migrate-account.component';

import {AddFieldDialogComponent } from '../../add-field-dialog/add-field-dialog.component';
import {AssignUnassignAlertDialogComponent} from '../../assign-unassign-alert-dialog/assign-unassign-alert-dialog.component'
import { AssignThingPreferenceDialogComponent } from 'src/app/assign-thing-preference-dialog/assign-thing-preference-dialog.component';
@Component({
  selector: 'app-device-provisiong-detail',
  templateUrl: './device-provisiong-detail.component.html',
  styleUrls: ['./device-provisiong-detail.component.scss']
})
export class DeviceProvisiongDetailComponent implements OnInit {
  collabsablemetaStatus: any = false;
  collabsableIdPro: any = false;
  collabsablePro: any = false;
  collabsableHeader: any = true;
  ComandId: any;
  ComandDetail: any;
  bsModalRef: BsModalRef;
  dataList: any;
  thingsPropertiesIdentifier: any;
  thingsProperties: any;
// tslint:disable-next-line: no-shadowed-variable
  constructor(private modalService: BsModalService, private WebserModel: WebserModel, private Service: AuthService) {
    this.dataList = [];
   }
   assignThingUnassignPreference(data) { 
    const initialState = {
      title: 'thing',
      data
    };
    this.bsModalRef = this.modalService.show(AssignThingPreferenceDialogComponent, { initialState, class: 'gray modal-lg' });

    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      this.getDetailEvent();
    });
  }
  getDetailEvent() {
    this.dataList = [];
    this.thingsPropertiesIdentifier = [];
    this.thingsProperties = [];
    this.ComandId  =  this.Service.getId;
     this.Service.getDetail('things/'+this.ComandId).subscribe(res => {
       this.ComandDetail = res;
       sessionStorage.setItem("setUserAccount",this.ComandDetail.account.accountId);

// tslint:disable-next-line: forin
      for (const i in this.ComandDetail.metadata) {
        this.dataList.push({
          name: i,
          value: this.ComandDetail.metadata[i]
        });
      }
      this.thingsPropertiesIdentifier = [];
      this.thingsProperties = [];
// tslint:disable-next-line: forin
      for (const i in this.ComandDetail.thingAttribute) {
      this.thingsProperties.push({
        name: i,
        value: this.ComandDetail.thingAttribute[i]
      });
    }
// tslint:disable-next-line: forin
      for (const i in this.ComandDetail.thingIdentifierAttribute) {
      this.thingsPropertiesIdentifier.push({
        name: i,
        value: this.ComandDetail.thingAttribute[i]
      });
    }

     });
     }
     changeStatus(data) {
      const initialState = {
        title: 'false',
        data
      };
      this.bsModalRef = this.modalService.show(ChangeStatusComponent,  {initialState, class: 'gray modal-lg' });

      this.bsModalRef.content.onClose.subscribe(result => {
        console.log('results', result);
        this.getDetailEvent();
  });
     }
     migrate(data) {
      const initialState = {
        title: 'false',
        dataDetail: data
      };
      this.bsModalRef = this.modalService.show(MigrateDialogComponent,  {initialState, class: 'gray modal-lg' });
      this.bsModalRef.content.onClose.subscribe(result => {
        console.log('results', result);
        this.getDetailEvent();
  });
     }
     migrate2Account(data){
       
      const initialState = {
        title: 'false',
        dataDetail: data
      };
      this.bsModalRef = this.modalService.show(MigrateAccountComponent,  {initialState, class: 'gray modal-lg' });
      this.bsModalRef.content.onClose.subscribe(result => {
        console.log('results', result);
        this.getDetailEvent();
  });
     }
     addField(data) {
      const initialState = {
        title: 'false',
        dataDetail: data
      };
      this.bsModalRef = this.modalService.show(AddFieldDialogComponent,  {initialState, class: 'gray modal-lg' });
      this.bsModalRef.content.onClose.subscribe(result => {
        console.log('results', result);
        this.getDetailEvent();
  });
     }
  ngOnInit() {
    this.getDetailEvent();
  }
  assignUnassignAlert(data){
    
    const initialState = {
      title: 'thing',
      data
    };
    this.bsModalRef = this.modalService.show(AssignUnassignAlertDialogComponent,  {initialState, class: 'gray modal-lg' });

    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      this.getDetailEvent();
});
  }
}
