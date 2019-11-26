import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BsModalRef , BsModalService} from 'ngx-bootstrap/modal';
import {AuthService} from '../auth.service';
import {DeviceDialogComponent} from './device-dialog/device-dialog.component';
import { DatePipe } from '@angular/common';
import {WebserModel} from '../Service.model';
declare interface TableData {
  headerRow: any ;
  dataRows: string[][];
}
@Component({
  selector: 'app-device-template',
  templateUrl: '../table/table.html',
  styleUrls: ['../table/table.scss']
})
export class DeviceTemplateComponent implements OnInit {
constructor(private WebserModel: WebserModel, private modalService: BsModalService, private service: AuthService) {
   this.pageCountArray = [];
   this.selectedPage = 1;
   this.page = 0;
   this.size =     this.service.sizetable;
     this.sort = 'createdOn,Desc';
;
   this.header = [  {
    name: '  NAME',
    width: 10,
    sort:'0'
  }, {
    name: '  DESCRIPTION',
    width: 20,
    sort:'0'
  }, {
    name: 'Is LOCK',
    width: 5
  }, {
    name: 'Created DATE',
    width: 12,
    sort:1
  },{
    name: 'Created By',
    width: 10,
    sort:'0'
  },
  {
    name: 'ACTION',
    width: 10
  }
 ];

  this.keyData = [  'name', 'description', 'freeze', 'createdOn','createdBy', 'action'];
 }
  public tableData1: TableData;
  pipe = new DatePipe('en-US');
  bsModalRef: BsModalRef;
  pageCount: any;
  displayList: any;
  nextDisabled: any;
  preDisabled: any;
  pageCountArray: any;
  selectedPage: any;
  page: any;
  size: any;
  sort: any;
// tslint:disable-next-line: ban-types
  title: String;
rowSpan: number;
header: any;
keyData: any;
actionData: any;
pageInfo: any;
    showpagi = true;
    advanceSearch = false;
open() {
  const initialState = {
    title: 'false',

  };
  this.bsModalRef = this.modalService.show(DeviceDialogComponent,  {initialState, class: 'gray modal-lg' });

  this.bsModalRef.content.onClose.subscribe(result => {
     this.getComandList();
     console.log('results', result);
});

}
getData(data, key , index) {
  if (key) {
    if (key === 'freeze') {
      if (data[key] === true) {
       return '<i class="fa fa-lock" aria-hidden="true"></i>';

     } else {
       return '<i class="fa fa-unlock" aria-hidden="true"></i>';
     }
   } else {

    }
    if (key === 'action') {
      this.actionData =  `<i class="fa fa-eyes" aria-hidden="true"></i>
      <i class="fa fa-eye" aria-hidden="true"></i>
      <i class="fa fa-pencil" aria-hidden="true"></i>
      <i class="fa fa-trash" aria-hidden="true"></i>

      `;
      return this.actionData;
    } else {}
    if (data[key]) {
 // tslint:disable-next-line: triple-equals
      if ( isNaN(new Date(data[key]).getTime()  ) ) {
       return data[key];
     } else {

        if (Number.isInteger((data[key]))) {
          return data[key];
          } else {
            if (typeof data[key] === 'string' || data[key] instanceof String) {
              if ( typeof data[key].substring( 0 , 1)  === 'string' || data[key] instanceof String ) {
// tslint:disable-next-line: radix
                if (Number.isInteger(parseInt(data[key].substring( 0 , 1)) )) {
                  try {
                   JSON.parse(data[key]);
                   return data[key];
                   } catch (err) {
                      // var _date = $filter('date')(new Date(input), 'MM/dd/yyyy');
                        return this.pipe.transform(data[key], 'MMM d, y, h:mm:ss a');
                   }


                } else {
                  return data[key];
                }


              } else if
              (data[key].substring( 0 , 3 ) == 'ERN' || data[key].substring( 0 , 3 ) == 'MRN' || data[key].substring( 0 , 3 ) == 'SSC' || data[key].substring( 0 , 3 ) == 'Pro' || data[key].substring( 0 , 3 ) == 'Opp' || data[key].substring( 0 , 3 ) == 'Equ' || data[key].substring( 0 , 1 ) == 'C' || data[key].substring( 0 , 1 ) == 'P') {
                 return data[key];
              } else {
                  // var _date = $filter('date')(new Date(input), 'MM/dd/yyyy');
                  return this.pipe.transform(data[key], 'MMM d, y, h:mm:ss a');

              }
            } else {
              if (data[key] == true) {
                   return 'YES';
                 } else {

                // var _date = $filter('date')(new Date(input), 'MM/dd/yyyy');
                return this.pipe.transform(data[key], 'MMM d, y, h:mm:ss a');
              }


            }

          }



     }

        } else {
          return '';
        }
    // this.pipe.transform(data[key], 'short');
    return data[key];

  } else {
    return '';
  }
}
getComandList() {
  this.service.getdeviceTemplate(this.page, this.size, this.sort).subscribe(res => {
    this.pageInfo = res.page;

 
  
    this.displayList = res._embedded.thingTemplates;
   });
}
detail(data) {
   if (this.showpagi) {
    let id =    this.service.getSplitId(data._links.self.href);

    this.service.setId(this.WebserModel.Sevice.BASE_URL + 'thingTemplates/' +id , 'Template/Things/detail');
   } else {
    this.service.setId(this.WebserModel.Sevice.BASE_URL + 'thingTemplates/' + data.id , 'Template/Things/detail');

  }
 }
edit(data) {
// tslint:disable-next-line: max-line-length
if (this.showpagi) {
  let id =    this.service.getSplitId(data._links.self.href);

  this.service.setId(id   , 'Template/Things');
} else {
  this.service.setId( data.id  , 'Template/Things');

}

const initialState = {
    title: 'true',
    id: this.service.getId
  };
this.bsModalRef = this.modalService.show(DeviceDialogComponent,  { initialState, class: 'gray modal-lg' });

this.bsModalRef.content.onCloseEdit.subscribe(result => {
     this.getComandList();
     console.log('results', result);
});
}
delete(data) {
  alert('ds');
}

getCountDeviceTemplate(){
  this.service.getDeviceTemplateCount().subscribe(res=>{
     
      for (let i = 0 ; i <  res/this.size; i++) {
      this.pageCountArray.push(i + 1);
    }
    if(this.pageCountArray.length == 0){
      this.pageCountArray.push(1)
    }
  })
}

ngOnInit() {
  this.title = 'Add';
  this.getComandList();
  this.getCountDeviceTemplate();
    }

