import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import Stepper from 'bs-stepper';
 import { BsModalRef } from 'ngx-bootstrap';
import { AuthService } from 'src/app/auth.service';
import {WebserModel} from '../Service.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
  private stepper: Stepper;
   id:any;
  public onClose: Subject<boolean>;
  daysOfMonth:any={
    startTime:'',endTime:'',
    day:'',months:[]
  }
  always:any={
    startTime:'',endTime:''
  }
  daysOfWeek:any = {
    startTime:'',endTime:'',
    dayOfWeek:''

  }
  triggerAdditionalInfo:any = {
  
  }
  alertAction:any = [
    {
      "entityType":"",
      "entityID":"",
      "to":"user@gmail.com",
      "type":"",
      "message":"",
      "templateId":""
    }
  ];
  data: any = {
    whenToExecute:{
    always:{
    startTime:'',endTime:''
  }
},whenToExecute2:"",


};
  getCountryList:any;
  contactUser: any = [];
  dropdownSettings:IDropdownSettings;
  constructor(private WebserModel:WebserModel,private AuthService:AuthService, private _bsModalRef: BsModalRef) {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.getCountryList =   this.AuthService.CountryList;
 
  

   }
  dataList: any;
  title: any;
  page: any;
  size: any;
  sort: any;
  ListSelect: any;
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
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
   
  remove(index) {
    this.dataList.splice(index, 1);
  }
  
  
  MonthList:any;
   ngOnInit() {
     if (this.title === 'false') { 
    }else{ 
    }

    this.onClose = new Subject();

   
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
    this.MonthList = [
      { item_id: 0, item_text: 'Jan' },
      { item_id: 1, item_text: 'Feb' },
      { item_id: 2, item_text: 'March' },
      { item_id: 3, item_text: 'April' },
      { item_id: 4, item_text: 'May' },
      { item_id: 5, item_text: 'June' },
      { item_id: 6, item_text: 'July' },
      { item_id: 7, item_text: 'Aug' },
      { item_id: 8, item_text: 'Sept' },
      { item_id: 9, item_text: 'Oct' },
      { item_id: 10, item_text: 'Nov' },
      { item_id: 11, item_text: 'Dec' }



    ];
    this.selectedItems=[];
  

  }
  selectedItems:any;
  next(form) {
     if(form.valid){

    }else {
     for (let inner in form.controls) {
       form.controls[inner].markAsTouched()
   }
    
     return false;}
    this.stepper.next();
  }
   
  submitData(form) { 
  }
  updateData(form) { 
  }

  AddUsernext() {
    this.alertAction.push({
      to: 'User@gmail.com'
    });
  }
  RemoveUser(index) {
    this.alertAction.splice(index, 1);

  }
  CreateAlert(){
    if(this.data.whenToExecute2 == 'daysOfMonth'){
      this.daysOfMonth.months =  this.selectedItems;
      this.data.whenToExecute = this.daysOfMonth;
    } if(this.data.whenToExecute2 == 'always'){
      this.data.whenToExecute = this.always;
    }
    if(this.data.whenToExecute2 == 'daysOfWeek'){
      this.data.whenToExecute = this.daysOfWeek;
    }
    this.data.alertAction = this.alertAction;
    this.data.triggerAdditionalInfo = this.triggerAdditionalInfo;
    alert(JSON.stringify(this.data))
    // alert(JSON.stringify(this.daysOfMonth))
    // alert(JSON.stringify(this.always))

    // alert(JSON.stringify(this.daysOfWeek))
    // alert(JSON.stringify(this.triggerAdditionalInfo))
    // alert(JSON.stringify(this.triggerAdditionalInfo))
    // alert(JSON.stringify(this.alertAction))
    // alert(JSON.stringify(this.data))
    this.AuthService.createAlert(this.data).subscribe(res=>{
      alert(JSON.stringify(res))

    })
     
  }
  
}
