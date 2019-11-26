import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {AuthService} from '../../auth.service';
import {WebserModel} from '../../Service.model';
@Component({
  selector: 'app-device-dialog',
  templateUrl: './device-dialog.component.html',
  styleUrls: ['./device-dialog.component.scss']
})
export class DeviceDialogComponent implements OnInit {
  constructor(private _bsModalRef: BsModalRef,
              private AuthService: AuthService, private WebserModel: WebserModel ) {
    this.apage = 0;
    this.asize = 5;
    this.asort = 0;
    this.data = {};
    this.aselectedPage = 1;
    this.epage = 0;
    this.esize = 5;
    this.esort = 0;
    this.eselectedPage = 1;
    this.cpage = 0;
    this.csize = 5;
    this.csort = 0;
    this.cselectedPage = 1;
    this.dataList = [{
    class : 'col-md-4',
    class1: 'col-md-4',
    class2: 'col-md-4',
    class3: 'col-md-10',
    class4: 'plustbutton'
   }
  ];
    this.eventselectedList = [];
    this.attributeselectedList = [];
    this.commandselectedList = [];
    // attributeselectedList: any;
    // commandselectedList: any;
    this.data = {templateType: 'nonCommunicable', eventTemplate: [], commandTemplate: [], attributeTemplate: []};
  }
 apage: any;
 asize: any;
 asort: any;
 aselectedList: any = [];
 apageCountArray: any = [];
 aselectedPage: any;
 anextDisabled: any;
 apreDisabled: any;
 apageCount: any;
 epage: any;
 esize: any;
 esort: any;
 eselectedList: any = [];
 epageCountArray: any = [];
 eselectedPage: any;
 enextDisabled: any;
 epreDisabled: any;
 epageCount: any;
 cpage: any;
 csize: any;
 csort: any;
 cselectedList: any = [];
 cpageCountArray: any = [];
 cselectedPage: any;
 cnextDisabled: any;
 cpreDisabled: any;
 cpageCount: any;
  public onClose: Subject<boolean>;
  public onCloseEdit: Subject<boolean>;
  data: any;
  dataList: any;
  eventselectedList: any;
  attributeselectedList: any;
  commandselectedList: any;
 
  eventDetailList: any = [];
  attrDetailList: any = [];  commandDetailList: any = [];
  title: any;
  id: any;
  apagenew: any = 0;
  epagenew: any = 0;
  cpagenew: any = 0;
alldataattr = [];
alldataevent = [];
alldatacommand = [];

