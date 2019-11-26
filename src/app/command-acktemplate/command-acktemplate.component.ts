import { Component, OnInit, SecurityContext  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import {AuthService} from '../auth.service'; declare interface TableData {
  headerRow: any ;
  dataRows: string[][];
}
@Component({
  selector: 'app-command-acktemplate',
  templateUrl: '../table/table.html',
  styleUrls: ['../table/table.scss']
})
export class CommandACKTemplateComponent implements OnInit {
constructor(private modalService: BsModalService, private service: AuthService) {
  this.pageCountArray = [];
  this.header = [{
    name: 'TEMPLATE ID',
    width: 10
  }, {
    name: 'TEMPLATE NAME',
    width: 10
  }, {
    name: 'TEMPLATE DESCRIPTION',
    width: 10
  }, {
    name: 'IS FREEZE',
    width: 10
  }, {
    name: 'DATE',
    width: 10
  },
  {
    name: 'ACTION',
    width: 10
  }
 ];

  this.keyData = ['tenantId', 'name', 'description', 'freeze', 'lastUpdatedOn', 'action'];
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
    showpagi = true;
    advanceSearch = false;
open() {

}
detail(data) {

// tslint:disable-next-line: max-line-length
  this.service.setId(data._links.self.href.substring(data._links.self.href.length - 2, data._links.self.href.length ) , 'Event/Template/detail');
}
edit(data) {
  alert('ds');
}
delete(data) {
  alert('ds');
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
              (data[key].substring( 0 , 3 ) === 'ERN'
              || data[key].substring( 0 , 3 ) === 'MRN'
              || data[key].substring( 0 , 3 ) === 'SSC'
              || data[key].substring( 0 , 3 ) === 'Pro'
              || data[key].substring( 0 , 3 ) === 'Opp'
              || data[key].substring( 0 , 3 ) === 'Equ'
              || data[key].substring( 0 , 1 ) === 'C' || data[key].substring( 0 , 1 ) === 'P') {
                 return data[key];
              } else {
                  // var _date = $filter('date')(new Date(input), 'MM/dd/yyyy');
                  return this.pipe.transform(data[key], 'MMM d, y, h:mm:ss a');
              }
            } else {
              if (data[key] === true) {
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
getEventList() {
  // this.service.getEventTemplate().subscribe(res => {
  //   // console.log(JSON.stringify(res))
  //   this.displayList = res._embedded.eventTemplates;
  // });
}
ngOnInit() {
  this.title = 'Add Event';
  this.getEventList();
    }
// tslint:disable-next-line: ban-types
    searchresult(name: String, description: String) {
      this.service.getSearchThings(name , description).subscribe(res => {
    this.displayList = res;
    this.showpagi = false;
       });
    }
// tslint:disable-next-line: ban-types
    onSearchChange(searchValue: string , serchdescription: String) {
      if (searchValue || serchdescription) {
        console.log(searchValue);
        this.searchresult(searchValue, serchdescription);
      } else {
        this.getEventList();
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

      this.getEventList();
      this.showpagi = true;

      }
    }
}
