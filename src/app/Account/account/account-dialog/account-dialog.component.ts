import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import Stepper from 'bs-stepper';
import {AccountService} from '../../account.service';
import { BsModalRef } from 'ngx-bootstrap';
import { AuthService } from 'src/app/auth.service';
import {WebserModel} from '../../../Service.model';
import { ScrollEvent } from 'ngx-scroll-event';
declare var $: any;

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss']
})
export class AccountDialogComponent implements OnInit {
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
  public onCloseEdit: Subject<boolean>;
  data: any = {accountContact: {country:'1'}, userInfo: {},
  type: '', parentAccount: ''};
  getCountryList:any;
  contactUser: any = [];
  constructor(private WebserModel:WebserModel,private Service: AccountService,private AuthService:AuthService, private _bsModalRef: BsModalRef) {
    this.getCountryList =   this.AuthService.CountryList;
    this.data  =  {accountContact: {country:'1'}, userInfo: {},
    type: '', parentAccount: ''};

   }
  dataList: any;
  title: any;
  page: any;
  size: any;
  sort: any;
  ListSelect: any =[];
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
   accountPage :any = 0;
   @HostListener('scroll', ['$event']) 
   scrollHandler(event) {
      if (event.target.offsetHeight + event.target.scrollTop > event.target.scrollHeight) {
       console.log("End");
       this.accountPage = this.accountPage+1;
       this.getAccountList();
 
     }
   }
   accountSelect:any = 'Select Account'
   onAccountChange(id,name){
     this.accountSelect = name;
      this.data.parentAccount =id._links.self.href;
  }
  getAccountList() {
    this.Service.AccountDataGet(this.accountPage, 100, this.sort).subscribe(res => {
          this.ListSelect = this.ListSelect.concat(res._embedded.accounts)

       });
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
  
      this.Service.getDetail(this.WebserModel.Sevice.BASENEWURL + 'account-service/account/' + this.id).subscribe(res2 => {
        this.data  =  {accountContact: {country:'1'}, userInfo: {},
        type: '1', parentAccount: '1'};
  this.data =res2;
   this.contactUser = this.data.userContacts;
       this.data.validityFrom = new Date(this.data.validityFrom);
      this.data.validityTo = new Date(this.data.validityTo);
      if(res2.parentAccount){
        this.data.parentAccount2= res2.parentAccount;
      this.data.parentAccount = "http://13.126.31.198:8090/accounts/"+res2.parentAccount.id
      
      }
      this.dataList =[];
      for(let i in  res2.metadata){
      
        // value:this.data.metadata[i]
        this.dataList.push({
          class : 'col-md-6',
          class1: 'col-md-6',
          class5: 'col-md-2',
  
          type: '1',
          class2: 'col-md-6',
          class3: 'col-md-10',
          class4: 'plustbutton',
          name:i,
          value:res2.metadata[i]
           })
       }
      })
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
    this.Service.addAccount(this.data).subscribe(res => {
      this._bsModalRef.hide();
      this.onClose.next(true);
      this.Service.suceesAlertDialog('Account Successfully Created');
    });
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
     this.Service.updateAccount(this.data,this.data.id).subscribe(res => {
      this._bsModalRef.hide();
      this.onCloseEdit.next(true);
      this.Service.suceesAlertDialog('Account Successfully Updated');
    });
  }
}
