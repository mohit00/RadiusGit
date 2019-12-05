import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import Stepper from 'bs-stepper';
 import { BsModalRef } from 'ngx-bootstrap';
import { AuthService } from 'src/app/auth.service';
import {WebserModel} from '../../../Service.model';
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
   id:any;
  public onClose: Subject<boolean>;
  data: any = {accountContact: {country:'1'}, userInfo: {},
  type: '', parentAccount: ''};
  getCountryList:any;
  contactUser: any = [];
  constructor(private WebserModel:WebserModel ,private AuthService:AuthService, private _bsModalRef: BsModalRef) {
    this.getCountryList =   this.AuthService.CountryList;
    this.data  =  {accountContact: {country:'1'}, userInfo: {},
    type: '', parentAccount: ''};

   }
  dataList: any;
  title: any;
  page: any;
  size: any;
  sort: any;
  ListSelect: any;
  add() {
    this.dataList.push({
      type: '1',
      class : 'col-md-6',
      class1: 'col-md-6',
      class2: 'col-md-6',
      class3: 'col-md-8' ,
      class4: 'plusbutonafter',
      class5: 'col-md-2',
     } );
   }
   getAccountList() {
   }
  remove(index) {
    this.dataList.splice(index, 1);
  }
  AddUsernext() {
    this.contactUser.push({
      name: 'User'
    });
  }
  RemoveUser(index) {
    this.contactUser.splice(index, 1);

  }
  scroll() {
    console.log("dsd")
     }
  ngOnInit() {

   
    this.getAccountList();
    if (this.title === 'false') {
      this.contactUser = [{
        name: 'User'
      }];
      this.dataList = [{
        class : 'col-md-6',
        class1: 'col-md-6',
        class5: 'col-md-2',

        type: '1',
        class2: 'col-md-6',
        class3: 'col-md-10',
        class4: 'plustbutton'
         }
    ];

    }else{
  
 
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
     if(form.valid){

    }else {
     for (let inner in form.controls) {
       form.controls[inner].markAsTouched()
   }
    
     return false;}
    this.stepper.next();
  }
  onSubmit() {
    return false;
  }
  submitData(form) {
    if(form.valid){

    }else {
     for (let inner in form.controls) {
       form.controls[inner].markAsTouched()
   }
    
     return false;}
    this.data.metadata = {};
    if (this.dataList.length > 0 ) {
  // tslint:disable-next-line: prefer-for-of
    for (let i = 0 ; i < this.dataList.length ; i++) {
      if (this.dataList[i].name) {
         this.data.metadata[this.dataList[i].name] = this.dataList[i].value;
       }
    }
    
    // this.data.parentAccount
    this.data.createdBy = 'admin';
     this.data.status = 'ACTIVE';
  }
  if(this.data.parentAccount == '1'){
    this.data.parentAccount = "";
  }
    this.data.userContacts = this.contactUser;
    console.log(JSON.stringify(this.data));
   }
  updateData(form) {
     if(form.valid){

    }else {
     for (let inner in form.controls) {
       form.controls[inner].markAsTouched()
   }
    
     return false;}
    this.data.metadata = {};
    if (this.dataList.length > 0 ) {
  // tslint:disable-next-line: prefer-for-of
    for (let i = 0 ; i < this.dataList.length ; i++) {
      if (this.dataList[i].name) {
         this.data.metadata[this.dataList[i].name] = this.dataList[i].value;
       }
    }
    
    // this.data.parentAccount
    this.data.createdBy = 'admin';
     this.data.status = 'ACTIVE';
  }
  if(this.data.parentAccount == '1'){
    this.data.parentAccount = "";
  }
    this.data.userContacts = this.contactUser;
    console.log(JSON.stringify(this.data));
   }
}
