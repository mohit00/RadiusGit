import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
 import {MatChipInputEvent} from '@angular/material/chips';

import Stepper from 'bs-stepper';
import { BsModalRef } from 'ngx-bootstrap';
import { AuthService } from 'src/app/auth.service';
import { WebserModel } from '../../../Service.model';
import { ScrollEvent } from 'ngx-scroll-event';
declare var $: any;
export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-preferences-account-dialog',
  templateUrl: './preferences-account-dialog.component.html',
  styleUrls: ['./preferences-account-dialog.component.scss']
})
export class PreferencesAccountDialogComponent implements OnInit {
  public handleScroll(event: ScrollEvent) {
    console.log('scroll occurred', event.originalEvent);
    if (event.isReachingBottom) {
      console.log(`the user is reaching the bottom`);
    }
    if (event.isReachingTop) {
      console.log(`the user is reaching the bottom`);
    }
    if (event.isWindowEvent) {
      console.log(`This event is fired on Window not on an element.`);
    }

  }

  private stepper: Stepper;
  id: any;
  public onClose: Subject<boolean>;
  public onCloseEdit: Subject<boolean>;

  data: any = { propertyMap: {} };
  getCountryList: any;
  contactUser: any = [];
  additionalProperty :any =[];
  AddUsernext(){
    this.additionalProperty.push({
    });
    this.additionalProperty[this.additionalProperty.length-1][ 'additionalProperty'+(this.additionalProperty.length-1)] = {}
    console.log(JSON.stringify(this.additionalProperty))
  }
  RemoveUser(index) {
    this.additionalProperty.splice(index, 1);

  }
  constructor(private WebserModel: WebserModel, private AuthService: AuthService, private _bsModalRef: BsModalRef) {
    this.data = { propertyMap: {} };

  }
  dataList: any;
  title: any;
  page: any;
  size: any;
  sort: any;
  ListSelect: any;
  preferenceDetail() {
    this.AuthService.getDetail('preferences/' + this.id).subscribe(res => {
      console.log(JSON.stringify(res))
       if(res.allowed_alarms_notification.length > 0){
        for(var i=0;i<res.allowed_alarms_notification.length;i++){
          this.fruits.push({
            name:res.allowed_alarms_notification[i]
          })
        }
      }
      for(let i in  res.propertyMap){
        alert(i)
        alert(JSON.stringify(res.propertyMap[i]))
        this.additionalProperty.push({
          i:res.propertyMap[i]
        })
      }
      this.data = {
        "id":this.AuthService.getSplitId(res._links.self.href ),
        "preferenceId": res.preferenceId,
        "createdBy": res.createdBy,
        "lastUpdatedBy": res.lastUpdatedBy,
        "name": res.name,
        "description": res.description,
          "sms_alert_message_enabled": res.sms_alert_message_enabled,
          "sms_alert_time_from": res.sms_alert_time_from,
          "sms_alert_time_to": res.sms_alert_time_to,
          "sms_report_message_enabled": res.sms_report_message_enabled,
          "sms_reporting_time": res.sms_reporting_time,
          "email_enabled": res.email_enabled,
          "reading_validator_mf": res.reading_validator_mf,
          "absolute_consumption": res.absolute_consumption,
          "max_allowed_reading": res.max_allowed_reading,
          "alert_enable": res.alert_enable,

         
      }
    })

  }
  ngOnInit() {


    if (this.title === 'false') {
    this.additionalProperty=  [{
        additionalProperty0:{}
      }]

    } else {
      this.preferenceDetail();

      //   this.dataList = [
      // ];
    }

    this.onClose = new Subject();
    this.onCloseEdit = new Subject();
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
  }
  next(form) {
    if (form.valid) {

    } else {
      for (let inner in form.controls) {
        form.controls[inner].markAsTouched()
      }

      return false;
    }
    this.stepper.next();
  }

  submitData(form) {
    if (form.valid) {

    } else {
      for (let inner in form.controls) {
        form.controls[inner].markAsTouched()
      }

      return false;
    }
    let allowed_alarms_notification=[];
      for(var i =0 ;i<this.fruits.length;i++){
        allowed_alarms_notification.push(this.fruits[i].name);
      }
      console.log(allowed_alarms_notification);
      let dataJson :any= {
        propertyMap:{}
      }
      dataJson=this.data;
      dataJson.allowed_alarms_notification = allowed_alarms_notification;
      for(var i=0;i<this.additionalProperty.length;i++){
      dataJson.propertyMap['additionalProperty'+i] = this.additionalProperty[i]['additionalProperty'+i];
      }
    console.log(JSON.stringify(dataJson));
    // dataJson.propertyMap
    this.AuthService.preferenceAccountCreate(dataJson).subscribe(res => {
      this._bsModalRef.hide();
      this.onClose.next(true);

      this.AuthService.suceesAlertDialog('Account Preference Successfully Created');

    })
  }
  close() {
    this._bsModalRef.hide();
  }
  updateData(form) {
    if (form.valid) {

    } else {
      for (let inner in form.controls) {
        form.controls[inner].markAsTouched()
      }
    }

  
    if (form.valid) {

    } else {
      for (let inner in form.controls) {
        form.controls[inner].markAsTouched()
      }

      return false;
    }
    let allowed_alarms_notification=[];
      for(var i =0 ;i<this.fruits.length;i++){
        allowed_alarms_notification.push(this.fruits[i].name);
      }
      console.log(allowed_alarms_notification);
      let dataJson :any= {
        propertyMap:{}
      }
      dataJson=this.data;
      dataJson.allowed_alarms_notification = allowed_alarms_notification;
      for(var i=0;i<this.additionalProperty.length;i++){
      dataJson.propertyMap['additionalProperty'+i] = this.additionalProperty[i]['additionalProperty'+i];
      }
     // dataJson.propertyMap
    this.AuthService.preferenceAccountUpdate(dataJson,this.data.id).subscribe(res => {
      this._bsModalRef.hide();
      this.onCloseEdit.next(true);
      this.AuthService.suceesAlertDialog('Account Preference Successfully Updated');

    })
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [ 
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

}
