import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AccountService } from '../Account/account.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-migrate-account',
  templateUrl: './migrate-account.component.html',
  styleUrls: ['./migrate-account.component.scss']
})
export class MigrateAccountComponent implements OnInit {
  constructor(private Service: AccountService,
// tslint:disable-next-line: variable-name
              private _bsModalRef: BsModalRef,
   ) {
 
    this.selectedList = [];
    this.data = {metadata: []};
    this.page = 0;
    this.size = 5;
      this.sort = 'createdOn,Desc';
;
    this.selectedPage = 1;
   }
  public onClose: Subject<boolean>;
  public onCloseEdit: Subject<boolean>;

  selectedList:any = [];

  pageCountArray: any;
  selectedPage: any;
  nextDisabled: any;
 preDisabled: any;
 pageCount: any;
 page: any;
 eventTemplateList: any =[];; 
data: any;
size: any;
sort: any;
title: any;
 id: any;
 dataList: any;
//  http://13.126.31.198:8080/things/106/thingTemplate 
thingsTemplateDetail(){ 
}
 geteventTemplate() {
   this.Service.AccountDataGet(this.page, this.size, this.sort).subscribe(res => {
     console.log(JSON.stringify(res))
     this.eventTemplateList = res._embedded.accounts;
    this.pageCount =  res.page.totalPages;

     if (this.pageCount === this.page + 1) {
       this.nextDisabled = true;
     } else {
       this.nextDisabled = false;

     }

     if (this.page   === 0) {
       this.preDisabled = true;
     } else {
       this.preDisabled = false;
     }
     this.pageCountArray = [];
     for (let i = 0 ; i < this.pageCount; i++) {
     this.pageCountArray.push(i + 1);
   }
    this.thingsTemplateDetail();
    
   });
 }
  status:any = false;
 createDevicePro() {
   console.log(JSON.stringify( this.Service.getSplitId(this.dataDetail._links.self.href)))
   if (this.selectedList.length > 0 ) {
     this.Service.migrateThing(  this.Service.getSplitId(this.dataDetail._links.self.href),
      this.selectedList[0].accountId,this.status ).subscribe(res => { 
       this.onClose.next(true);
       this._bsModalRef.hide();
       this.Service.suceesAlertDialog('Device Successfully migrated');

     });

        } else {
       alert('Please Select Things Template');
    }
 }
 dataDetail:any;
getDetailDeviceProvisioning() {
    this.data = this.dataDetail;
    console.log(JSON.stringify(this.data))
  this.selectedList.push(this.dataDetail)
}

  ngOnInit() {
    this.onClose = new Subject();
    this.onCloseEdit = new Subject();
      this.data = {};

    
    this.geteventTemplate();
     
      this.getDetailDeviceProvisioning();
 

  }
  prePage() {

    this.selectedPage = this.selectedPage - 1;
    this.page = this.selectedPage - 1 ;
    this.geteventTemplate();


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
selectedListdata(data: any) {
// tslint:disable-next-line: prefer-for-of
  for (let i = 0 ; i < this.eventTemplateList.length; i++) {
    if (this.eventTemplateList[i].accountId !== data.accountId) {
      this.eventTemplateList[i].check =  false;
      }
     }
  data.check = ! data.check;

  this.selectedList = [];

  if (data.check) {
    this.selectedList.push(data);
  } else {
  const index =   this.selectedList.findIndex( record => record.accountId === data.accountId );
  this.selectedList.splice(index, 1);
}
 }
Page(data: any) {
   this.selectedPage = data ;
   this.page = this.selectedPage - 1;
   this.geteventTemplate();
}
  nextPage() {

      this.selectedPage = this.selectedPage + 1;
      this.page = this.selectedPage - 1;
      this.geteventTemplate();

  }
  getClass(data: any) {
    if (this.selectedPage === data) {
      return 'active';
    } else {
      return '';
    }
  }
  close(){
    this._bsModalRef.hide();
  }
}