import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import {AuthService} from '../auth.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-assign-unassign-alert-dialog',
  templateUrl: './assign-unassign-alert-dialog.component.html',
  styleUrls: ['./assign-unassign-alert-dialog.component.scss']
})
export class AssignUnassignAlertDialogComponent implements OnInit {
  title:any;
  data:any;
  public onClose: Subject<boolean>;
  AlertDisplay: any;

  constructor(private _bsModalRef: BsModalRef, private Service: AuthService) {
    this.onClose = new Subject();

   }
   getAssignThing(){
    
    this.Service.getAlertMappedToThing(this.data.thingId).subscribe(res=>{
      alert(JSON.stringify(res))
    })
   }
   getAssignAccount(){
    
    this.Service.getAlertMappedToAccount(this.data.accountId).subscribe(res=>{
       for(var i=0;i<res.length;i++){
     let index =   this.AlertDisplay.findIndex( record => record.customAlertId === res[i].customAlertId );
      if(index == -1){}else{
      this.AlertDisplay[index].check = true;
     }
      }
    })
   }
   
alertGet(){ 
  this.Service.getalerts(0, 1000,  'createdOn,Desc').subscribe(res => {
      this.AlertDisplay = res._embedded.alerts;   
      if(this.title =='thing'){
        this.getAssignThing();
 
     }else{
       this.getAssignAccount();
     }
  });
}
toggel(data,event){
console.log(JSON.stringify(data.customAlertId))
if(this.title == 'thing'){
  if(event == 'Assign'){
    this.Service.AssignThingAlert(data.customAlertId,this.data.thingId).subscribe(res=>{
     })
  }
  else if(event == 'UnAssign'){
    this.Service.unAssignThingAlert(data.customAlertId,this.data.thingId).subscribe(res=>{
     })
  }

}else{
   if(event == 'Assign'){
    this.Service.AssignAccountAlert(data.customAlertId,this.data.accountId).subscribe(res=>{
     })
  }
  else if(event == 'UnAssign'){
    this.Service.unAssignAccountAlert(data.customAlertId,this.data.accountId).subscribe(res=>{
       
    })
  }
}
}
  ngOnInit() {
    this.alertGet();
    // console.log(JSON.stringify());
  }
  onCancel(){
    this._bsModalRef.hide();
  }
}
