import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AccountService} from '../account.service';
import { DatePipe } from '@angular/common';
import {AccountDialogComponent} from '../account/account-dialog/account-dialog.component';

 // tslint:disable-next-line: no-empty-interface
declare interface TableData {
}
@Component({
  selector: 'app-account',
  templateUrl: '../../table/table.html',
  styleUrls: ['../../table/table.scss']
})

export class AccountComponent implements OnInit {

    constructor(private modalService: BsModalService, private service: AccountService ) {
      this.pageCountArray = [];
      this.selectedPage = 1;
      this.page = 0;
      this.size = this.service.sizetable;
      this.sort = 'createdOn,Desc';

      this.header = [  {
        name: '  NAME',
        width: 10,
        sort: '0'
      }, {
        name: '  DESCRIPTION',
        width: 20,
        sort: '0'
      } , {
        name: 'Created DATE',
        width: 12,
        sort: 1
      }, {
        name: 'Created By',
        width: 10,
        sort: '0'
      },
      {
        name: 'ACTION',
        width: 10
      }
     ];

      this.keyData = [  'name', 'description',   'createdOn', 'createdBy', 'action'];
     }
 

      public tableData1: TableData;
      pipe = new DatePipe('en-US');
      bsModalRef: BsModalRef;
    pageCount: any;
    displayList: any;
    // tslint:disable-next-line: ban-types
    title: String;
    rowSpan: number;
    header: any;
    keyData: any;
    actionData: any;
     // tslint:disable-next-line: ban-types
     substring: String;
     pageCountArray: any;
     selectedPage: any;
     page: any;
     size: any;
     sort: any;
    nextDisabled: any;
    preDisabled: any;
        showpagi = true;
        advanceSearch = false;
    pageInfo: any;
    searchTrue: any = false;
          sortindex: any = 0;
        dataorder: any = '';
    open() {
      const initialState = {
        title: 'false',
      };
      this.bsModalRef = this.modalService.show(AccountDialogComponent,  { initialState, class: 'gray modal-lg' });

      this.bsModalRef.content.onClose.subscribe((result: any) => {
           this.getAccountList();
           console.log('results', result);
      });
    }
    detail(data: any) {
       if (this.showpagi) {
        const id =    this.service.getSplitId(data._links.self.href);

        this.service.setId(id, 'Account/Detail');
      } else {
        this.service.setId(  data.id  , 'Account/Detail');
      }
    }
    edit(data: any ) {
      console.log(JSON.stringify(data));
    // tslint:disable-next-line: max-line-length
      if (this.showpagi) {
        const id =    this.service.getSplitId(data._links.self.href);

        this.service.setId(id  , 'Account');

    } else {
      this.service.setId( data.id  , 'Account');

    }

      const initialState = {
        title: 'true',
        id: this.service.getId
      };
      this.bsModalRef = this.modalService.show(AccountDialogComponent,  { initialState, class: 'gray modal-lg' });

    //   this.bsModalRef.content.onCloseEdit.subscribe((result: any) => {
    //      console.log('results', result);
    //  });
    }
    delete(data: any) {
      alert('ds');
    }
    getData(data: { [x: string]: any; }, key: string , index: any) {
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
          this.actionData =  `
          <i class="fa fa-eye" aria-hidden="true"  ></i>
          <i class="fa fa-pencil" aria-hidden="true"></i>
          <i class="fa fa-trash" aria-hidden="true"></i>

          `;
          return '';
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
                  (data[key].substring( 0 , 3 ) === 'ERN' ||
                  data[key].substring( 0 , 3 ) === 'MRN' ||
                   data[key].substring( 0 , 3 ) === 'SSC' ||
                    data[key].substring( 0 , 3 ) === 'Pro' ||
                    data[key].substring( 0 , 3 ) === 'Opp' ||
                     data[key].substring( 0 , 3 ) === 'Equ' ||
                      data[key].substring( 0 , 1 ) === 'C' ||
                       data[key].substring( 0 , 1 ) === 'P') {
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
    getAccountList() {
      this.service.AccountDataGet(this.page, this.size, this.sort).subscribe(res => {
          this.pageInfo = res.page;
          this.displayList = res._embedded.accounts;
       });
    }
    getCountEvent() {
      this.service.AccountDataGetCount().subscribe(res => {

          for (let i = 0 ; i <  res / this.size; i++) {
          this.pageCountArray.push(i + 1);
        }
          if (this.pageCountArray.length == 0) {
          this.pageCountArray.push(1);
        }
      });
    }

    ngOnInit() {


      this.getCountEvent();
      this.title = 'Add';
      this.getAccountList();
        }
        prePage() {

          this.selectedPage = this.selectedPage - 1;
          this.page = this.selectedPage - 1 ;
          this.getAccountList();


      }
      Page(data: any) {
         this.selectedPage = data ;
         this.page = this.selectedPage - 1;
         this.getAccountList();
      }
        nextPage() {

            this.selectedPage = this.selectedPage + 1;
            this.page = this.selectedPage - 1;
            this.getAccountList();

        }
        getClass(data: any) {
          if (this.selectedPage === data) {
            return 'active';
          } else {
            return '';
          }
        }
        // tslint:disable-next-line: ban-types
        searchresult(name: String, description: String) {
          
          if (description) {
            this.service.getSearchAccountdesc(name, description).subscribe(res => {
              this.displayList = res;
              this.showpagi = false;
                 });
          } else {
          this.service.getSearchAccount(name ).subscribe(res => {
            console.log(JSON.stringify(res));
            this.displayList = res;
            this.showpagi = false;
           });
        }
      }
        // tslint:disable-next-line: ban-types
        onSearchChange(searchValue: string , serchdescription: String) {
          if (searchValue || serchdescription) {
            this.searchTrue = true;
            console.log(searchValue);
            this.searchresult(searchValue, serchdescription);
          } else {
            this.searchTrue = false;
            this.getAccountList();
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
          this.getAccountList();
          this.showpagi = true;
          }
        }
         sortData(data) {
          if (data.sort) {} else {return ''; }
          for (let i = 0 ; i < this.header.length ; i++) {
          if (this.header[i].sort) {
            if (data.name == this.header[i].name) {
              this.sortindex = i;
            } else {
              this.header[i].sort = '0';
            }
          }
        }
          if (data.sort == '0') {
            data.sort = 1;
            const orderby = 'Desc';
            this.dataorder = orderby;
          } else if (data.sort == 1) {
            data.sort = 2;
            const orderby = 'asc';
            this.dataorder = orderby;
           } else if (data.sort == 2) {
            const orderby = 'Desc';
            data.sort = 1;
            this.dataorder = orderby;
          }
          this.sort = this.keyData[this.sortindex] + ',' + this.dataorder;
          if (this.searchTrue) {

          } else {
            this.getAccountList();
          }
        }
    }
