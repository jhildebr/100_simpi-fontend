import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../../simpi-frontend-common/src/lib/services';
import { ProductResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: 'product-overview-page.component.html',
})

export class ProductOverviewPageComponent implements OnInit {
  public products$: Observable<ProductResponse[]>;

  constructor(private productService: ProductService, private navCtrl: NavController) {
  }

  public ngOnInit(): void {
    this.products$ = this.productService.products$.pipe(
      distinctUntilChanged(),
      shareReplay(1),
      map(products => {
        if (products) {
          return products
            .filter(product => product.productId !== environment.mobileCreatedSimpisProductId)
            .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
        } else {
          return [];
        }
      })
    );
    this.productService.getAllPublishedProducts().subscribe();
  }

  public onNavigateToSimpi(productId: string): void {
    this.navCtrl.navigateForward(`/nav/simpis/${productId}`).catch(console.error);
  }

  public onBackClick(): void {
    this.navCtrl.back();
  }
}
