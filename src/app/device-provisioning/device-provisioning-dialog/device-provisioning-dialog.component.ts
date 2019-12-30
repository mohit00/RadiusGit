import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import {AuthService} from '../../auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-device-provisioning-dialog',
  templateUrl: './device-provisioning-dialog.component.html',
  styleUrls: ['./device-provisioning-dialog.component.scss']
})
export class DeviceProvisioningDialogComponent implements OnInit {
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
  public onClose: Subject<boolean>;
  public onCloseEdit: Subject<boolean>;

  
  pageCountArray: any;
  selectedPage: any;
  nextDisabled: any;
 preDisabled: any;
 pageCount: any;
 page: any;
 selectedList: any;
eventTemplateList: any;
data: any;
size: any;
sort: any;
title: any;
 id: any;
 dataList: any;

 geteventTemplate() {
   this.Service.getdeviceTemplate(this.page, this.size, this.sort).subscribe(res => {
     console.log(JSON.stringify(res))
     this.eventTemplateList = res._embedded.thingTemplates;
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
   this.selectedList.push(this.eventTemplateList[0])
  //    if (this.selectedList.length > 0) {
  //   const indexselected =   this.eventTemplateList.findIndex( record =>{
  //     alert(record._links.self.href)
  //     return record._links.self.href === this.selectedList[0]._links.self.href
  //   }  );
  //   this.eventTemplateList[indexselected].check = true;
  //  }
   });
 }
 updateDevicePro(form) {
  if(form.valid){

  }else {
   for (let inner in form.controls) {
     form.controls[inner].markAsTouched()
 }
  
   return false;}
  if (this.selectedList.length > 0 ) {
    sessionStorage.setItem('setUserAccount',this.data.account.accountId)
    console.log(JSON.stringify(this.data))
    this.Service.updateThing( this.data._links.self.href.split("/")[4], this.data).subscribe(res => {
      this.onCloseEdit.next(true);
      this._bsModalRef.hide();
      this.Service.suceesAlertDialog('Things/Provisioning');
    });
       } else {
      alert('Please Select Things Template');
   }
 }
 createDevicePro(form) {
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
    if(this.dataList[i].name) {
       this.data.metadata[this.dataList[i].name] = this.dataList[i].value;
     }
    

  }
}

console.log(JSON.stringify(this.data));
 

  if (this.selectedList.length > 0 ) {
 
     this.Service.addThing( this.selectedList[0]._links.self.href.split("/")[4]
         , this.data).subscribe(res => {
       this.onClose.next(true);
       this._bsModalRef.hide();
       this.Service.suceesAlertDialog('Device/Provisioning');

     });

        } else {
       alert('Please Select Things Template');
    }
 }
getDetailDeviceProvisioning() {
 this.Service.getDetail(this.Service.BASE_URL+'things/'+this.id).subscribe(res => {
   this.data = res;
  
this.dataList = [];
 if(this.data.metadata){
  let j =0 ;
  for(let i in this.data.metadata){
    if(j == 0){
      this.dataList.push({
        class : 'col-md-6',
        class1: 'col-md-6',
        class5: 'col-md-2',
    
        type: '1',
        class2: 'col-md-6',
        class3: 'col-md-10',
        class4: 'plustbutton',
        name:i,
        value:this.data.metadata[i]
      })
    }else{
      this.dataList.push({
        type: '1',
        class : 'col-md-6',
        class1: 'col-md-6',
        class2: 'col-md-6',
        class3: 'col-md-8' ,
        class4: 'plusbutonafter',
        class5: 'col-md-2',
        name:i,
        value:this.data.metadata[i]
      })
    
    }
    
    j++;
  }
}


});
}

  ngOnInit() {
    this.onClose = new Subject();
    this.onCloseEdit = new Subject();
      this.data = {};

    
    this.geteventTemplate();
    if (this.title === 'false') {
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

    } else {
      this.getDetailDeviceProvisioning();
    }

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
    if (this.eventTemplateList[i]._links.self.href != data._links.self.href) {
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
  closeDialog(){
    this._bsModalRef.hide();
  }
}
