import { Route } from '@angular/router';
import { ProductPageComponent } from './container/product-page/product-page.component';
import { ProductOverviewPageComponent } from './container/product-overview-page/product-overview-page.component';

export const productRoutes: Route[] = [
    { path: 'overview', component: ProductOverviewPageComponent },
    { path: ':productId', component: ProductPageComponent }
]