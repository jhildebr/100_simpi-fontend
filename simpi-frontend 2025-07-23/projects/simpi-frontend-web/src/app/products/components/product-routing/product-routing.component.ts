import { Component, OnInit, OnDestroy, AfterContentInit, } from '@angular/core';
import { Router } from '@angular/router';
import { tap, takeWhile, take} from 'rxjs/operators';
import { TabNavItem } from '../../../shared/models/tabNavItem';
import { ProductService } from '../../../../../../simpi-frontend-common/src/lib/services';
import { timer } from 'rxjs';

@Component({
  template: `
    <div class="page-title-container">
      <h1 class="page-title">Products</h1>
      <button (click)="clickAddProductButton($event)" class="simpi-button-dark">+ &nbsp;  Add Product</button>
    </div>
    <sim-tab-nav [routes]='productRoutes'></sim-tab-nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
        display: block;
        padding-top: 30px;
    }
  `]
})
export class ProductRoutingComponent implements OnInit, OnDestroy, AfterContentInit {
  private _componentActive: boolean = true;

  constructor(private productService: ProductService, private router: Router) {
  }

  public productRoutes: TabNavItem[] = [
    { url: './', text: 'Published  ' },
    { url: 'deleted', text: 'Deleted  ' }
  ];

  public ngOnInit(): void {
    this.productService.deleteRestoreOperation$.pipe(
      tap(operation => {
        if (operation) {
          this.getProducts();
        }
      }),
      takeWhile(() => this._componentActive)
    ).subscribe();
  }

  public ngAfterContentInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    this.productService.products$.pipe(
      tap(products => {
        if (products) {
          const publishedProducts = products.filter(p => !p.deleted).length;
          const deletedProducts = products.length - publishedProducts;
          this.productRoutes[0].text = 'Published ' + publishedProducts;
          this.productRoutes[1].text = 'Deleted ' + deletedProducts;
        }
      }),
      takeWhile(() => this._componentActive)
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this._componentActive = false;
  }

  public clickAddProductButton($event: MouseEvent) {
      this.productService.requestAddingProduct();
  }
}
