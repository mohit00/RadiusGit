import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AttributeDialogComponent} from '../attribute-template/attribute-dialog/attribute-dialog.component';
import {CommandDialogComponent} from '../command-template/command-dialog/command-dialog.component';
import {EventDialogComponent} from '../event-template/event-dialog/event-dialog.component';
import {DeviceDialogComponent} from '../device-template/device-dialog/device-dialog.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AuthService } from '../auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bsModalRef: BsModalRef;
   constructor(private route: Router, private modalService: BsModalService,private Service:AuthService) {
      this.Service.loaderCheck.emit("show");
    }
   addFunction(data) {
// tslint:disable-next-line: triple-equals
const initialState = {
   title: 'false',
 };
     if (data == 1) {
        
      this.bsModalRef = this.modalService.show(AttributeDialogComponent,  {initialState, class: 'gray modal-lg' });
      this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
   });

// tslint:disable-next-line: triple-equals
     } else if (data == 3) {
      this.bsModalRef = this.modalService.show(EventDialogComponent,  {initialState, class: 'gray modal-lg' });

      this.bsModalRef.content.onClose.subscribe(result => {
       console.log('results', result);
   });
// tslint:disable-next-line: triple-equals
     } else if (data == 4) {
      this.bsModalRef = this.modalService.show(DeviceDialogComponent,  { initialState,class: 'gray modal-lg' });

      this.bsModalRef.content.onClose.subscribe(result => {
       console.log('results', result);
   });
// tslint:disable-next-line: triple-equals
     } else if (data == 5) {
      this.bsModalRef = this.modalService.show(CommandDialogComponent,  { initialState,class: 'gray modal-lg' });
      this.bsModalRef.content.onClose.subscribe(result => {
       console.log('results', result);
   });
     }

   }
   listFunction(data) {
    this.route.navigate([data]);
   }
  ngOnInit() {
       }
    }


