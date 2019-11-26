import { Component, OnInit } from '@angular/core';
  import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { json } from 'body-parser';
 @Component({
  selector: 'app-alert-detail',
  templateUrl: './alert-detail.component.html',
  styleUrls: ['./alert-detail.component.scss']
})
export class AlertDetailComponent implements OnInit {
  collabsablemetaStatus: any = false;
  collabsableIdPro: any = false;
  collabsablePro: any = false;
  collabsableHeader: any = true;
  ComandId: any;
  ComandDetail: any;
  bsModalRef: BsModalRef;
  dataList: any;
  thingsPropertiesIdentifier: any;
  thingsProperties: any;
// tslint:disable-next-line: no-shadowed-variable
  constructor(private modalService: BsModalService, ) {
    this.dataList = [];
   }
  
  getDetailEvent() { 
    
     }
     changeStatus(data) { 
     }
   
     addField(data) { 
     }
  ngOnInit() {
 
    this.getDetailEvent();
  }

}
