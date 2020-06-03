import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MENU_ITEMS } from './pages-menu';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import * as JWT from 'jwt-decode';
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {

  baseUrl = environment.baseUrl;
  // menu: any;
  userId: any;
  defineRole: any;
  newmenu = [];
  menu = MENU_ITEMS; //foreacherror
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {

    this.userId = JWT(localStorage.getItem('authToken'));
 
  }
  ngOnInit() {
  }

}
