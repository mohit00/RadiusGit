import { Injectable, EventEmitter } from '@angular/core';
import {

  Headers,
  RequestOptions
} from '@angular/http';
import { HttpClient , HttpInterceptor, HttpHeaders} from '@angular/common/http';
import {
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {WebserModel} from './Service.model';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {SuccessDialogComponent} from './dialog/success-dialog/success-dialog.component';
import { Header } from 'ng-treetable/src/component/shared';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loaderCheck = new EventEmitter<any>();
  bsModalRef: BsModalRef;
  BASE_URL = this.WebserModel.Sevice.BASE_URL;
  public loading = false;
  private missionAnnouncedSource = new Subject<string>();
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  CREATE_ATTRIBUTE_TEMPLATE = this.WebserModel.Sevice.CREATE_ATTRIBUTE_TEMPLATE;
  BASE_URL2 = this.WebserModel.Sevice.BASE_URL2;
  COUNTRYLIST = this.WebserModel.countryList;
  firstHeaders: any;
  get CountryList(){
    return this.COUNTRYLIST;
  }
  get sizetable() {
    return 10;
  }
  //  httpOptions:any = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     'x-account': 'Radius-PF',
  //     'x-user':'admin'
  //   })
  // };
// tslint:disable-next-line: variable-name
headerJson:any;
  constructor(private _http: HttpClient, private router: Router, private modalService: BsModalService
// tslint:disable-next-line: no-shadowed-variable
    ,         private WebserModel: WebserModel) {
    this.headerJson ={
        'x-account': 'Radius-PF',
        'x-user':'admin'
      };
// tslint:disable-next-line: deprecation
 
    
  }
  login(data): Observable < any > {
    
    return this._http.post(  'authenticate', data,{
      headers:this.headerJson

    })
   .map(res => res as any)
   .catch(this.handleError);
   }
    getSplitId(data) {
    return data.split('/')[4];
  }
  suceesAlertDialog(data ) {
    const initialState = {
      title: data,
    };
    this.bsModalRef = this.modalService.show(SuccessDialogComponent, {initialState, class: 'modal-confirm  modal-sm' }    );

    }
    deviceLifestateChange(data, state): Observable < any > {
      let customheader ={
        'x-account':sessionStorage.getItem("setUserAccount"),
        'x-user':'admin'

      }
      return this._http.post(  'thing-service/thing/' + data + '/changeDeviceLifeCycleState/' + state, {},{
        headers:customheader
     })
     .map(res => res as any)
     .catch(this.handleError);
     }
     deviceOperationstateChange(data, state): Observable < any > {
      let customheader ={
        'x-account':sessionStorage.getItem("setUserAccount"),
        'x-user':'admin'

      }
      return this._http.post(  'thing-service/thing/' + data + '/changeDeviceOperationalState/' + state, {},{
        headers:customheader
     })
     .map(res => res as any)
     .catch(this.handleError);
     }
       addAttributeTemplate(data): Observable < any > {
        return this._http.post(  'attributeTemplates', data,{
          headers:this.headerJson
       })
       .map(res => res as any)
       .catch(this.handleError);
       }
       getAttrbuteCount(): Observable<any> {

        return this._http.get(  'thing-service/attributeTemplates/count',{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       getEventCount(): Observable<any> {

        return this._http.get(  'thing-service/eventTemplates/count',{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       getCommandCount(): Observable<any> {

        return this._http.get(  'thing-service/commandTemplates/count',{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       getDeviceTemplateCount(): Observable<any> {

        return this._http.get(  'thing-service/thingTemplates/count',{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       getDeviceCount(): Observable<any> {

        return this._http.get(  'thing-service/things/count',{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       updateAttributeTemplate(data, id): Observable < any > {
        return this._http.put( id, data,{
          headers:this.headerJson
       })
       .map(res => res as any)
       .catch(this.handleError);
       }
        freezeData(data: any, id: string): Observable < any > {
        return this._http.patch( id, data,{
          headers:this.headerJson
       })
       .map(res => res as any)
       .catch(this.handleError);
       }
       getData(data: any, id: string): Observable < any > {
        return this._http.get( id, {
          headers:this.headerJson
       })
       .map(res => res as any)
       .catch(this.handleError);
       }
       getAttributeTemplate( page, size, sort): Observable < any > {
         return this._http.get(  'attributeTemplates?page=' + page + '&size=' + size + '&sort=' + sort,{
          headers:this.headerJson
       } )
       .map(res => res as any)
       .catch(this.handleError);
       }
       getAttributeTemplatefreeze( page, size, sort): Observable < any > {
          return this._http.get(  'thing-service/attributeTemplates/search?isFreeze=true&page=' + page + '&size=' + size +  '&sort=' + sort ,{
            headers:this.headerJson
         })
      .map(res => res as any)
      .catch(this.handleError);
      }
      getCommandTemplatefreeze( page, size, sort): Observable < any > {
        return this._http.get(  'thing-service/commandTemplates/search?isFreeze=true&page=' + page + '&size=' + size +  '&sort=' + sort,{
          headers:this.headerJson
       } )
     .map(res => res as any)
     .catch(this.handleError);
     }
     getEventemplatefreeze( page, size, sort): Observable < any > {
      return this._http.get(  'thing-service/eventTemplates/search?isFreeze=true&page=' + page + '&size=' + size +  '&sort=' + sort,{
        headers:this.headerJson
     } )
   .map(res => res as any)
   .catch(this.handleError);
   }
   getThingsemplatefreeze( page, size, sort): Observable < any > {
// tslint:disable-next-line: max-line-length
    return this._http.get(  'thing-service/thingTemplates/search?isFreeze=true&page=' + page + '&size=' + size +  '&sort=' + sort ,{
      headers:this.headerJson
   })
 .map(res => res as any)
 .catch(this.handleError);
 }
       getAttributeTemplateDetail( data): Observable < any > {

        return this._http.get(  'attributeTemplates/' + data,{
          headers:this.headerJson
       })
       .map(res => res as any)
       .catch(this.handleError);
       }
       setId(data, state) {
          
         localStorage.setItem('Id', data);
         this.router.navigate([state]);
        }
  get  getId() {
          return localStorage.getItem('Id');

         }
       getEventTemplate( page, size, sort): Observable < any > {

        return this._http.get(  'eventTemplates?page=' + page + '&size=' + size + '&sort=' + sort,{
          headers:this.headerJson
       } )
       .map(res => res as any)
       .catch(this.handleError);
       }
       getEventTemplateDetail(data ): Observable < any > {

        return this._http.get(  'eventTemplates/' + data,{
          headers:this.headerJson
       } )
       .map(res => res as any)
       .catch(this.handleError);
       }
       addEventTemplate(data): Observable < any > {
        return this._http.post(  'eventTemplates', data,{
          headers:this.headerJson
       })
       .map(res => res as any)
       .catch(this.handleError);
       }
       updateEventTemplate(data, id): Observable < any > {
        return this._http.put( id, data,{
          headers:this.headerJson
       })
       .map(res => res as any)
       .catch(this.handleError);
       }
       updateCommandTemplate(data: any, id: string): Observable < any > {
        return this._http.put( id, data,{
          headers:this.headerJson
       })
       .map(res => res as any)
       .catch(this.handleError);
       }
       addCommandTemplate(data): Observable < any > {

        return this._http.post(  'commandTemplates', data,{
          headers:this.headerJson
       })
       .map(res => res as any)
       .catch(this.handleError);
       }
       getComandTemplate(page: string, size: string, sort: string ): Observable < any > {

        return this._http.get(  'commandTemplates?page=' + page + '&size=' + size + '&sort=' + sort ,{
          headers:this.headerJson
       })
       .map(res => res as any)
       .catch(this.handleError);
       }
       getComandTemplateDetail(data ): Observable < any > {

        return this._http.get(  'commandTemplates/' + data ,{
          headers:this.headerJson
       })
       .map(res => res as any)
       .catch(this.handleError);
       }
       getdeviceTemplate(page: string, size: string, sort: string ): Observable < any > {

        return this._http.get(  'thingTemplates?page=' + page + '&size=' + size + '&sort=' + sort ,{
          headers:this.headerJson
       } )
       .map(res => res as any)
       .catch(this.handleError);
       }
       adddeviceTemplate(data ): Observable < any > {

        return this._http.post(  'thingTemplates', data,{
          headers:this.headerJson
       })
       .map(res => res as any)
       .catch(this.handleError);
       }
       updatedeviceTemplate(data , id): Observable < any > {

        return this._http.put(id, data,{
          headers:this.headerJson
       })
       .map(res => res as any)
       .catch(this.handleError);
       }
       getDetail(data ): Observable < any > {

        return this._http.get( data,{
          headers:this.headerJson
       } )
       .map(res => res as any)
       .catch(this.handleError);
       }
       getthingList( page: string, size: string, sort: string,thingAccrossAccount ): Observable < any > {
     
        return this._http.get(  'things?page=' + page + '&size=' + size + '&sort=' + sort+'&acrossAllAccount='+thingAccrossAccount,{
          headers:this.headerJson
       } )
       .map(res => res as any)
       .catch(this.handleError);
       }

       addThing( id: any, data: any): Observable < any > {
         
        return this._http.post(  'thing-service/createThingFromTemplate/' + id, data,{
          headers:this.headerJson
       } )
       .map(res => res as any)
       .catch(this.handleError);
       }
      migrateThing( id1: any, id2: any, data: any): Observable < any > {
        let customheader = {
          'x-account': sessionStorage.getItem('setUserAccount'),
          'x-user':'admin'
        }
        return this._http.post(  'thing-service/thing/' + id1 + '/migrateThingToNewThingTemplate/' + id2 + '/retainMetaData=' + data, {} ,{
          headers:customheader
       })
       .map(res => res as any)
       .catch(this.handleError);
       }
       updateThing( id: any, data: any): Observable < any > {
         let customheader = {
          'x-account': sessionStorage.getItem('setUserAccount'),
          'x-user':'admin'
        }
        return this._http.put(  'things/' + id, data ,{
          headers:customheader
       })
       .map(res => res as any)
       .catch(this.handleError);
       }
       getSearchAttribute(data, des): Observable<any> {

        return this._http.get(  'thing-service/attributeTemplates/search?name=' + data + '*' ,{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       getSearchAttributedescript(data, des) {
        return this._http.get(  'thing-service/attributeTemplates/search?description=' + des + '*',{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       getSearchEvent(data, des): Observable<any> {
        return this._http.get(  'thing-service/eventTemplates/search?name=' + data + '*'  ,{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       getUser(page,size,sort): Observable<any> {
        return this._http.get('users?page=' + page + '&size=' + size + '&sort=' + sort,{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       addUser(data): Observable<any> {
        
         let customheader = {
          'x-account': sessionStorage.getItem('setUserAccount'),
          'x-user':'admin'
        }
        return this._http.post('user-service',data ,{
          headers:customheader
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       updateUser(data,name): Observable<any> {
        let customheader = {
          'x-account': sessionStorage.getItem('setUserAccount'),
          'x-user':'admin'
        }
        return this._http.put('user-service/'+name,data,{
          headers:customheader
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       getSearchEventdesc(data, des): Observable<any> {

        return this._http.get(  'thing-service/eventTemplates/search?description=' + des + '*' ,{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       getSearchCommand(data, des): Observable<any> {

        return this._http.get(  'thing-service/commandTemplates/search?name=' + data + '*' ,{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       getSearchCommanddesc(data, des): Observable<any> {

        return this._http.get(  'thing-service/commandTemplates/search?description=' + des + '*' ,{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       getSearchThingsTemplate(data, des): Observable<any> {

        return this._http.get(  'thing-service/thingTemplates/search?name=' + data + '*'  ,{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       getSearchThingsTemplatedesc(data, des): Observable<any> {

        return this._http.get(  'thing-service/thingTemplates/search?description=' + des + '*' ,{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       getSearchThings(data, des,thingAccrossAccount): Observable<any> {
        let customheader ={
          'x-account':sessionStorage.getItem("setUserAccount"),
          'x-user':'admin'
  
        }
        return this._http.get(  'thing-service/things/search?name=' + data + '*'+'&acrossAllAccount='+thingAccrossAccount,{
          headers:customheader
       }  )
        .map(res => res as any)
        .catch(this.handleError);
       }
       getSearchService(data): Observable<any> {

        return this._http.get( data ,{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       getSearchThingsdesc(data, des,thingAccrossAccount): Observable<any> {
        let customheader ={
          'x-account':sessionStorage.getItem("setUserAccount"),
          'x-user':'admin'
  
        }
        return this._http.get(  'thing-service/things/search?description=' + des + '*'+'&acrossAllAccount='+thingAccrossAccount ,{
          headers:customheader
       }  )
        .map(res => res as any)
        .catch(this.handleError);
       }
       addMetaData(id, data): Observable<any> {
        let customheader = {
          'x-account': sessionStorage.getItem('setUserAccount'),
          'x-user':'admin'
        }
        return this._http.post(  'thing-service/thing/' + id + '/metadata' , data ,{
          headers:customheader
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       //Roles
       GetRoles(page,size,sort): Observable<any> {

        return this._http.get(  'roles?page=' + page + '&size=' + size + '&sort=' + sort ,{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       getRolesCount(){
        return this._http.get(  'authorization-service/role/count',{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       getSearchRoles(data, des): Observable<any> {

        return this._http.get(  'authorization-service/role/search?name=' + data + '*' ,{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       getSearchRolesdesc(data, des): Observable<any> {

        return this._http.get(  'authorization-service/role/search?description=' + des + '*',{
          headers:this.headerJson
       }  )
        .map(res => res as any)
        .catch(this.handleError);
       }
       createRole(data): Observable<any> {
        return this._http.post('roles',data ,{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       } 
        assignUnassugnRole( data,json):Observable<any>{
              return this._http.patch(data,json,{
                headers:this.headerJson
             } )       .map(res => res as any)
            .catch(this.handleError);
        }
       // alert 
       getalerts( page, size, sort): Observable < any > {
        return this._http.get(  'alerts?page=' + page + '&size=' + size + '&sort=' + sort,{
          headers:this.headerJson
       } )
      .map(res => res as any)
      .catch(this.handleError);
      }
      getAlertCount(): Observable<any> {

        return this._http.get(  'alert-service/alert/count',{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       getSearchAlert(data, des): Observable<any> {

        return this._http.get('alert-service/alert/search?name=' + data + '*',{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       getAlertdescript(data, des) {
        return this._http.get(  'alert-service/alert/search?description=' + des + '*',{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       createAlert(data) {
        return this._http.post(  'alerts' ,data,{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       updateAlert(data,id) {
        return this._http.put(  'alerts'+'/'+id ,data ,{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       AssignThingAlert(customAlertId,thingId) {
        let customheader = {
          'x-account': sessionStorage.getItem('setUserAccount'),
          'x-user':'admin'
        }
        return this._http.post(  'alert-service/alert/'+customAlertId+'/assignAlertToThing/'+thingId ,{},{
          headers:customheader
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       unAssignThingAlert(customAlertId,thingId) {
        let customheader = {
          'x-account': sessionStorage.getItem('setUserAccount'),
          'x-user':'admin'
        }
        return this._http.post(  'alert-service/alert/'+customAlertId+'/unAssignAlertToThing/'+thingId ,{},{
          headers:customheader
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       getAlertMappedToThing(thingId) {
        return this._http.get(  'alert-service/alert/assignTo/Thing/'+thingId ,{
          headers:this.headerJson
       }  )
        .map(res => res as any)
        .catch(this.handleError);
       }
       getAlertMappedToAccount(AccountId) {
        return this._http.get(  'alert-service/alert/assignTo/Account/'+AccountId ,{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       AssignAccountAlert(customAlertId,thingId) {
        return this._http.post(  'alert-service/alert/'+customAlertId+'/assignAlertToAccount/'+thingId ,{},{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       unAssignAccountAlert(customAlertId,thingId) {
        return this._http.post(  'alert-service/alert/'+customAlertId+'/unAssignAlertToAccount/'+thingId ,{} ,{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       // preference
       preferenceCount() {
        return this._http.get(  'account-preference/preference/count',{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       preferenceGET(page,size,sort) {
        return this._http.get(  'preferences?page=' + page + '&size=' + size + '&sort=' + sort,{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       preferenceAccountCreate(data) {
        return this._http.post(  'preferences',data,{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       preferenceAccountUpdate(data,id) {
        return this._http.put(  'preferences/'+ id,data,{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       getSearchPreference(data, des): Observable<any> {

        return this._http.get('account-preference/preference/search?name=' + data + '*' ,{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       getPreferencedescript(data, des) {
        return this._http.get(  'account-preference/preference/search?description=' + des + '*' ,{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       assignAccountPreferanceAccount(preferenceId, accountId) {
        let customheader = {
          'x-account': sessionStorage.getItem('setUserAccount'),
          'x-user':'admin'
        }
         return this._http.post(  'account-preference/preference/'+preferenceId+'/assignPreferenceToAccount/'+accountId ,{},{
          headers:customheader
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
      unAssignAccountPreferanceAccount(preferenceId, accountId) {
        let customheader = {
          'x-account': sessionStorage.getItem('setUserAccount'),
          'x-user':'admin'
        }
        return this._http.post(  'account-preference/preference/'+preferenceId+'/unAssignPreferenceToAccount/'+accountId ,{},{
          headers:customheader
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       getAccountPreferenceMappedToAccount(AccountId) {
        return this._http.get(  'account-preference/preference/assignTo/Account/'+AccountId ,{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       preferenceThingCount() {
        return this._http.get(  'thing-preference/preference/count',{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       preferenceThingGET(page,size,sort) {
        return this._http.get(  'thingpreferences?page=' + page + '&size=' + size + '&sort=' + sort,{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       preferenceThingCreate(data) {
        return this._http.post(  'thingpreferences',data,{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       preferenceThingUpdate(data,id) {
        return this._http.put(  'thingpreferences/'+id,data,{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       getSearchThingPreference(data, des): Observable<any> {

        return this._http.get('thing-preference/preference/search?name=' + data + '*' ,{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       getPreferenceThingdescript(data, des) {
        return this._http.get(  'thing-preference/preference/search?description=' + des + '*' ,{
          headers:this.headerJson
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       getThingsbyAccount(page,size,searchAccrossAccount) {
        let customheader = {
          'x-account': sessionStorage.getItem('setUserAccount'),
          'x-user':'admin'
        }
        return this._http.get(  'thing-service/thing/?paze='+page+'&size='+size+'&acrossAllAccount='+searchAccrossAccount ,{
          headers:customheader
       })
        .map(res => res as any)
        .catch(this.handleError);
       }
       getThingPreferenceMappedToAccount(AccountId) {
        return this._http.get(  'thing-preference/preference/assignTo/Account/'+AccountId ,{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }

       assignThingPreferanceAccount(preferenceId, accountId) {
        let customheader = {
          'x-account': sessionStorage.getItem('setUserAccount'),
          'x-user':'admin'
        }
         return this._http.post(  'thing-preference/preference/'+preferenceId+'/assignPreferenceToAccount/'+accountId ,{},{
          headers:customheader
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
      unAssignThingPreferanceAccount(preferenceId, accountId) {
        let customheader = {
          'x-account': sessionStorage.getItem('setUserAccount'),
          'x-user':'admin'
        }
        return this._http.post(  'thing-preference/preference/'+preferenceId+'/unAssignPreferenceToAccount/'+accountId ,{},{
          headers:customheader
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }

       assignThingPreferanceThing(preferenceId, accountId) {
        let customheader = {
          'x-account': sessionStorage.getItem('setUserAccount'),
          'x-user':'admin'
        }
         return this._http.post(  'thing-preference/preference/'+preferenceId+'/assignPreferenceToThing/'+accountId ,{},{
          headers:customheader
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
      unAssignThingPreferanceThing(preferenceId, accountId) {
        let customheader = {
          'x-account': sessionStorage.getItem('setUserAccount'),
          'x-user':'admin'
        }
        return this._http.post(  'thing-preference/preference/'+preferenceId+'/unAssignPreferenceToThing/'+accountId ,{},{
          headers:customheader
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
       getThingPreferenceMappedToThing(thingId) {
        return this._http.get(  'thing-preference/preference/assignTo/Thing/'+thingId ,{
          headers:this.headerJson
       } )
        .map(res => res as any)
        .catch(this.handleError);
       }
     
       private handleError(error: Response) {
         
        console.log(error);
        this.loading = false;

        return Observable.throw(error);
      }
}
