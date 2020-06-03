import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppUsersComponents} from './appusers.component'
import { ViewComponent } from './view/view.component';
import {AddComponent} from './add/add.component';


const routes: Routes = [{
  path: '',
  component: AppUsersComponents,
  children: [
    {
      path: 'add',
      component: AddComponent,
    },{
    path: 'view',
    component: ViewComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppUsersRoutingModule { }
