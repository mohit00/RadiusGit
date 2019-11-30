import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import {AuthService} from '../auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {  HttpErrorResponse } from '@angular/common/http';
  import { environment } from './../../environments/environment';
 
 
 import { tap, finalize,catchError } from 'rxjs/operators';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private AuthService: AuthService) {
    }
    authReq:any;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      setTimeout(()=>{
        this.AuthService.loaderCheck.emit('show');
      },10)
      if(req.url !='Login'){
          if(req.url.split("/")[0] == 'user-service'){
          this.authReq = req.clone({
            setHeaders: {
              'x-account': sessionStorage.getItem('setUserAccount'),
              'x-user':'admin'
            }
          });

        }else {
          this.authReq = req.clone({
            setHeaders: {
              'x-account': 'Radius-PF',
              'x-user':'admin'
            }
          });
        }
        // if(req.url !='user/management'){

        // }else{
       
      // }
      }else{
        this.authReq = req;
      }
      return next.handle(this.authReq).pipe(
        
        tap(
        
        (err: any) => {

          if (err instanceof HttpErrorResponse) {
            console.log(err);
            alert("ds");
           }
        }
      ),  finalize(() => {
        setTimeout(()=>{
          this.AuthService.loaderCheck.emit('hide');
        },100)

        }),  catchError((error: HttpErrorResponse) => {
           if (error.status == 401) {
            // 401 handled in auth.interceptor
           }else if(error.status  == 500){
            alert("Internal server Error")
           }
           return Observable.throw(error);
          })
      
    );
  }
}
