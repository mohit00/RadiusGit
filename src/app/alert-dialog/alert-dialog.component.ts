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
  public onCloseEdit: Subject<boolean>;

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
  alertDetail(){
    this.AuthService.getDetail(  'alerts/' + this.id).subscribe(res => {
       console.log(JSON.stringify(res))
       this.data = res;
       this.triggerAdditionalInfo = res.triggerAdditionalInfo
       this.alertAction = res.alertAction
       if(res.whenToExecute.always){
        this.data.whenToExecute2 = 'always'
        this.always = res.whenToExecute.always;
        this.always.startTime = new Date(this.always.startTime);
        this.always.endTime = new Date(this.always.endTime);

        }if(res.whenToExecute.daysOfMonth){
        this.data.whenToExecute2 = 'daysOfMonth'
        this.daysOfMonth = res.whenToExecute.daysOfMonth;
        this.daysOfMonth.startTime = new Date(this.daysOfMonth.startTime);
        this.daysOfMonth.endTime = new Date(this.daysOfMonth.endTime);

        }if(res.whenToExecute.daysOfWeek){
          this.data.whenToExecute2 = 'daysOfWeek'
          this.daysOfWeek = res.whenToExecute.daysOfWeek;
          this.daysOfWeek.startTime = new Date(this.daysOfWeek.startTime);
          this.daysOfWeek.endTime = new Date(this.daysOfWeek.endTime); 
          }


    });

  }
    ngOnInit() {
      if (this.title) { 
        this.alertDetail();
    }else{ 
    }

    this.onClose = new Subject();
    this.onCloseEdit = new Subject();

    
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
    this.data.whenToExecute ={};
    if(this.data.whenToExecute2 == 'daysOfMonth'){
      for(var i =0 ;i<this.selectedItems.length;i++){
        this.daysOfMonth.months.push(this.selectedItems[i].item_id);
      }
       this.data.whenToExecute.daysOfMonth = this.daysOfMonth;
        
       this.data.whenToExecute.daysOfMonth.startTime =this.data.whenToExecute.daysOfMonth.startTime.toISOString().replace('.000Z', '');
       ;
       this.data.whenToExecute.daysOfMonth.endTime = this.data.whenToExecute.daysOfMonth.endTime.toISOString().replace('.000Z', '')

    } if(this.data.whenToExecute2 == 'always'){
      this.data.whenToExecute.always = this.always;
      this.data.whenToExecute.always.startTime =this.data.whenToExecute.always.startTime.toISOString().replace('.000Z', '');
      ;
      this.data.whenToExecute.always.endTime = this.data.whenToExecute.always.endTime.toISOString().replace('.000Z', '')

    }
    if(this.data.whenToExecute2 == 'daysOfWeek'){

      this.data.whenToExecute.daysOfWeek = this.daysOfWeek;
      this.data.whenToExecute.daysOfWeek.startTime =this.data.whenToExecute.daysOfWeek.startTime.toISOString().replace('.000Z', '');
      ;
      this.data.whenToExecute.daysOfWeek.endTime = this.data.whenToExecute.daysOfWeek.endTime.toISOString().replace('.000Z', '')

    }
    this.data.alertAction = this.alertAction;
    this.data.triggerAdditionalInfo = this.triggerAdditionalInfo;
    console.log(JSON.stringify(this.data))
  
    this.AuthService.createAlert(this.data).subscribe(res=>{
       this.onClose.next(true);

      this._bsModalRef.hide();
      this.AuthService.suceesAlertDialog('Alert has been successfully Updated.' );


    })
     
  }
  UpdateAlert(){
    this.data.whenToExecute ={};
    if(this.data.whenToExecute2 == 'daysOfMonth'){
      for(var i =0 ;i<this.selectedItems.length;i++){
        this.daysOfMonth.months.push(this.selectedItems[i].item_id);
      }
       this.data.whenToExecute.daysOfMonth = this.daysOfMonth;
        
       this.data.whenToExecute.daysOfMonth.startTime =this.data.whenToExecute.daysOfMonth.startTime.toISOString().replace('.000Z', '');
       ;
       this.data.whenToExecute.daysOfMonth.endTime = this.data.whenToExecute.daysOfMonth.endTime.toISOString().replace('.000Z', '')

    } if(this.data.whenToExecute2 == 'always'){
      this.data.whenToExecute.always = this.always;
      this.data.whenToExecute.always.startTime =this.data.whenToExecute.always.startTime.toISOString().replace('.000Z', '');
      ;
      this.data.whenToExecute.always.endTime = this.data.whenToExecute.always.endTime.toISOString().replace('.000Z', '')

    }
    if(this.data.whenToExecute2 == 'daysOfWeek'){

      this.data.whenToExecute.daysOfWeek = this.daysOfWeek;
      this.data.whenToExecute.daysOfWeek.startTime =this.data.whenToExecute.daysOfWeek.startTime.toISOString().replace('.000Z', '');
      ;
      this.data.whenToExecute.daysOfWeek.endTime = this.data.whenToExecute.daysOfWeek.endTime.toISOString().replace('.000Z', '')

    }
    this.data.alertAction = this.alertAction;
    this.data.triggerAdditionalInfo = this.triggerAdditionalInfo;
   console.log(     (JSON.stringify(this.data))
  )
    this.AuthService.updateAlert(this.data,this.id).subscribe(res=>{
       this.onCloseEdit.next(true);

      this._bsModalRef.hide();
      this.AuthService.suceesAlertDialog('Alert has been successfully Updated.' );


    })
     
  }
}
