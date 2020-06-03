import { AddComponent } from './add/add.component';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { RootRoutingModule } from './root-routing.module';
import { ViewComponent } from './view/view.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToastrMessages } from '../../helpers/toaster.service';
// import { MapsModule } from '../../pages/maps/maps.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../interceptor/auth.interceptor';
// import{SearchComponent} from '../maps/search-map/search/search.component';
import { RootComponents } from './root.component';

import { UiSwitchModule } from 'ngx-ui-switch';
 
const components = [
  RootComponents,
  ViewComponent,
  AddComponent
 ];

@NgModule({
  imports: [
    ThemeModule,
    RootRoutingModule,
    Ng2SmartTableModule,

    UiSwitchModule.forRoot({   
    })
  ],
  declarations: [
    ...components,
  ],
  providers: [
    ToastrMessages,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  
  
   ],
  
})
export class RootModule { }
