import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagesComponents} from './pages.component'
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';



const routes: Routes = [{
  path: '',
  component: PagesComponents,
  children: [
    {
      path: 'add',
      component: AddComponent,
    },
    {
    path: 'view',
    component: ViewComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppUsersRoutingModule { }
