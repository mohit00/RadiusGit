import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {AuthService} from '../../../auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-preferences-things-dialog',
  templateUrl: './preferences-things-dialog.component.html',
  styleUrls: ['./preferences-things-dialog.component.scss']
})
export class PreferencesThingsDialogComponent implements OnInit {
  public onClose: Subject<boolean>;
  public onCloseEdit: Subject<boolean>;
  data: any;
  dataList: any = [];;
  title: any;
  id: any;
// tslint:disable-next-line: variable-name
  constructor(private _bsModalRef: BsModalRef,
// tslint:disable-next-line: no-shadowed-variable
              private AuthService: AuthService ) {
  }
  add() {  
  this.dataList.push({
    type: '1',
    class : 'col-md-3',
    class1: 'col-md-6',
    class2: 'col-md-6',
    class3: 'col-md-7' ,
    class4: 'plusbutonafter',
    class5: 'col-md-2',
   } );
 
    }
  submitCreate(form) {
    if(form.valid){

    }else {
     for (let inner in form.controls) {
       form.controls[inner].markAsTouched()
   }
    
     return false;
    
    
    }

    this.data.propertyMap = {};
  if (this.dataList.length > 0 ) {
// tslint:disable-next-line: prefer-for-of
  for (let i = 0 ; i < this.dataList.length ; i++) {
    if(this.dataList[i].name) {
       this.data.propertyMap[this.dataList[i].name] = this.dataList[i].value;
     } 
  }
}
this.AuthService.preferenceThingCreate(this.data).subscribe(res=>{
  this.AuthService.suceesAlertDialog('Preference Thing has been successfully created.' );
  this.onClose.next(true);
  this._bsModalRef.hide();
})
console.log(JSON.stringify(this.data))
  }
  submitUpdate(form){ 
    
    if(form.valid){

    }else {
     for (let inner in form.controls) {
       form.controls[inner].markAsTouched()
   }
    
     return false;
    
    
    }

    this.data.propertyMap = {};
  if (this.dataList.length > 0 ) {
// tslint:disable-next-line: prefer-for-of
  for (let i = 0 ; i < this.dataList.length ; i++) {
    if(this.dataList[i].name) {
       this.data.propertyMap[this.dataList[i].name] = this.dataList[i].value;
     } 
  }
}
this.AuthService.preferenceThingUpdate(this.data,this.id).subscribe(res=>{
  this.AuthService.suceesAlertDialog('Preference Thing has been successfully created.' );
  this.onClose.next(true);
  this._bsModalRef.hide();
})
  }
  remove(index) {
    this.dataList.splice(index, 1);
  }
  headerTitle:any;
  public ngOnInit(): void {
      this.onClose = new Subject();
      this.onCloseEdit = new Subject();

      if (this.title == 'false') {
        this.headerTitle = 'Thing Preferences';
        this.dataList = [{
          class : 'col-md-3',
          class1: 'col-md-6',
          class5: 'col-md-2',

          type: '1',
          class2: 'col-md-6',
          class3: 'col-md-10',
          class4: 'plustbutton'
           }
      ];
        this.data = {};
      } else {
        this.headerTitle = 'Update Thing Preferences';

         this.data = {};
        this.AuthService.getDetail('thingpreferences/'+this.id).subscribe(res=> {
          console.log(JSON.stringify(res))
           this.data = res;
           this.dataList = [{
            class : 'col-md-3',
            class1: 'col-md-6',
            class5: 'col-md-2',
      
            type: '1',
            class2: 'col-md-6',
            class3: 'col-md-10',
            class4: 'plustbutton'
             }
        ];

           if(this.data.propertyMap){
            let j =0 ;
            for(let i in this.data.propertyMap){
              
              if(j == 0){
                this.dataList = [];
                this.dataList.push({
                  class : 'col-md-6',
                  class1: 'col-md-6',
                  class5: 'col-md-2',
              
                  type: '1',
                  class2: 'col-md-6',
                  class3: 'col-md-10',
                  class4: 'plustbutton',
                  name:i,
                  value:this.data.propertyMap[i]
                })
                j=j+1;
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
                  value:this.data.propertyMap[i]
                })
              
              }
          
        } 
       
  }else{
    this.dataList = [{
      class : 'col-md-3',
      class1: 'col-md-6',
      class5: 'col-md-2',

      type: '1',
      class2: 'col-md-6',
      class3: 'col-md-10',
      class4: 'plustbutton'
       }
  ];
  }
        })
      }
    }
  public onConfirm(): void {
      this.onClose.next(true);
      this._bsModalRef.hide();
  }

   onCancel() {
    alert("dsa")
          this._bsModalRef.hide();
  }
}
