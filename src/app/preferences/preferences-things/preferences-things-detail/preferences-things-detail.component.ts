import { Component, OnInit } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap';
import { AuthService } from 'src/app/auth.service';
import { WebserModel } from 'src/app/Service.model';
@Component({
  selector: 'app-preferences-things-detail',
  templateUrl: './preferences-things-detail.component.html',
  styleUrls: ['./preferences-things-detail.component.scss']
})
export class PreferencesThingsDetailComponent implements OnInit {
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
    this.AuthService.getDetail( '/thingpreferences/' + this.ComandId).subscribe(res => {
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
