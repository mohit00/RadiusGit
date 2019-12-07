import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {AuthService} from '../auth.service';
import {WebserModel} from '../Service.model';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent implements OnInit {
  constructor( private AuthService: AuthService  ,private _bsModalRef: BsModalRef) { }
   data: any;
  public onClose: Subject<boolean>;
  selectedStatus: any;
  selectedStatusOpp: any;
  close(){
    this._bsModalRef.hide()
  }
  ngOnInit() {
    this.onClose = new Subject();

    if (this.data.state.lifecycleState === 'TESTING') {
    this.selectedStatus = 'testing';
   } else if (this.data.state.lifecycleState === 'REGISTER') {
    this.selectedStatus = 'register'; 
   } else if (this.data.state.lifecycleState === 'INACTIVE') {
    this.selectedStatus = 'inactive'; 
   } else if (this.data.state.lifecycleState === 'ACTIVE') {
    this.selectedStatus = 'active';
   }
    if (this.data.state.operationalState === 'RESUME') {
    this.selectedStatusOpp = 'resume';
   } else if (this.data.state.operationalState === 'SUSPEND') {
    this.selectedStatusOpp = 'suspend';
   } else if (this.data.state.operationalState === 'ONLINE') {
    this.selectedStatusOpp = 'online';
   } else if (this.data.state.operationalState === 'OFFLINE') {
    this.selectedStatusOpp = 'offline';
   }


  }
  statusChange(data) {
     
     sessionStorage.setItem("setUserAccount",this.data.account.accountId);
    this.AuthService.deviceLifestateChange(this.data._links.self.href.split('/')[4], data).subscribe(res => {
      this._bsModalRef.hide();
      this.onClose.next(true)
      this.AuthService.suceesAlertDialog(' Life State Update Successfully' )
    });
  }

  statusChangeOpp(data) {
    sessionStorage.setItem("setUserAccount",this.data.account.accountId);

    this.AuthService.deviceOperationstateChange(this.data._links.self.href.split('/')[4], data).subscribe(res => {
      this._bsModalRef.hide();
      this.onClose.next(true)

      this.AuthService.suceesAlertDialog(' Operation State Update Successfully' )

    });
  }  
  status(data) {

    this.selectedStatus = data;
    this.statusChange(data);
  }
  getStatusselected(data) {
    if (this.selectedStatus == data ) {
      return 'optionFill';
    }
  }
  statusOpp(data) {


    this.selectedStatusOpp = data;
    this.statusChangeOpp(data);
  }
  getStatusselectedOpp(data) {
    if (this.selectedStatusOpp == data ) {
      return 'optionFill';
    }
  }
}
