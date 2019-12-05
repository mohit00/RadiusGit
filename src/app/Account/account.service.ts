import { Injectable, EventEmitter } from '@angular/core';
import {

  Headers,
  RequestOptions
} from '@angular/http';
import { HttpClient , HttpInterceptor} from '@angular/common/http';
import {
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {WebserModel} from '../Service.model';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {SuccessDialogComponent} from '../dialog/success-dialog/success-dialog.component';
@Injectable()
export class AccountService {
  loaderCheck = new EventEmitter<any>();
  bsModalRef: BsModalRef;
  BASE_URL = this.WebserModel.Sevice.BASENEWURL;
  public loading = false;
  CREATE_ATTRIBUTE_TEMPLATE = this.WebserModel.Sevice.CREATE_ATTRIBUTE_TEMPLATE;
  firstHeaders: any;
  get sizetable() {
    return 10;
  }
// tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient, private router: Router, private modalService: BsModalService
// tslint:disable-next-line: no-shadowed-variable
    ,         private WebserModel: WebserModel) {
 // tslint:disable-next-line: deprecation
      this.firstHeaders = new Headers();
      this.firstHeaders.append('Content-Type', 'application/json');
  }
    getSplitId(data) {
    return data.split('/')[4];
  }
  setId(data, state) {
    localStorage.setItem('Id', data);
    this.router.navigate([state]);
   }
  suceesAlertDialog(data ) {
    const initialState = {
      title: data,
    };
    this.bsModalRef = this.modalService.show(SuccessDialogComponent, {initialState, class: 'modal-confirm  modal-sm' }    );
    }
  get  getId() {
          return localStorage.getItem('Id');
    }
    migrateThing( id1: any, id2: any, data: any): Observable < any > {
// alert('/thing-service/thing/' + id1 + '/moveThingToAccount/' + id2 )
      return this._http.post( '/thing-service/thing/' + id1 + '/moveThingToAccount/' + id2 , {} )
     .map(res => res as any)
     .catch(this.handleError);
     }
         AccountDataGet(page, size, sort): Observable < any > {
              
            return this._http.get( this.BASE_URL + 'accounts' + '?page=' + page + '&size=' + size + '&sort=' + sort)
           .map(res => res as any)
           .catch(this.handleError);
           }
           AccountDataGetCount(): Observable < any > {
            return this._http.get( this.BASE_URL + 'account-service/account/count')
           .map(res => res as any)
           .catch(this.handleError);
           }
           getSearchAccountdesc(data, des): Observable<any> {

            return this._http.get( this.BASE_URL + 'account-service/account/search?description=' + des + '*'  )
            .map(res => res as any)
            .catch(this.handleError);
           }
           getSearchAccount(name): Observable<any> {

            return this._http.get( this.BASE_URL + 'account-service/account/search?name=' + name + '*'  )
            .map(res => res as any)
            .catch(this.handleError);
           }
           addAccount(data): Observable<any> {

            return this._http.post( this.BASE_URL + 'accounts',data )
                        .map(res => res as any)
            .catch(this.handleError);
           }
          updateAccount(data,accountId): Observable<any> {

            return this._http.patch( this.BASE_URL + 'accounts'+'/'+accountId,data )
                        .map(res => res as any)
            .catch(this.handleError);
           }
           getDetail(  data ): Observable < any > {

            return this._http.get( data )
           .map(res => res as any)
           .catch(this.handleError);
           }
           getAccountByUser(  data ): Observable < any > {

            return this._http.get( 'user-service/account/'+data )
           .map(res => res as any)
           .catch(this.handleError);
           }

          
        handleError(error: Response) {
        
        console.log(error);
        this.loading = false;

        return Observable.throw(error);
      }
}
