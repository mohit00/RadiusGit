import { Component, OnInit ,HostBinding} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    HeaderTitle:String;
    child:any
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'DASHBOARD',  icon: 'fa fa-th', class: '' ,HeaderTitle:'DASHBOARD', child:[ ] },
    { path: '/user', title: 'THINGS PROTOTYPE',  icon:'fa-files-o', class: 'text-black', HeaderTitle:'DASHBOARD', child:[ {
      path: '/Properties/Prototype', title: 'Properties',  icon:'fa fa-wrench',HeaderTitle:'ATTRIBUTE PROTOTYPE'
    },{
      path: '/Event/Prototype', title: 'EVENT  ',  icon:'fa fa-calendar',HeaderTitle:'EVENT TEMPLATE'
    },{
      path: '/Event/ACK/Prototype', title: 'EVENT ACK  ',  icon:'fa fa-file-text',HeaderTitle:'EVENT ACK TEMPLATE'
    },{
      path: '/Command/Prototype', title: 'COMMAND  ',  icon:'fa fa-terminal',HeaderTitle:'COMMAND PROTOTYPE'
    },{
      path: '/Command/ACK/Prototype', title: 'COMMAND ACK  ',  icon:'fa fa-check',HeaderTitle:'COMMAND ACK PROTOTYPE'
    },{
      path: '/Template/Things', title: 'THINGS TEMPLATE  ',  icon:'fa fa-th',HeaderTitle:'THINGS TEMPLATE'
    }] },
    { path: '/Things', title: 'THINGS',  icon:'fa fa-microchip', class: 'text-black',HeaderTitle:'THINGS PROVISIONING',child:[  ] },
    { path: '/Account', title: 'Account',  icon:'fa fa-cog', class: 'text-black' ,HeaderTitle:'Account',child:[ ]},
    { path: '/user/management', title: 'USER MANAGEMENT',  icon:'fa fa-user', class: 'text-black' ,HeaderTitle:'USERMANAGEMENT',child:[  ]},
    { path: '/Alert/management', title: 'Alert MANAGEMENT',  icon:'fa fa-exclamation-circle', class: 'text-black' ,HeaderTitle:'Alertmanagement',child:[  ]},

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0})) 
      ])
    ])
  ]
  
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
