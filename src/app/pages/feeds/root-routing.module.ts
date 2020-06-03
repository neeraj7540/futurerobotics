import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RootComponents} from './root.component'
import { ViewComponent } from './view/view.component';
import {AddComponent} from './add/add.component';


const routes: Routes = [{
  path: '',
  component: RootComponents,
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
export class RootRoutingModule { }
