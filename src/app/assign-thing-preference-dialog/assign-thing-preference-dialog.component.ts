import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import {AuthService} from '../auth.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-assign-thing-preference-dialog',
  templateUrl: './assign-thing-preference-dialog.component.html',
  styleUrls: ['./assign-thing-preference-dialog.component.scss']
})
export class AssignThingPreferenceDialogComponent implements OnInit {
  title:any;
  data:any;
  sort :any = 'createdOn,Desc';

  public onClose: Subject<boolean>;
  AlertDisplay: any;
  showpagi: boolean;
  pageInfo: any;
  page: number =0;
  preDisabled: boolean;
  displayList: any;
  pageCountArray: any =[];
  size: any =5;
  selectedPage: number = 1;;

  constructor(private _bsModalRef: BsModalRef, private Service: AuthService) {
    this.onClose = new Subject();

   }
   getAssignThing(){
    
    this.Service.getThingPreferenceMappedToThing(this.data.thingId).subscribe(res=>{
       this.assignedAccountPreferenceList = res;
       this.checkAccount();
    //    for(var i=0;i<res.length;i++){
    //  let index =   this.AlertDisplay.findIndex( record => record.customAlertId === res[i].customAlertId );
    //   if(index == -1){}else{
    //   this.AlertDisplay[index].check = true;
    //  }
    //   }
    })
   }
   assignedAccountPreferenceList=[];
   getAssignAccount(){
       
    this.Service.getThingPreferenceMappedToAccount(this.data.accountId).subscribe(res=>{
      console.log(JSON.stringify(res))
      this.assignedAccountPreferenceList = res;
       this.checkAccount();
    //    for(var i=0;i<res.length;i++){
    //  let index =   this.AlertDisplay.findIndex( record => record.customAlertId === res[i].customAlertId );
    //   if(index == -1){}else{
    //   this.AlertDisplay[index].check = true;
    //  }
    //   }
    })
   }
   getAssignedThing(){
       
    this.Service.getThingPreferenceMappedToAccount(this.data.accountId).subscribe(res=>{
      this.assignedAccountPreferenceList = res;
       this.checkAccount();
    //    for(var i=0;i<res.length;i++){
    //  let index =   this.AlertDisplay.findIndex( record => record.customAlertId === res[i].customAlertId );
    //   if(index == -1){}else{
    //   this.AlertDisplay[index].check = true;
    //  }
    //   }
    })
   }
   checkAccount(){
        for(var i=0;i<this.assignedAccountPreferenceList.length;i++){
     let index =   this.displayList.findIndex( record => record.preferenceId === this.assignedAccountPreferenceList[i].preferenceId );
      if(index == -1){}else{
      this.displayList[index].assign = true;
     }
    }
   }
  
alertGet(){ 
 
  this.Service.preferenceThingGET(this.page, this.size, this.sort).subscribe(res => {

    this.showpagi = true;
    this.pageInfo = res.page;
    
    
    if (this.page   == 0) {
     this.preDisabled = true;
    } else {
     this.preDisabled = false;
    
    }
    this.displayList = res._embedded.thingpreferences;
      
      if(this.title =='thing'){
        this.getAssignThing();
 
     }else{
      this.checkAccount();
       this.getAssignAccount();
     }
  });
}
getClass(data) {
  if (this.selectedPage === data) {
    return 'active';
  } else {
    return '';
  }
}
prePage() {
  
  this.selectedPage = this.selectedPage - 1;
  this.page = this.selectedPage - 1 ;
  this.alertGet();
}
Page(data) {
 this.selectedPage = data ;
 this.page = this.selectedPage - 1;
 this.alertGet();
}
nextPage() {
    this.selectedPage = this.selectedPage + 1;
    this.page = this.selectedPage - 1;
    this.alertGet();
}


 
getCountAttribute(){
  this.Service.preferenceThingCount().subscribe(res=>{
     
      for (let i = 0 ; i <  res/this.size; i++) {
      this.pageCountArray.push(i + 1);
    }
    if(this.pageCountArray.length == 0){
      this.pageCountArray.push(1)
    }
  })
}
toggel(data,event){
 if(this.title == 'thing'){
  sessionStorage.setItem('setUserAccount',this.data.account.accountId);

  if(event == 'Assign'){

     data.unassign = false;
  this.Service.assignThingPreferanceThing(data.preferenceId,this.data.thingId).subscribe(res=>{
      })
}
else if(event == 'UnAssign'){
  data.assign = false;
  this.Service.unAssignThingPreferanceThing(data.preferenceId,this.data.thingId).subscribe(res=>{
     

  })
}

}else{
     if(event == 'Assign'){
      sessionStorage.setItem('setUserAccount',this.data.accountId);

       data.unassign = false;
    this.Service.assignThingPreferanceAccount(data.preferenceId,this.data.accountId).subscribe(res=>{
        })
  }
  else if(event == 'UnAssign'){
    data.assign = false;
    this.Service.unAssignThingPreferanceAccount(data.preferenceId,this.data.accountId).subscribe(res=>{
       

    })
  }
}
}
  ngOnInit() {
    this.alertGet();
    this.getCountAttribute();
    // console.log(JSON.stringify());
  }
  onCancel(){
    this._bsModalRef.hide();
  }
}
