import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToastrMessages } from '../../helpers/toaster.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../interceptor/auth.interceptor';


const components = [
  ProfilesComponent,
  ViewComponent,
  EditComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    ProfilesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [
    ToastrMessages,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ,
   ],
})
export class ProfilesModule { }
