import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import { ProductOverviewPageComponent } from './container/product-overview-page/product-overview-page.component';
import { ProductRoutingComponent } from './components/product-routing/product-routing.component';
import { productRoutes } from './products.routing';
import { DeletedProductOverviewPageComponent } from './container/deleted-product-overview-page/deleted-product-overview-page.component';
import { DeletedProductOverviewComponent } from './components/deleted-product-overview/deleted-product-overview.component';
import { ProductOverviewPublicPageComponent } from './container/product-overview-public-page/product-overview-public-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductPageComponent } from './container/product-page/product-page.component';
import { ProductSettingsPageComponent } from './container/product-settings-page/product-settings-page.component';
import { DragulaModule } from 'ng2-dragula';
import { ProductListComponent } from './components/product-list/product-list.component';
@NgModule({
  declarations: [
    ProductOverviewComponent,
    ProductOverviewComponent,
    ProductOverviewPageComponent,
    ProductRoutingComponent,
    DeletedProductOverviewPageComponent,
    DeletedProductOverviewComponent,
    ProductOverviewPublicPageComponent,
    ProductDetailsComponent,
    ProductPageComponent,
    ProductSettingsPageComponent,
    ProductListComponent,
  ],
  imports: [
    SharedModule,
    DragulaModule,
    RouterModule.forChild(productRoutes)
  ],
  entryComponents: []
})
export class ProductsModule {
}
