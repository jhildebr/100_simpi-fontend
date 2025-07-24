import { Route } from '@angular/router';
import { SimpisRoutingComponent } from './components/simpis-routing/simpis-routing.component';
import { DeletedSimpiOverviewPageComponent } from './container/deleted-simpi-overview-page/deleted-simpi-overview-page.component';
import { SimpiSettingsPageComponent } from './container/simpi-settings-page/simpi-settings-page.component';

export const simpisRoutes: Route[] = [
  {
    path: '',
    component: SimpisRoutingComponent,

    children: [
      {
        path: 'deleted',
        component: DeletedSimpiOverviewPageComponent
      }
    ]
  },
  {
    path: ':simpiAlias/settings',
    component: SimpiSettingsPageComponent
  },
  {
    path: ':simpiAlias',
    loadChildren: () => import('../steps/steps.module').then(m => m.StepsModule)
  }
];
