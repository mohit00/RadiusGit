import { Component, OnInit } from '@angular/core';
import { WebserModel } from '../../../Service.model';
import { AccountService } from '../../account.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { json } from 'body-parser';
import { AccountTreeComponent } from '../../account-tree/account-tree.component'
import { AssignUnassignAlertDialogComponent } from 'src/app/assign-unassign-alert-dialog/assign-unassign-alert-dialog.component';
import { AssignAccountPreferenceDialogComponent } from 'src/app/assign-account-preference-dialog/assign-account-preference-dialog.component';
import { AssignThingPreferenceDialogComponent } from 'src/app/assign-thing-preference-dialog/assign-thing-preference-dialog.component';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
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
  constructor(private modalService: BsModalService, private WebserModel: WebserModel, private Service: AccountService) {
    this.dataList = [];
  }
  accountTree(data: any) {

    alert(JSON.stringify(data))
    let initialState = { data };
    this.bsModalRef = this.modalService.show(AccountTreeComponent, { initialState, class: 'gray modal-lg' });
    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      this.getDetailEvent();
    });
  }
  getDetailEvent() {
    this.dataList = [];
    this.thingsPropertiesIdentifier = [];
    this.thingsProperties = [];
    this.ComandId = this.Service.getId;
    this.Service.getDetail(this.WebserModel.Sevice.BASENEWURL + 'account-service/account/' + this.ComandId).subscribe(res => {
      this.ComandDetail = res;
      console.log(JSON.stringify(res))

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
  assignAccountUnassignPreference(data) { 


    const initialState = {
      title: 'Account',
      data
    };
     this.bsModalRef = this.modalService.show(AssignAccountPreferenceDialogComponent, { initialState, class: 'gray modal-lg' });

    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      this.getDetailEvent();
    });
  }
  assignThingUnassignPreference(data) { 
    const initialState = {
      title: 'Account',
      data
    };
    this.bsModalRef = this.modalService.show(AssignThingPreferenceDialogComponent, { initialState, class: 'gray modal-lg' });

    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      this.getDetailEvent();
    });
  }

  changeStatus(data) {
    const initialState = {
      title: 'false',
      dataDetail: data
    };
    //     this.bsModalRef = this.modalService.show(ChangeStatusComponent,  {initialState, class: 'gray modal-lg' });

    //     this.bsModalRef.content.onClose.subscribe(result => {
    //       console.log('results', result);
    //       this.getDetailEvent();
    // });
  }
  migrate(data) {
    const initialState = {
      title: 'false',
      dataDetail: data
    };
    //     this.bsModalRef = this.modalService.show(MigrateDialogComponent,  {initialState, class: 'gray modal-lg' });

    //     this.bsModalRef.content.onClose.subscribe(result => {
    //       console.log('results', result);
    //       this.getDetailEvent();
    // });
  }
  addField(data) {


    const initialState = {
      title: 'false',
      dataDetail: data
    };
    //     this.bsModalRef = this.modalService.show(AddFieldDialogComponent,  {initialState, class: 'gray modal-lg' });

    //     this.bsModalRef.content.onClose.subscribe(result => {
    //       console.log('results', result);
    //       this.getDetailEvent();
    // });
  }
  ngOnInit() {

    this.getDetailEvent();
  }
  assignUnassignAlert(data) {

    const initialState = {
      title: 'Account',
      data
    };
    this.bsModalRef = this.modalService.show(AssignUnassignAlertDialogComponent, { initialState, class: 'gray modal-lg' });

    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      this.getDetailEvent();
    });
  }
}