    prePage() {

      this.selectedPage = this.selectedPage - 1;
      this.page = this.selectedPage - 1 ;
      this.getComandList();


  }
  Page(data) {
     this.selectedPage = data ;
     this.page = this.selectedPage - 1;
     this.getComandList();
  }
    nextPage() {

        this.selectedPage = this.selectedPage + 1;
        this.page = this.selectedPage - 1;
        this.getComandList();

    }
    getClass(data) {
      if (this.selectedPage === data) {
        return 'active';
      } else {
        return '';
      }
    }
    searchresult(name: String, description: String) {
      if (description) {
        this.service.getSearchThingsTemplatedesc(name, description).subscribe(res => {
          this.displayList = res;
          this.showpagi = false;
             });
      } else {
      this.service.getSearchThingsTemplate(name , description).subscribe(res => {
    this.displayList = res;
    this.showpagi = false;
       });
    }
  }
    onSearchChange(searchValue: string , serchdescription: String) {
      if (searchValue || serchdescription) {
        console.log(searchValue);
        this.searchresult(searchValue, serchdescription);
      } else {
        this.getComandList();
        this.showpagi = true;

      }
    }
    toggelSearch() {
      this.advanceSearch = !this.advanceSearch;
      if (this.advanceSearch) {

      } else {

      ( document.getElementById('searchName') as HTMLInputElement).value = '';
      ( document.getElementById('searchDescription') as HTMLInputElement).value = '';
      ( document.getElementById('search') as HTMLInputElement).value = '';

      this.getComandList();
      this.showpagi = true;

      }
    }
    sortindex:any = 0;
    dataorder:any = '';
    searchTrue:any = false;
     sortData(data) {
      if(data.sort){}else{return '';}
    for(var i =0 ;i <this.header.length ;i++){

      if(this.header[i].sort){
        if(data.name == this.header[i].name){
          this.sortindex = i;
        }else{
          this.header[i].sort ='0';

        }

      }
    }
       if(data.sort == '0'){
        data.sort = 1;
        let orderby = 'Desc'
        this.dataorder = orderby;
      }else if(data.sort == 1){
        data.sort = 2;

        let orderby = 'asc'
        this.dataorder = orderby;
       }else if(data.sort == 2){
        let orderby = 'Desc'  
        data.sort = 1;
        this.dataorder = orderby;


      }
       this.sort = this.keyData[this.sortindex]+ ','+this.dataorder
      if(this.searchTrue){
        
      }else{
        this.getComandList();

      }
     
     }
}
