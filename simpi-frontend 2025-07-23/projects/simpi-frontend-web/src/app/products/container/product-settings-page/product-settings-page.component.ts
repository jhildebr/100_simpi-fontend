import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { ProductService } from '../../../../../../simpi-frontend-common/src/lib/services';
import { ProductResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, takeWhile } from 'rxjs/operators';
import { UploadImgModalComponent } from '../../../shared/components/upload-img-modal/upload-img-modal.component';
import { Location } from '@angular/common';

@Component({
  template: `
    <sim-product-settings [product]="product$ | async" [uploadImageModalComponent]="uploadImageModalComponent"
                          (navigateBack)="navigateBack()" (aliasChanged)="onAliasChanged($event)">
    </sim-product-settings>
  `,
  styles: [``]
})

export class ProductSettingsPageComponent implements OnInit, OnDestroy {

  private componentActive: boolean = false;

  private brandAlias: string;

  private navigateBackToOverview: boolean;

  public product$: Observable<ProductResponse>;

  public uploadImageModalComponent: typeof UploadImgModalComponent = UploadImgModalComponent;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, private location: Location) {
  }

  public ngOnInit(): void {
    this.componentActive = true;

    this.getRoutingParamsObservable()
      .pipe(
        takeWhile(() => this.componentActive)
      )
      .subscribe(({ brandAlias, productAlias, parent }) => {
        if (brandAlias && productAlias) {
          this.brandAlias = brandAlias;
          this.product$ = this.productService.getProductByAlias(brandAlias, productAlias);
        }
        this.navigateBackToOverview = parent === 'overview';
      });
  }

  private getRoutingParamsObservable() {
    return combineLatest([this.route.root.firstChild.paramMap, this.route.paramMap, this.route.queryParamMap])
      .pipe(
        takeWhile(() => this.componentActive),
        map(([rootParamMap, routeParamMap, queryParamMap]) => {
          return {
            brandAlias: rootParamMap?.get('brandAlias'),
            productAlias: routeParamMap?.get('productAlias'),
            parent: queryParamMap.get('parent'),
          };
        }),
        filter(({ brandAlias, productAlias }) => !!brandAlias && !!productAlias)
      );
  }

  public ngOnDestroy(): void {
    this.componentActive = false;
  }

  public navigateBack(): void {
    if (this.navigateBackToOverview) {
      this.router.navigate(['../..'], { relativeTo: this.route }).catch(console.error);
    } else {
      this.router.navigate(['..'], { relativeTo: this.route }).catch(console.error);
    }
  }

  public onAliasChanged(newAlias: string): void {
    this.location.replaceState(`/${this.brandAlias}/cockpit/products/${newAlias}/settings`);
  }
}
