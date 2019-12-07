import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import {AuthService} from '../auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-field-dialog',
  templateUrl: './add-field-dialog.component.html',
  styleUrls: ['./add-field-dialog.component.scss']
})
export class AddFieldDialogComponent implements OnInit {

  constructor(private _bsModalRef: BsModalRef, private Service: AuthService) {
    this.onClose = new Subject();

   }
   close(){
     this._bsModalRef.hide();
   }
  dataList: any;
  id: any;
  data: any;
  dataDetail: any;
  public onClose: Subject<boolean>;
  metadata: any;
  selectedList:any = [];
  getDetailDeviceProvisioning() {

      this.data = this.dataDetail;
      this.dataList = [];
      this.dataList.push({
        class : 'col-md-6',
        class1: 'col-md-6',
        class5: 'col-md-2',

        type: '1',
        class2: 'col-md-6',
        class3: 'col-md-10',
        class4: 'plustbutton',
       });

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
  ngOnInit() {
    this.getDetailDeviceProvisioning();
  }
  updateDevicePro() {
    this.metadata = {};
    if (this.dataList.length > 0 ) {
  // tslint:disable-next-line: prefer-for-of
    for (let i = 0 ; i < this.dataList.length ; i++) {
      if (this.dataList[i].name) {
        this.metadata[this.dataList[i].name] = this.dataList[i].value;
       }
    }
  }
  sessionStorage.setItem("setUserAccount",this.data.account.accountId);

  
    this.Service.addMetaData(this.data._links.self.href.split('/')[4], this.metadata).subscribe(res => {
      this._bsModalRef.hide();
      this.Service.suceesAlertDialog('Metadata Successfully added.');

      this.onClose.next(true);

   });
}

}
