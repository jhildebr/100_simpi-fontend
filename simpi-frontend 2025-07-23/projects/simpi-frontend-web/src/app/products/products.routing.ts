import { Route } from '@angular/router';
import { ProductRoutingComponent } from './components/product-routing/product-routing.component';
import { ProductOverviewPageComponent } from './container/product-overview-page/product-overview-page.component';
import { DeletedProductOverviewPageComponent } from './container/deleted-product-overview-page/deleted-product-overview-page.component';
import { ProductOverviewPublicPageComponent } from './container/product-overview-public-page/product-overview-public-page.component';
import { ProductPageComponent } from './container/product-page/product-page.component';
import { ProductSettingsPageComponent } from './container/product-settings-page/product-settings-page.component';

export const productRoutes: Route[] = [
  {
    path: '',
    component: ProductRoutingComponent,
    children: [
      {
        path: '',
        component: ProductOverviewPageComponent
      },
      {
        path: 'deleted',
        component: DeletedProductOverviewPageComponent
      }
    ]
  },
  {
    path: ':productAlias/overview',
    pathMatch: 'full',
    component: ProductOverviewPublicPageComponent
  },
  {
    path: ':productAlias',
    pathMatch: 'full',
    component: ProductPageComponent
  },
  {
    path: ':productAlias/settings',
    pathMatch: 'full',
    component: ProductSettingsPageComponent
  },
  {
    path: ':productAlias/simpis',
    pathMatch: 'prefix',
    loadChildren: () => import('../simpis/simpis.module').then(m => m.SimpisModule)
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
