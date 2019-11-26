import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { WebserModel } from '../Service.model';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent implements OnInit {
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
  submitUpdate() { 
  }
  submitCreate() { 
     let dataJson = {name:'',description:'',actions:[],notActions:[],roleId:''};
    for(var i =0 ;i<this.AccessServiceData.length;i++){
      if(this.AccessServiceData[i].name =="Things"){
        if( this.AccessServiceData[i].check == "true"){
          dataJson.actions.push("Platform.thingService.*"  )
        }else{
          dataJson.actions.push("Platform.thingService.read"  )

        }
        for(var  j=0 ;j<this.AccessServiceData[i].ToReject.length;j++){
 
          if( this.AccessServiceData[i].ToReject[j].check ){
           }else{
            dataJson.notActions.push("Platform.thingService.migration" );
  
          }
        }
      }
      if(this.AccessServiceData[i].name =="User"){
        if( this.AccessServiceData[i].check == "true"){
          dataJson.actions.push("Platform.userService.*"  )
        }else{
          dataJson.actions.push("Platform.userService.read"  )

        }
        for(var  j=0 ;j<this.AccessServiceData[i].ToReject.length;j++){
          if( this.AccessServiceData[i].ToReject[j].check){
           }else{
            dataJson.notActions.push("Platform.userService.migration" );
  
          }
        }
      }
      if(this.AccessServiceData[i].name =="Account"){
        if( this.AccessServiceData[i].check == "true"){
          dataJson.actions.push("Platform.accountService.*"  )
        }else{
          dataJson.actions.push("Platform.accountService.read"  )

        }
        for(var  j=0 ;j<this.AccessServiceData[i].ToReject.length;j++){
          if( this.AccessServiceData[i].ToReject[j].check ){
           }else{
            dataJson.notActions.push("Platform.accountService.migration" );
  
          }
        }
      }
    
    }
    dataJson.name =  this.data.name
    dataJson.roleId =  this.data.roleId

    dataJson.description =  this.data.description
     this.AuthService.createRole(dataJson).subscribe(res=>{
      this._bsModalRef.hide();
      this.onClose.next(true);
      this.AuthService.suceesAlertDialog("Role Created Successfully");
    })
  }
   
   
   
 
   AccessServiceData:any = [{
     name : 'Things',
    ToReject:[{
      name:'Migrate'
    }]
   },{
     name:'Account',
     ToReject:[{
      name:'Migrate'
     }]
   },{
     name:'User',
     ToReject:[{
      name:'Migrate'
     }]
   }]
   toggel(index,eve){
     console.log( eve.target.value)
    this.AccessServiceData[index].check = eve.target.value;
     for (var i = 0;i<this.AccessServiceData[index].ToReject.length;i++){
      this.AccessServiceData[index].ToReject[i].check = true;
     }
   }
  getAttributeList() {
      this.pagenew =   this.page / 5;
      this.AuthService.getAttributeTemplatefreeze(this.pagenew, 100, this.sort).subscribe(res => {
// tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < res.length; i++) {
        this.alldata.push(res[i]);
      }
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
  }
  public ngOnInit(): void {
      this.onClose = new Subject();
      this.onCloseEdit = new Subject();
      if (this.title === 'false') { 
  } else { 
  }
    }
  public onConfirm(): void {
      this.onClose.next(true);
      this._bsModalRef.hide();
  }
  tooglerow(data){
     
data = !data;
  }
  public onCancel(): void {
      this.onClose.next(false);
      this._bsModalRef.hide();
  }

 
}
