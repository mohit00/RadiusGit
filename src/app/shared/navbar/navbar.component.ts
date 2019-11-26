import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { SwPush } from '@angular/service-worker';
import {NewsletterService} from '../../newsletterService'
@Component({
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    private titleSelected: any;
    constructor(location: Location,  private element: ElementRef,private swPush: SwPush, private newsletterService: NewsletterService) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
        this.titleSelected = 0;
      this.listTitles = ROUTES;
       const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    getFromChild(title){
        for(var p =0 ;p<this.listTitles.length ;p++){
            for(var l =0 ;l<this.listTitles[p].child.length ;l++){
                if(  this.listTitles[p].child[l].path == title ){
                   return this.listTitles[p].child[l].title ;
               }
            }
        }
    }
    getFromChildIcon(title){
        for(var p =0 ;p<this.listTitles.length ;p++){
            for(var l =0 ;l<this.listTitles[p].child.length ;l++){
            
               if(  this.listTitles[p].child[l].path == title ){
                   return this.listTitles[p].child[l].icon ;
               }
            }
        }
    }
    getIcon(){
        
        
        this.titleSelected = 0
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee;

        for(var i =0 ;i<this.listTitles.length ;i++){
            if(this.listTitles[i].path === titlee){
              this.titleSelected = 1;
              return this.listTitles[i].icon;

           }
           
           if(i == this.listTitles.length - 1){
            if(this.titleSelected == 0){

               return this.getFromChildIcon(titlee)
               
            } 
           }
        }
    //   for(var item = 0; item < this.listTitles.length; item++){
    //         console.log("path" + this.listTitles[item].path)
    //         console.log("title" + titlee)
    //       if(this.listTitles[item].path === titlee){
    //           return this.listTitles[item].HeaderTitle;
    //       }
    //   }
    //   return 'Dashboards';
    return titlee;
    }
    getTitle(){
        this.titleSelected = 0
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee;

        for(var i =0 ;i<this.listTitles.length ;i++){
            if(this.listTitles[i].path === titlee){
              this.titleSelected = 1;
              return this.listTitles[i].HeaderTitle;

           }
           
           if(i == this.listTitles.length - 1){
            if(this.titleSelected == 0){

               return this.getFromChild(titlee)
               
            } 
           }
        }
    //   for(var item = 0; item < this.listTitles.length; item++){
    //         console.log("path" + this.listTitles[item].path)
    //         console.log("title" + titlee)
    //       if(this.listTitles[item].path === titlee){
    //           return this.listTitles[item].HeaderTitle;
    //       }
    //   }
    //   return 'Dashboards';
    return titlee;
    }
    title = 'Radius';

    readonly VAPID_PUBLIC_KEY = "BEGbsELIrNOEWo833QxzGALIVU8uDwpaVWMDbK5UFD4qtz0lTGzmmFm0A3GArS_qAbb3jU_TNL7ujr3i2anYdeA";
  
 
  
    subscribeToNotifications() {
         this.swPush.requestSubscription({
             serverPublicKey: this.VAPID_PUBLIC_KEY
         })
          .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
         .catch(err => console.error("Could not subscribe to notifications", err));
    }
  }