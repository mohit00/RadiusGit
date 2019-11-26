import { Component } from '@angular/core';
import { SwPush , SwUpdate} from '@angular/service-worker';
import {NewsletterService} from './newsletterService';
import { environment } from './../environments/environment';
import {AuthService } from '../app/auth.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Radius';
loaderShow: any;
  readonly VAPID_PUBLIC_KEY = 'BEGbsELIrNOEWo833QxzGALIVU8uDwpaVWMDbK5UFD4qtz0lTGzmmFm0A3GArS_qAbb3jU_TNL7ujr3i2anYdeA';
  constructor(
    private swPush: SwPush,
    private SwUpdate1: SwUpdate ,
    private newsletterService: NewsletterService ,
    // tslint:disable-next-line: no-shadowed-variable
    private Service: AuthService, private Router: Router ) {
       this.loaderShow = false;
       SwUpdate1.available.subscribe(evt => {
        // an update is available, add some logic here.
        alert('Update Available');
       });
       this.Service.loaderCheck.subscribe(res => {
           if (res === 'show') {
            this.loaderShow = true;
           } else {
            this.loaderShow = false;

           }
        });
       this.Router.events.subscribe((event: Event) => {
          if (event instanceof NavigationStart) {
            if (this.loaderShow) {} else {
              this.loaderShow = true;
            }
          }

          if (event instanceof NavigationEnd) {
            if (this.loaderShow) {
              this.loaderShow = false;

            } else {
             }
          }
          if (event instanceof NavigationError) {
            this.loaderShow = false;
          }
      });
       console.log(environment.production); // Logs false for default environment

      }

  subscribeToNotifications() {
      this.swPush.requestSubscription({
           serverPublicKey: this.VAPID_PUBLIC_KEY
       })
        .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
       .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
