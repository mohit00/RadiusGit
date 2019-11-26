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
  login() {
    this.router1.navigate(['dashboard']); 
  }
  ngOnInit() {
  }

}
