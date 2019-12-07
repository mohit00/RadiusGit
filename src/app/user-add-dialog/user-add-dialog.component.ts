import { Component, OnInit, HostListener } from '@angular/core';
  import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { BsModalRef } from 'ngx-bootstrap';
import Stepper from 'bs-stepper';
import {AccountService} from '../Account/account.service'
@Component({
  selector: 'app-user-add-dialog',
  templateUrl: './user-add-dialog.component.html',
  styleUrls: ['./user-add-dialog.component.scss']
})
export class UserAddDialogComponent implements OnInit {
  data:any =  {
    enabled:false,
    contactInfo:{
      country:1,
      streetAddress:"",

    },
    roles:[{
      roleId:1
    }],
    accountId:''
  }; 
  title:any;
  accountSelect:any = 'Select Account'
  onAccountChange(id,name){
    this.data.accountId = id;
    this.accountSelect = name;

  }
  accountPage:any=0;
  @HostListener('scroll', ['$event']) 
  scrollHandler(event) {
     if (event.target.offsetHeight + event.target.scrollTop > event.target.scrollHeight) {
      console.log("End");
      this.accountPage = this.accountPage+1;
      this.getAccountList();

    }
  }

  constructor(private AuthService:AuthService, private _bsModalRef: BsModalRef,private AccountService:AccountService) {
    }
  public onClose: Subject<boolean>;
getCountryList:any;
private stepper: Stepper;

id:any;
 
  ngOnInit() {
    this.getAccountList();
    this.getRoleList();

      if(this.title == 'true'){
    this.AuthService.getDetail('users/'+this.id).subscribe(res => {
 
         this.AuthService.getDetail('users/'+this.id+'/contactInfo').subscribe(res1=>{
          this.data = res;
          this.data.accountId = res.account.accountId;
          this.data.roleId  = res.roles[0].roleId;

  
          this.data.contactInfo={};
           this.data.contactInfo.streetAddress = res1.streetAddress
          this.data.contactInfo.state = res1.state

          this.data.contactInfo.country = res1.country
          console.log( JSON.stringify( this.data))
        })

    });
      }else{
      
      }
    this.onClose = new Subject();
 
    this.getCountryList =   this.AuthService.CountryList;

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
}
next() {
  this.stepper.next();
}
onSubmit() {
  return false;
}
accountList :any =[];
getAccountList(){

    this.AccountService.AccountDataGet(this.accountPage,100,'createdOn,Desc').subscribe(res=>{
    //  this.accountList=  res._embedded.accounts;
     this.accountList = this.accountList.concat(res._embedded.accounts)

    })
}
rolesList :any ;
getRoleList(){
  this.AuthService.GetRoles(0,10000,'createdOn,Desc').subscribe(res=>{
    // console.log(JSON.stringify(res))
    this.rolesList =res._embedded.roles;

  })
}
submitData() {
  this.data.roles[0].roleId = this.data.roleId;
  let dataJson = {
    contactInfo:this.data.contactInfo,
    userName:this.data.userName,
    enabled:this.data.enabled,
    firstName:this.data.firstName,
    lastName:this.data.lastName,
    roles:this.data.roles
  }
  // console.log("JSON"+JSON.stringify(dataJson))
  sessionStorage.setItem('setUserAccount',this.data.accountId)
    this.AuthService.addUser(dataJson).subscribe(res=>{

     this.AuthService.suceesAlertDialog("User Successfully Created")
     this._bsModalRef.hide();
     this.onClose.next(true);

 })
}
updateData() {
  this.data.roles[0].roleId = this.data.roleId;
  let dataJson = {
    contactInfo:this.data.contactInfo,
    userName:this.data.userName,
    enabled:this.data.enabled,
    firstName:this.data.firstName,
    lastName:this.data.lastName,
    roles:this.data.roles
  }
  console.log(this.data)
  // console.log("JSON"+JSON.stringify(dataJson))
  sessionStorage.setItem('setUserAccount',this.data.accountId)
      this.AuthService.updateUser(dataJson,this.data.userName).subscribe(res=>{

     this.AuthService.suceesAlertDialog("User Successfully Updated")
     this._bsModalRef.hide();
     this.onClose.next(true);

 })
}
}
