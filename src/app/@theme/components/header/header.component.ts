import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { AuthService } from '../../../auth.service';
import * as JWT from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  userId: any;
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;
  userMenu = [{ title: 'Profile' ,link: 'pages/profiles/edit'}, { title: 'Log out' ,link: '/auth/logout'}];
  user: any;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private authService: AuthService,
              private userService: UserData,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private http: HttpClient
              ) {
  }

  ngOnInit() {
   
      this.userId=JWT(localStorage.getItem('authToken'));
      
      this.user={"name":localStorage.getItem('userName'),"picture": this.imagesUrl+localStorage.getItem('userImage')}
      console.log(localStorage.getItem('userName'));



  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
