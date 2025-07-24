import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { productRoutes } from './product.routing';
import { ProductPageComponent } from './container/product-page/product-page.component';
import { SimpisCardViewComponent } from "./components/simpis-card-view/simpis-card-view.component";
import { SimpisListViewComponent } from './components/simpis-list-view/simpis-list-view.component';
import { ProductOverviewPageComponent } from './container/product-overview-page/product-overview-page.component';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';

@NgModule({
    imports: [IonicModule, SharedModule, RouterModule.forChild(productRoutes)],
    exports: [],
    declarations: [
        ProductOverviewPageComponent,
        ProductPageComponent,
        SimpisCardViewComponent,
        SimpisListViewComponent,
        ProductOverviewComponent
    ],
    providers: [],
})
export class ProductsModule { }
