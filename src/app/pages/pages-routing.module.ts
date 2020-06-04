import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'appusers',
    loadChildren: './appusers/appusers.module#AppUsersModule',
  },
   
  {
    path: 'groups',
    loadChildren: './groups/root.module#RootModule',
  },

  {
    path: 'feedcategories',
    loadChildren: './feedcategories/root.module#RootModule',
  },

  {
    path: 'reportedfeeds',
    loadChildren: './reportedfeeds/root.module#RootModule',
  }, 
  {
    path: 'otherapp',
    loadChildren: './otherapp/root.module#RootModule',
  },

  { path: 'pages',
  loadChildren : './pages/pages.module#PagesModule'
},

{ path: 'feeds',
loadChildren: './feeds/root.module#RootModule',
},

{
  path: 'profiles',
  loadChildren: './profiles/profiles.module#ProfilesModule',
}, 


],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
