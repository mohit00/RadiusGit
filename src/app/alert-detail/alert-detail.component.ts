import { Component, OnInit } from '@angular/core';
  import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { json } from 'body-parser';
import { AuthService } from '../auth.service';
import { WebserModel } from '../Service.model';
 
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
  constructor(private modalService: BsModalService,private AuthService:AuthService,private WebserModel:WebserModel ) {
    this.dataList = [];
   }
  
  getDetailEvent() { 
    this.ComandId = localStorage.getItem("Id");
    this.AuthService.getDetail( 'alerts/' + this.ComandId).subscribe(res => {
      this.ComandDetail = res;
      console.log(JSON.stringify(res))
    })

     }
     changeStatus(data) { 
     }
   
     addField(data) { 
     }
  ngOnInit() {
 
    this.getDetailEvent();
  }

}
