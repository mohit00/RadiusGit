import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import Stepper from 'bs-stepper';
import { BsModalRef } from 'ngx-bootstrap';
import { AuthService } from 'src/app/auth.service';
import { WebserModel } from '../../../Service.model';
import { ScrollEvent } from 'ngx-scroll-event';
declare var $: any;

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
  data: any = { propertyMap: {} };
  getCountryList: any;
  contactUser: any = [];
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
      this.data = {
        "preferenceId": res.preferenceId,
        "createdBy": res.createdBy,
        "lastUpdatedBy": res.lastUpdatedBy,
        "name": res.name,
        "description": res.description,

        propertyMap: {
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
      }
    })

  }
  ngOnInit() {


    if (this.title === 'false') {


    } else {
      this.preferenceDetail();

      //   this.dataList = [
      // ];
    }

    this.onClose = new Subject();

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
    if (this.data.propertyMap.absolute_consumption) {
      this.data.propertyMap.absolute_consumption = "true"
    } else {
      this.data.propertyMap.absolute_consumption = "false"

    }
    this.AuthService.preferenceAccountCreate(this.data).subscribe(res => {
      alert(JSON.stringify(res));
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

    console.log(JSON.stringify(this.data));
  }
}
