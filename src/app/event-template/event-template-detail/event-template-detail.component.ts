import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import { Router } from '@angular/router';
  import {WebserModel} from '../../Service.model'
@Component({
  selector: 'app-event-template-detail',
  templateUrl: './event-template-detail.component.html',
  styleUrls: ['./event-template-detail.component.scss']
})
export class EventTemplateDetailComponent implements OnInit {
eventId: any;
eventDetail: any;
data:any;
collabsableDetail:any = true;
collabsableHeader:any = true;
  constructor(private  Service: AuthService,private route:Router,private WebserModel:WebserModel) {
    this.data = {};
   }
   
   changeFreeze() {
    
    this.eventDetail.freeze = this.data.check;
    let datasend = {
      freeze:this.data.check
    }
    this.Service.freezeData(datasend, this.WebserModel.Sevice.BASE_URL+'eventTemplates/'+ this.eventId).subscribe(res => {
      this.Service.suceesAlertDialog('Event has been successfully Freezed.' );

      this.route.navigate(['Event/Prototype']);
     });
  }
  getDetailEvent() {
 this.eventId  =  this.Service.getId;
 this.Service.getDetail(this.WebserModel.Sevice.BASE_URL + 'thing-service/eventTemplates/'+this.eventId).subscribe(res=>{
    this.eventDetail = res;
   this.data.check = this.eventDetail.freeze
 });
  }
  ngOnInit() {
    this.getDetailEvent();
  }

}
