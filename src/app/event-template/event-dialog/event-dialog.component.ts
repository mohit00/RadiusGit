import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {AuthService} from '../../auth.service';
import {WebserModel} from '../../Service.model';
@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {
  constructor(private WebserModel: WebserModel, private _bsModalRef: BsModalRef, private AuthService: AuthService ) {
    this.selectedList = [];
    this.data = {};
    this.page = 0;
    this.size = 5;
      this.sort = 'createdOn,Desc';
;
    this.selectedPage = 1;
  }

  public onClose: Subject<boolean>;
  public onCloseEdit: Subject<boolean>;

  headerTitle: String;
  data: any;
  dataList: any;
  displayList: any = [];
  selectedList: any;
  title: any;
  id: any;
  pageCountArray: any = [];
 selectedPage: any;
 nextDisabled: any;
preDisabled: any;
pageCount: any;
page: any;
  size: any;
  sort: any;
  alldata: any = [];
  pagenew: any = 0;
  add() {
    this.dataList.push({
      class : 'col-md-4',
      class1: 'col-md-4',

      class2: 'col-md-4',
      class3: 'col-md-7' ,
      class4: 'plusbutonafter'
     } );
  }
  selectedListdata(data: any) {
// tslint:disable-next-line: prefer-for-of
    for (let i = 0 ; i < this.alldata.length; i++) {
      if (this.alldata[i].id !== data.id) {
        this.alldata[i].check =  false;
        }
       }
    data.check = ! data.check;
    this.selectedList = [];
    if (data.check) {
      this.selectedList.push({id: data.id
      });
    } else {
    const index =   this.selectedList.findIndex( record => record.id === data.id );
    this.selectedList.splice(index, 1);
  }
    }
  submitUpdate(form) {
    if(form.valid){

    }else {
     for (let inner in form.controls) {
       form.controls[inner].markAsTouched()
   }
    
     return false;}
    this.data.createdBy = 'admin';
    this.data.lastUpdatedBy = 'admin';
    this.data.tenantId = 'Radius-PF';
    this.data.isFreeze = false;
    if (this.data.templateType === 'schemaDefine') {
      if (this.selectedList.length > 0) {
// tslint:disable-next-line: prefer-for-of
         for (let i = 0 ; i < this.selectedList.length ; i ++) {
           this.data.eventFields = this.WebserModel.Sevice.BASE_URL4+'attributeTemplates/' +  this.selectedList[i].id ;
         }
      } else {
        alert('No Attribute selected');
        return false;
      }
    }
    this.AuthService.updateEventTemplate(this.data, this.WebserModel.Sevice.BASE_URL + 'eventTemplates/' + this.id).subscribe(res => {
      this._bsModalRef.hide();
      this.onCloseEdit.next(true);
      this.AuthService.suceesAlertDialog('Event has been successfully created.' );
    });
  }
  submitCreate(form) {
    if(form.valid){

    }else {
     for (let inner in form.controls) {
       form.controls[inner].markAsTouched()
   }
    
     return false;}
    this.data.createdBy = 'admin';
    this.data.lastUpdatedBy = 'admin';
    this.data.tenantId = 'Radius-PF';
    this.data.isFreeze = false;
    if (this.data.templateType === 'schemaDefine') {
      if (this.selectedList.length > 0) {
// tslint:disable-next-line: prefer-for-of
        for (let i = 0 ; i < this.selectedList.length ; i ++) {
           this.data.eventFields = this.WebserModel.Sevice.BASE_URL4+'attributeTemplates/' + this.selectedList[i].id ;
         }
      } else {
        alert('No Attribute selected');
        return false;
      }
    }
    this.AuthService.addEventTemplate(this.data).subscribe(res => {
      this._bsModalRef.hide();
      this.onClose.next(true);

      this.AuthService.suceesAlertDialog('Event has been successfully created.' );
    });
  }
  remove(index) {
    this.dataList.splice(index, 1);
  }
  intialize() {
    if (this.displayList.length > 0) {

    } else {
      if(this.alldata.length < 5){
        for (let i = 0; i < this.alldata.length; i++) {
          this.displayList.push(this.alldata[i]);
        }
      }else{
        for (let i = 0; i < 5; i++) {
          this.displayList.push(this.alldata[i]);
        }
      }
     
      if (this.alldata.length < 6 ) {

      } else {

        for ( let i = 0 ; i < this.alldata.length / 5 ; i++) {
          this.pageCountArray.push(i + 1);

        }
       }
    }
  }
  prePage() {
    if (this.page !== 0) {
      this.page--;
      this.selectedPage = this.page  + 1;
      this.displayList = [];
      if ( this.page * 5   + 5 <  this.alldata.length ) {
                 for (let i = this.page * 5; i < this.page * 5   + 5 ; i++  ) {
                 this.displayList.push(this.alldata[i]);
                }
              } else {
                for (let i = this.page * 5; i < this.alldata.length ; i++  ) {
                  this.displayList.push(this.alldata[i]);
                }
              }

    }
}
Page(data) {
  this.page = data - 1;
  this.selectedPage = this.page + 1 ;
  this.displayList = [];
  if ( this.page * 5   + 5 <  this.alldata.length ) {
             for (let i = this.page * 5; i < this.page * 5   + 5 ; i++  ) {
             this.displayList.push(this.alldata[i]);
            }
          } else {
            for (let i = this.page * 5; i < this.alldata.length ; i++  ) {
              this.displayList.push(this.alldata[i]);
            }
          }


}

  nextPage() {
    this.page  = this.page + 1;
    this.selectedPage = this.page + 1 ;

    if (this.page % 5 == 0) {
  this.getAttributeList();
} else {
        this.displayList = [];

        if ( this.page * 5   + 5 <  this.alldata.length ) {
           for (let i = this.page * 5; i < this.page * 5   + 5 ; i++  ) {
           this.displayList.push(this.alldata[i]);
          }
        } else {
          for (let i = this.page * 5; i < this.alldata.length ; i++  ) {
            this.displayList.push(this.alldata[i]);
          }
        }
}


  }
  getAttributeList() {
      this.pagenew =   this.page / 5;
      this.AuthService.getAttributeTemplatefreeze(this.pagenew, 100, this.sort).subscribe(res => {
// tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < res.length; i++) {
        this.alldata.push(res[i]);
      }
      this.intialize();
      if (this.selectedList.length > 0) {
           const indexselected =   this.alldata.findIndex( record => record.id === this.selectedList[0].id );
           this.alldata[indexselected].check = true; 
          }
    //   if (res.page) {
    //     this.pageCount =  res.page.totalPages;

    //     if (this.pageCount == this.page + 1) {
    //       this.nextDisabled = true;
    //     } else {
    //       this.nextDisabled = false;
    //     }
    //     if (this.page   == 0) {
    //       this.preDisabled = true;
    //     } else {
    //       this.preDisabled = false;

    //     }
    //   }
    //   this.pageCountArray = [];
    //   for (let i = 0 ; i < this.pageCount; i++) {
    //   this.pageCountArray.push(i + 1);
    // }
    //   if (this.selectedList.length > 0) {
    //  const indexselected =   this.displayList.findIndex( record => record._links.self.href === this.selectedList[0]._links.self.href );

    //  this.displayList[indexselected].check = true;


    // }

    });

  }
  eventDetail() {
     this.AuthService.getDetail(this.WebserModel.Sevice.BASE_URL + 'thing-service/eventTemplates/' + this.id).subscribe(res => {
      this.data = res;
      this.selectedList.push({
        id : res.eventFields.id
      });
      this.getAttributeList();

    });
  }
  public ngOnInit(): void {
      this.onClose = new Subject();
      this.onCloseEdit = new Subject();
      if (this.title === 'false') {
        this.getAttributeList();

        this.headerTitle = 'Add Event';
        this.data = {templateType: 'Schemafree'};
  } else {
    this.getAttributeList();
    this.headerTitle = 'Update Event';

    this.eventDetail();
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

  getClass(data) {
    if (this.selectedPage === data) {
      return 'active';
    } else {
      return '';
    }
  }
}