  add() {
    this.dataList.push({
      class : 'col-md-4',
      class1: 'col-md-4',

      class2: 'col-md-4',
      class3: 'col-md-7' ,
      class4: 'plusbutonafter'
     } );
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
    this.data.isFreeze = false;
    // eventselectedList: any;
    // attributeselectedList: any;
    // commandselectedList: any;

    if (this.data.templateType === 'Communicable') {
      if (this.eventselectedList.length > 0) {
        this.data.eventTemplate = [];
        for (let i = 0 ; i < this.eventselectedList.length ; i ++) {
          this.data.eventTemplate.push( this.WebserModel.Sevice.BASE_URL4 + 'eventTemplate/' + this.eventselectedList[i].id );
         }
      } else {
        alert('No Event Selected.');
        return false;
      }
      if (this.attributeselectedList.length > 0) {
        this.data.attributeTemplate = [];
        
        for (let i = 0 ; i < this.attributeselectedList.length ; i ++) {
  this.data.attributeTemplate.push(  this.WebserModel.Sevice.BASE_URL4 + 'attributeTemplates/' + this.attributeselectedList[i].id );
 }
      } else {
        alert('No Attribute Selected.');
        return false;
      }
      if (this.commandselectedList.length > 0) {
 for (let i = 0 ; i < this.commandselectedList.length ; i ++) {
  this.data.commandTemplate.push( this.WebserModel.Sevice.BASE_URL4 + 'commandTemplate/' + this.commandselectedList[i].id );
 }
      }
    } else {
      if (this.attributeselectedList.length > 0) {
        this.data.attributeTemplate = [];

        for (let i = 0 ; i < this.attributeselectedList.length ; i ++) {
          this.data.attributeTemplate.push(  this.WebserModel.Sevice.BASE_URL4 + 'attributeTemplates/' + this.attributeselectedList[i].id );
         }
              } else {
                alert('Attribute Requied');
                return false;
              }
    }
    this.data.tenantId = 'radius-PF';
    console.log( (this.data));
    this.AuthService.adddeviceTemplate(this.data).subscribe(res => {
      this.onClose.next(true);

      this._bsModalRef.hide();
      this.AuthService.suceesAlertDialog('Things Template has been successfully Created.' );

      });

  }
  submitUpdate(form) {
    if(form.valid){

    }else {
     for (let inner in form.controls) {
       form.controls[inner].markAsTouched()
   }
    
     return false;}
    this.data.isFreeze = false;
    // eventselectedList: any;
    // attributeselectedList: any;
    // commandselectedList: any;

    if (this.data.templateType === 'Communicable') {
      if (this.eventselectedList.length > 0) {
// tslint:disable-next-line: prefer-for-of
        for (let i = 0 ; i < this.eventselectedList.length ; i ++) {
          this.data.eventTemplate.push(this.eventselectedList[i].id );
         }
      }
      if (this.attributeselectedList.length > 0) {
// tslint:disable-next-line: prefer-for-of
for (let i = 0 ; i < this.attributeselectedList.length ; i ++) {
  this.data.attributeTemplate.push(this.attributeselectedList[i].id );
 }
      }
      if (this.commandselectedList.length > 0) {
// tslint:disable-next-line: prefer-for-of
for (let i = 0 ; i < this.commandselectedList.length ; i ++) {
  this.data.commandTemplate.push(this.commandselectedList[i].id );
 }
      }
    }

    this.data.tenantId = 'radius-PF';
    this.AuthService.updatedeviceTemplate(this.data, this.WebserModel.Sevice.BASE_URL + 'thingTemplates/' + this.id).subscribe(res => {
      this.onCloseEdit.next(true);

      this._bsModalRef.hide();
      this.AuthService.suceesAlertDialog('Things Template has been successfully Updated.' );

      });

  }
  eintialize() {

    if (this.eventDetailList.length > 0) {

    } else {
      if(this.alldataevent.length<5){
        for (let i = 0; i < this.alldataevent.length; i++) {
       
          this.eventDetailList.push(this.alldataevent[i]);
        }
      }else{
        for (let i = 0; i < 5; i++) {
       
          this.eventDetailList.push(this.alldataevent[i]);
        }
      }
     
      if (this.alldataevent.length < 6 ) {

      } else {

        for ( let i = 0 ; i < this.alldataevent.length / 5 ; i++) {
          this.epageCountArray.push(i + 1);

        }

       }
     }
  }
  cintialize() {

    if (this.commandDetailList.length > 0) {

    } else {
      if(this.alldatacommand.length < 5){
        for (let i = 0; i < this.alldatacommand.length; i++) {
          this.commandDetailList.push(this.alldatacommand[i]);
        }
      }else{
        for (let i = 0; i < 5; i++) {
          this.commandDetailList.push(this.alldatacommand[i]);
        }
      }
     
      if (this.alldatacommand.length < 6 ) {

      } else {

        for ( let i = 0 ; i < this.alldatacommand.length / 5 ; i++) {
          this.cpageCountArray.push(i + 1);

        }

       }
     }
  }
  geteventList() {
    this.epagenew =   this.epage / 5;
    this.AuthService.getEventemplatefreeze(this.epagenew, 100, this.esort).subscribe(res => {
 // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < res.length; i++) {
      this.alldataevent.push(res[i]);
    }
    this.eintialize();
    if (this.eventselectedList.length > 0) {
      for (let i = 0 ; i < this.eventselectedList.length ; i++) {
        const indexselected =   this.alldataevent.findIndex( record => record.id === this.eventselectedList[i].id );
        this.alldataevent[indexselected].check = true;

      }
        }

  });
  }

  getattriList() {
    this.apagenew =   this.apage / 5;
    this.AuthService.getAttributeTemplatefreeze(this.apagenew, 100, this.asort).subscribe(res => {
 // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < res.length; i++) {
      this.alldataattr.push(res[i]);
    }
    this.aintialize();
    if (this.attributeselectedList.length > 0) {
         const indexselected =   this.alldataattr.findIndex( record => record.id === this.attributeselectedList[0].id );
         this.alldataattr[indexselected].check = true;
        }

  });
}
  getcommandList() {
    this.cpagenew =   this.cpage / 5;
    this.AuthService.getCommandTemplatefreeze(this.cpagenew, 100, this.csort).subscribe(res => {
 // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < res.length; i++) {
      this.alldatacommand.push(res[i]);
    }
    this.cintialize();
    if (this.commandselectedList.length > 0) {
      for (let i = 0 ; i < this.commandselectedList.length; i++) {
        const indexselected =   this.alldatacommand.findIndex( record => record.id === this.commandselectedList[i].id );
        this.alldatacommand[indexselected].check = true;

      }
        }

  });
  }
  eventselectedListdata(data) {
    data.check = ! data.check;
    if (data.check) {
      this.eventselectedList.push(data);
    } else {
    const index =   this.eventselectedList.findIndex( record => record.id === data.id );

    this.eventselectedList.splice(index, 1);
  }
   }
  attributeselectedListdata(data: any) {
// tslint:disable-next-line: prefer-for-of

    data.check = ! data.check;
    this.attributeselectedList = [];
    if (data.check) {
    this.attributeselectedList.push({id: data.id
    });
  } else {
  const index =   this.attributeselectedList.findIndex( record => record.id === data.id );
  this.attributeselectedList.splice(index, 1);
}
  }
  commandselectedListdata(data) {
    data.check = ! data.check;

    if (data.check) {
      this. commandselectedList.push(data);
    } else {
    const index =   this. commandselectedList.findIndex( record => record.id === data.id );
    this. commandselectedList.splice(index, 1);
  }
  }
  remove(index) {
    this.dataList.splice(index, 1);
  }
  deviceDetail() {
    this.eventselectedList = [];
    this.commandselectedList = [];
    this.attributeselectedList = [];
    this.AuthService.getDetail(this.WebserModel.Sevice.BASE_URL + 'thing-service/thingTemplates/' + this.id).subscribe(res => {
       this.getattriList();
       this.getcommandList();
       this.geteventList();
       this.data = res;
       if (res.eventTemplate) {
// tslint:disable-next-line: prefer-for-of
       for (let i = 0 ; i < res.eventTemplate.length; i++) {
        this.eventselectedList.push({
         id: res.eventTemplate[i].id
        });
       }

     }
       if (res.commandTemplate) {
      // tslint:disable-next-line: prefer-for-of
             for (let i = 0 ; i < res.commandTemplate.length; i++) {
              this.commandselectedList.push({
                id: res.commandTemplate[i].id
                });
             }
           }
       if (res.attributeTemplate) {
        for (let i = 0 ; i < res.attributeTemplate.length; i++) {
          this.attributeselectedList.push({
            id: res.attributeTemplate[i].id
             });
         }

           }
       if (this.commandselectedList.length > 0 ) {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0 ; i < this.commandselectedList.length ; i ++) {
           const indexselected =   this.commandDetailList.findIndex(
              record => record.id === this.commandselectedList[i].id );
           if (indexselected === -1) {} else {
               this.commandDetailList[indexselected].check = true;

              }
         }

        }
       if (this.eventselectedList.length > 0 ) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0 ; i < this.eventselectedList.length ; i ++) {
     const indexselected =   this.eventDetailList.findIndex(
        record => record.id === this.eventselectedList[i].id );
     if (indexselected == -1) {} else {
         this.eventDetailList[indexselected].check = true;
        }
   }
  }

       if (this.attributeselectedList.length > 0) {
// tslint:disable-next-line: prefer-for-of
        for (let i = 0 ; i < this.attributeselectedList.length ; i ++) {
          const indexselectedatt =   this.attrDetailList.findIndex(
             record => record.id === this.attributeselectedList[i].id );
          if (indexselectedatt == -1) {} else {
              this.attributeselectedList[indexselectedatt].check = true;
             }
        }

  }

    });
  }
  public ngOnInit(): void {
      this.onClose = new Subject();
      this.onCloseEdit = new Subject();

      if (this.title === 'false') {
        this.getattriList();
        this.getcommandList();
        this.geteventList();
      } else {
        this.deviceDetail();
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
  aintialize() {
    if (this.attrDetailList.length > 0) {

    } else {
      
        if(this.alldataattr.length < 5){
          for (let i = 0; i < this.alldataattr.length ; i++) {
            this.attrDetailList.push(this.alldataattr[i]);
          }
        }else{
          for (let i = 0; i < 5; i++) {
            this.attrDetailList.push(this.alldataattr[i]);
          }
        }
      
      
      if (this.alldataattr.length < 6 ) {

      } else {

        for ( let i = 0 ; i < this.alldataattr.length / 5 ; i++) {
          this.apageCountArray.push(i + 1);

        }

       }
     }
  }
  aprePage() {
    if (this.apage !== 0) {
      this.apage--;
      this.aselectedPage = this.apage  + 1;
      this.attrDetailList = [];
      if ( this.apage * 5   + 5 <  this.alldataattr.length ) {
                 for (let i = this.apage * 5; i < this.apage * 5   + 5 ; i++  ) {
                 this.attrDetailList.push(this.alldataattr[i]);
                }
              } else {
                for (let i = this.apage * 5; i < this.alldataattr.length ; i++  ) {
                  this.attrDetailList.push(this.alldataattr[i]);
                }
              }

    }
}
aPage(data) {
  this.apage = data - 1;
  this.aselectedPage = this.apage + 1 ;
  this.attrDetailList = [];
  if ( this.apage * 5   + 5 <  this.alldataattr.length ) {
             for (let i = this.apage * 5; i < this.apage * 5   + 5 ; i++  ) {
             this.attrDetailList.push(this.alldataattr[i]);
            }
          } else {
            for (let i = this.apage * 5; i < this.alldataattr.length ; i++  ) {
              this.attrDetailList.push(this.alldataattr[i]);
            }
          }


}

  anextPage() {
    this.apage  = this.apage + 1;
    this.aselectedPage = this.apage + 1 ;

    if (this.apage % 5 == 0) {
  this.getattriList();
} else {
        this.attrDetailList = [];

        if ( this.apage * 5   + 5 <  this.alldataattr.length ) {
           for (let i = this.apage * 5; i < this.apage * 5   + 5 ; i++  ) {
           this.attrDetailList.push(this.alldataattr[i]);
          }
        } else {
          for (let i = this.apage * 5; i < this.alldataattr.length ; i++  ) {
            this.attrDetailList.push(this.alldataattr[i]);
          }
        }
}


  }
  agetClass(data) {
    if (this.aselectedPage === data) {
      return 'active';
    } else {
      return '';
    }
  }

  eprePage() {
    if (this.epage !== 0) {
      this.epage--;
      this.eselectedPage = this.epage  + 1;
      this.eventDetailList = [];
      if ( this.epage * 5   + 5 <  this.alldataevent.length ) {
                 for (let i = this.epage * 5; i < this.epage * 5   + 5 ; i++  ) {
                 this.eventDetailList.push(this.alldataevent[i]);
                }
              } else {
                for (let i = this.epage * 5; i < this.alldataevent.length ; i++  ) {
                  this.eventDetailList.push(this.alldataevent[i]);
                }
              }

    }
}
ePage(data) {
  this.epage = data - 1;
  this.eselectedPage = this.epage + 1 ;
  this.eventDetailList = [];
  if ( this.epage * 5   + 5 <  this.alldataevent.length ) {
             for (let i = this.epage * 5; i < this.epage * 5   + 5 ; i++  ) {
             this.eventDetailList.push(this.alldataevent[i]);
            }
          } else {
            for (let i = this.epage * 5; i < this.alldataevent.length ; i++  ) {
              this.eventDetailList.push(this.alldataevent[i]);
            }
          }
}

  enextPage() {
    this.epage  = this.epage + 1;
    this.eselectedPage = this.epage + 1 ;

    if (this.epage % 5 == 0) {
  this.geteventList();
} else {
        this.eventDetailList = [];

        if ( this.epage * 5   + 5 <  this.alldataevent.length ) {
           for (let i = this.epage * 5; i < this.epage * 5   + 5 ; i++  ) {
           this.eventDetailList.push(this.alldataevent[i]);
          }
        } else {
          for (let i = this.epage * 5; i < this.alldataevent.length ; i++  ) {
            this.eventDetailList.push(this.alldataevent[i]);
          }
        }
}


  }
  egetClass(data) {
    if (this.eselectedPage === data) {
      return 'active';
    } else {
      return '';
    }
  }


  cprePage() {
    if (this.cpage !== 0) {
      this.cpage--;
      this.cselectedPage = this.cpage  + 1;
      this.commandDetailList = [];
      if ( this.cpage * 5   + 5 <  this.alldatacommand.length ) {
                 for (let i = this.cpage * 5; i < this.cpage * 5   + 5 ; i++  ) {
                 this.commandDetailList.push(this.alldatacommand[i]);
                }
              } else {
                for (let i = this.cpage * 5; i < this.alldatacommand.length ; i++  ) {
                  this.commandDetailList.push(this.alldatacommand[i]);
                }
              }

    }
}
cPage(data) {
  this.cpage = data - 1;
  this.cselectedPage = this.cpage + 1 ;
  this.commandDetailList = [];
  if ( this.cpage * 5   + 5 <  this.alldatacommand.length ) {
             for (let i = this.cpage * 5; i < this.cpage * 5   + 5 ; i++  ) {
             this.commandDetailList.push(this.alldatacommand[i]);
            }
          } else {
            for (let i = this.cpage * 5; i < this.alldatacommand.length ; i++  ) {
              this.commandDetailList.push(this.alldatacommand[i]);
            }
          }
}

 cnextPage() {
    this.cpage  = this.cpage + 1;
    this.cselectedPage = this.cpage + 1 ;

    if (this.cpage % 5 == 0) {
  this.getcommandList();
} else {
        this.commandDetailList = [];

        if ( this.cpage * 5   + 5 <  this.alldatacommand.length ) {
           for (let i = this.cpage * 5; i < this.cpage * 5   + 5 ; i++  ) {
           this.commandDetailList.push(this.alldatacommand[i]);
          }
        } else {
          for (let i = this.cpage * 5; i < this.alldatacommand.length ; i++  ) {
            this.commandDetailList.push(this.alldatacommand[i]);
          }
        }
}


  }
  cgetClass(data) {
    if (this.cselectedPage === data) {
      return 'active';
    } else {
      return '';
    }
  }

}
