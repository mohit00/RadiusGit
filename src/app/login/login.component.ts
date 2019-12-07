import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private AuthService1: AuthService,
              private router1: Router) { }
              data:any = {};
              message:any = ''
  login(form) {
    this.message = '';
     if(form.valid){

    }else {
     for (let inner in form.controls) {
       form.controls[inner].markAsTouched()
   }
    
     return false;}

    this.AuthService1.login(this.data).subscribe(res=>{
      // alert(JSON.stringify(res))
        this.router1.navigate(['dashboard']); 

    })
  }
  ngOnInit() {
  }

}
