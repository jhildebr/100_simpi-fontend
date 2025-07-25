import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable, EMPTY } from 'rxjs';
import { map, takeWhile, shareReplay,catchError} from 'rxjs/operators';
import { ProductService } from '../../../../../../simpi-frontend-common/src/lib/services';
import { LoginResponse, ProductResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { StorageService } from '../../../../../../simpi-frontend-common/src/lib/services/storage/storage.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'sim-deleted-product-overview-page',
    template: `
        <ng-container *ngIf="(deletedProducts$ | async) as products">
            <sim-deleted-product-overview [products]='products'
            (restoreProduct)='restoreProduct($event.productId)'
            ></sim-deleted-product-overview>
        </ng-container>
    `
})
export class DeletedProductOverviewPageComponent implements OnInit, OnDestroy {
    private _componentActive: boolean = true;
    private _brandId: string;

    public deletedProducts$: Observable<ProductResponse[]>;
    public errorLoadingData: boolean = false;
    public productForm: UntypedFormGroup;

    constructor(private productService: ProductService) { }

    public ngOnInit(): void {
      StorageService.retrieve(environment.authStorageKey)
        .then(userInfoJson => {
          this._brandId = (JSON.parse(userInfoJson) as LoginResponse)?.homeBrandId;

          this.deletedProducts$ = this.productService.products$.pipe(
            map(products => {
              if (products) {
                return products.filter(x => x.deleted);
              }
            })
          );
          this.loadData();
        });
    }

    private loadData(): void {
        this.errorLoadingData = false;
        this.productService.getProducts(this._brandId, true, true).pipe(
            shareReplay(),
            catchError(() => {
                this.errorLoadingData = true;
                return EMPTY;
            }),
            takeWhile(() => this._componentActive)
        ).subscribe();
    }

    public restoreProduct(productId: string): void {
        this.productService.restoreProduct(productId).pipe(
            takeWhile(() => this._componentActive)
        ).subscribe();
    }

    public ngOnDestroy(): void {
        this._componentActive = false;
    }
}
