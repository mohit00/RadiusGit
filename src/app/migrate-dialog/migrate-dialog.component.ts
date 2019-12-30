import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-migrate-dialog',
  templateUrl: './migrate-dialog.component.html',
  styleUrls: ['./migrate-dialog.component.scss']
})
export class MigrateDialogComponent implements OnInit {
  constructor(private Service: AuthService,
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
   close(){
     this._bsModalRef.hide();
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
  // alert(this.selectedList[0]._links.thingTemplate.href.split('/')[4]);
  this.Service.getData({}, "/things/"+this.selectedList[0]._links.thingTemplate.href.split('/')[4]+"/thingTemplate").subscribe(res=>{
    this.dataDetail.templateDetailId = res._links.self.href.split('/')[4]
     this.selectedList =[];
    this.selectedList.push(res)
    console.log(JSON.stringify(this.selectedList))
    if (this.selectedList.length > 0) {
      const indexselected =   this.eventTemplateList.findIndex( record => record._links.self.href === this.selectedList[0]._links.self.href );
     if(indexselected != -1){
      this.eventTemplateList[indexselected].check = true;

     }
     }
  })
}
 geteventTemplate() {
   this.Service.getdeviceTemplate(this.page, this.size, this.sort).subscribe(res => {
     this.eventTemplateList = res._embedded.thingTemplates;
   console.log ( JSON.stringify(this.eventTemplateList))
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
  if (this.selectedList.length > 0 ) {
    sessionStorage.setItem("setUserAccount",this.data.account.accountId);
      this.Service.migrateThing(  this.dataDetail.templateDetailId,
      this.selectedList[0]._links.thingTemplate.href.split('/')[4],this.status ).subscribe(res => { 
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
selectedListdata(data: { check: boolean; _links: { self: { href: any; }; }; }) {
// tslint:disable-next-line: prefer-for-of
  for (let i = 0 ; i < this.eventTemplateList.length; i++) {
    if (this.eventTemplateList[i]._links.self.href !== data._links.self.href) {
      this.eventTemplateList[i].check =  false;
      }
     }
  data.check = ! data.check;

  this.selectedList = [];

  if (data.check) {
    this.selectedList.push(data);
  } else {
  const index =   this.selectedList.findIndex( record => record._links.self.href === data._links.self.href );
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
}