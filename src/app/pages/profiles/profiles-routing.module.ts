import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilesComponent } from './profiles.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [{
  path: '',
  component: ProfilesComponent,
  children: [
     {
    path: 'view',
    component: ViewComponent,
  }, {
    path: 'edit',
    component: EditComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule { }
