import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import {AssignDialogComponent} from '../assign-dialog/assign-dialog.component'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit { eventId: any;
  eventDetail: any;
  data: any;
  isCollapsed = false;
  collabsableHeader:any = true;
  collabsableDetail:any = true;
  bsModalRef: BsModalRef;
    constructor(private modalService: BsModalService,private  Service: AuthService, private route: Router) {
      this.data = {};
    }
    AssignRole(data){
      const initialState = {
        title: 'false',
        data
      };
      this.bsModalRef = this.modalService.show(AssignDialogComponent,  {initialState, class: 'gray modal-md' });
      this.bsModalRef.content.onClose.subscribe(result => {
        console.log('results', result);
        this.getDetailEvent();
  });
      // this.Service.assignUnassugnRole(data).subscribe(res=>{
      // })
    }
    getDetailEvent() {
   this.eventId  =  this.Service.getId;
   this.Service.getDetail('users/'+this.eventId).subscribe(res => {
     console.log(JSON.stringify(res));
      this.eventDetail = res;
     this.data.check = this.eventDetail.freeze;
   });
    }
    ngOnInit() {
      this.getDetailEvent();
    }
  }