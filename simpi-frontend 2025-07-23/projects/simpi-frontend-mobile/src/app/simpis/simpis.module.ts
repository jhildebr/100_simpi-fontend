import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SimpiOverviewPageComponent } from './container/simpi-overview-page/simpi-overview-page.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SimpiOverviewComponent } from './components/simpi-overview/simpi-overview.component';
import { NewSimpisPageComponent } from './container/new-simpis-page/new-simpis-page.component';
import { SimpiListComponent } from './components/simpi-list/simpi-list.component';
import { IonicModule } from '@ionic/angular';

const routes: Route[] = [
  { path: 'new', component: NewSimpisPageComponent},
  { path: ':productId', component: SimpiOverviewPageComponent },
];

@NgModule({
  imports: [IonicModule, SharedModule, RouterModule.forChild(routes)],
  exports: [],
  declarations: [
    SimpiOverviewPageComponent,
    SimpiOverviewComponent,
    NewSimpisPageComponent,
    SimpiListComponent,
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SimpisModule {
}
