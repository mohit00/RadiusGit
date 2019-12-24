import { Component, OnInit } from '@angular/core';
 import { BsModalRef } from 'ngx-bootstrap';
 import { Subject } from 'rxjs';
 import {AccountService} from '../account.service'
@Component({
  selector: 'app-account-tree',
  templateUrl: './account-tree.component.html',
  styleUrls: ['./account-tree.component.scss']
})
export class AccountTreeComponent implements OnInit {
 
// Set the dimensions and margins of the diagram
 public onClose: Subject<boolean>;
data:any;
  accountName: any;
  constructor( private _bsModalRef: BsModalRef,private service:AccountService) { 
   }
   onCancel(){
     this._bsModalRef.hide();
   }
  accountList:any =[];
   getAccountTree(data){
      this.service.getAccountTree(data.accountId).subscribe(res=>{
        for(var i =0 ;i<res.length ;i++){
          res[i].check = false;
        
        }
        this.accountList = res;
      })
   }
  ngOnInit() {
    this.accountName = this.data.name;
    this.getAccountTree(this.data);
    this.onClose = new Subject();

  }
  subAccount(data){
    data.check =!data.check;
    data.sub =[];
    if(data.check){
      this.service.getAccountTree(data.accountId).subscribe(res=>{
    
        for(var i =0 ;i<res.length ;i++){
          res[i].check = false;
          data.sub.push(res[i])
        }
      })
    }
  
  }
}
