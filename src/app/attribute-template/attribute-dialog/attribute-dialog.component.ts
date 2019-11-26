import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {AuthService} from '../../auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-attribute-dialog',
  templateUrl: './attribute-dialog.component.html',
  styleUrls: ['./attribute-dialog.component.scss']
})
export class AttributeDialogComponent implements OnInit {
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
    class1: 'col-md-3',
    class2: 'col-md-4',
    class3: 'col-md-7' ,
    class4: 'plusbutonafter',
    class5: 'col-md-2',
   } );
  console.log(JSON.stringify(this.dataList));

    }
  submitCreate(form) {
    if(form.valid){

    }else {
     for (let inner in form.controls) {
       form.controls[inner].markAsTouched()
   }
    
     return false;}
 
// tslint:disable-next-line: prefer-for-of
  if(this.dataList[0].name && this.dataList[0].type != 1){

  }else{
    alert("No Attribute added");
    return false;
  }
    this.data.attributeFields = this.dataList;
    this.data.lastUpdatedBy = 'admin';
    this.data.tenantId = 'Radius-PF';

    this.data.isFreeze = false;
      console.log(JSON.stringify(this.data));
     this.AuthService.addAttributeTemplate(this.data).subscribe(res => {
      this.onClose.next(true);

       this._bsModalRef.hide();
        this.AuthService.suceesAlertDialog('Attribute has been successfully created.' );
       });
  }
  submitUpdate(form){
    if(form.valid){

    }else {
     for (let inner in form.controls) {
       form.controls[inner].markAsTouched()
   }
    
     return false;}
    for (let i = 0; i < this.dataList.length; i++) {
      this.dataList[i].isIdentifier = true;
    }
    this.data.attributeFields = this.dataList;
    this.data.lastUpdatedBy = 'admin';
    this.data.tenantId = 'Radius-PF';

    this.data.isFreeze = false;
    console.log(JSON.stringify(this.data));
    this.AuthService.updateAttributeTemplate(this.data,this.id).subscribe(res => {
      this.onCloseEdit.next(true);

      this._bsModalRef.hide();
      this.AuthService.suceesAlertDialog('Attribute has been successfully Updated.' );
      });
  }
  remove(index) {
    this.dataList.splice(index, 1);
  }
  headerTitle:any;
  public ngOnInit(): void {
      this.onClose = new Subject();
      this.onCloseEdit = new Subject();

      if (this.title == 'false') {
        this.headerTitle = 'Add Properties';
        this.dataList = [{
          class : 'col-md-3',
          class1: 'col-md-3',
          class5: 'col-md-2',

          type: '1',
          class2: 'col-md-4',
          class3: 'col-md-10',
          class4: 'plustbutton'
           }
      ];
        this.data = {};
      } else {
        this.headerTitle = 'Update Attribute';

         this.data = {};
        this.AuthService.getDetail(this.id).subscribe(res=> {
          console.log(JSON.stringify(res));
          this.data = res;
          this.dataList = res.attributeFields;
          for(var i =0 ;i< this.dataList.length;i++){
            if(i ==0){
              this.dataList[i].class = 'col-md-3';
              this.dataList[i].class1 = 'col-md-3';
              this.dataList[i].class2 = 'col-md-4';
              this.dataList[i].class3 = 'col-md-10';
              this.dataList[i].class5='col-md-2',

              this.dataList[i].class4 = 'plustbutton';
            }else{
          

              this.dataList[i].class = 'col-md-3';
              this.dataList[i].class1 = 'col-md-3';
              this.dataList[i].class2 = 'col-md-4';
              this.dataList[i].class3 = 'col-md-7';
              this.dataList[i].class5 = 'col-md-2';

              this.dataList[i].class4 = 'plusbutonafter';
   
            }
           
          }
         
        })

      }
  }

  public onConfirm(): void {
      this.onClose.next(true);
      this._bsModalRef.hide();
  }

  public onCancel(): void {
      this.onClose.next(false);
      this._bsModalRef.hide();
  }
}
