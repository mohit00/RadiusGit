import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-attribute-template-detail',
  templateUrl: './attribute-template-detail.component.html',
  styleUrls: ['./attribute-template-detail.component.scss']
})
export class AttributeTemplateDetailComponent implements OnInit {
  eventId: any;
  eventDetail: any;
  data: any;
  isCollapsed = false;
  collabsableHeader:any = true;
  collabsableDetail:any = true;

  
    constructor(private  Service: AuthService, private route: Router) {
      this.data = {};
    }
    changeFreeze() {
      this.eventDetail.freeze = this.data.check;
      this.Service.freezeData(this.eventDetail, this.eventId).subscribe(res => {
        this.Service.suceesAlertDialog('Properties has been successfully Freezed.' );

        this.route.navigate(['Properties/Prototype']);
       });
    }
    getDetailEvent() {
   this.eventId  =  this.Service.getId;
   this.Service.getDetail(this.eventId).subscribe(res => {
      this.eventDetail = res;
     this.data.check = this.eventDetail.freeze;
   });
    }
    ngOnInit() {
      this.getDetailEvent();
    }
  }