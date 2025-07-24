import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'projects/simpi-frontend-common/src/lib/services';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { catchError, map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { SimpiResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';

@Component({
    selector: 'sim-deleted-simpi-overview-page',
    template: `
        <ng-container *ngIf="(deletedSimpis$ | async) as simpis">
            <sim-deleted-simpi-overview [simpis]='simpis' (restoreSimpi)='restoreSimpi($event.simpiId)'></sim-deleted-simpi-overview>
        </ng-container>
    `
})
export class DeletedSimpiOverviewPageComponent implements OnInit, OnDestroy {
    private _componentActive: boolean = true;
    private _productId: string;

    public deletedSimpis$: Observable<SimpiResponse[]>;
    public errorLoadingData: boolean = false;

    constructor(private simpiService: SimpiService, private productService: ProductService, private route: ActivatedRoute) { }

    public ngOnInit(): void {
        combineLatest([this.route.parent.params, this.route.root.firstChild.params])
          .pipe(
            map(([parentParams, rootParams]) => {
              return {
                brandAlias: rootParams?.brandAlias,
                productAlias: parentParams?.productAlias,
              };
            }),
            switchMap(({ brandAlias, productAlias }) => this.productService.getProductByAlias(brandAlias, productAlias)),
            tap(prod => {
                if (prod) {
                    this._productId = prod.productId;

                    this.deletedSimpis$ = this.simpiService.simpis$.pipe(
                        map(simpis => {
                            if (simpis) {
                                return simpis.filter(x => x.deleted)
                            }
                        })
                    );
                    this.loadData();
                }
            })
        ).subscribe();
    }

    private loadData(): void {
        this.errorLoadingData = false;
        this.simpiService.getSimpisByProductId(this._productId, true, true).pipe(
            catchError(() => {
                this.errorLoadingData = true;
                return EMPTY;
            }),
            takeWhile(() => this._componentActive)
        ).subscribe();
    }

    public restoreSimpi(simpiId: string): void {
        this.simpiService.restoreSimpi(simpiId).pipe(
            takeWhile(() => this._componentActive)
        ).subscribe();
    }

    public ngOnDestroy(): void {
        this._componentActive = false;
    }
}
