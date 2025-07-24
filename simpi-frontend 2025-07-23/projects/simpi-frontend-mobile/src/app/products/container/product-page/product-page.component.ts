import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeWhile, tap, shareReplay, catchError, switchMap, finalize } from 'rxjs/operators';
import { Simpi } from '../../../shared/models/simpi.model';
import { IonSegment, NavController } from '@ionic/angular';
import { ProductService } from '../../../../../../simpi-frontend-common/src/lib/services';
import { Observable } from 'rxjs';
import { ProductResponse, SimpiResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';

@Component({
    selector: 'sim-product-page',
    templateUrl: 'product-page.component.html',
    styleUrls: ['product-page.component.scss']
})

export class ProductPageComponent implements OnInit, OnDestroy {
    @ViewChild('simpiSegment')
    public simpiSegment!: IonSegment;

    public selectedView: string = 'all';
    public displayMode: 'list' | 'card' = 'card';
    public refreshComplete: boolean = false;
    private _productId: string = '';

    public product$: Observable<ProductResponse>;
    public simpis$: Observable<SimpiResponse[]>;

    private _componentActive: boolean = true;
    public selectedProduct: Simpi = {
        id: '2', manufacturer: "Bosch", model: "SDS2400i",
        imageUrl: "./assets/images/dishw/dishw.png", favorite: true
    };

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private simpiService: SimpiService,
        private cdr: ChangeDetectorRef,
        public navCtrl: NavController
    ) { }

    public ngOnInit(): void {
        const { productId } = this.route.snapshot.params;
        this.simpis$ = this.simpiService.simpis$;
        this.product$ = this.productService.getProduct(productId);
        this.simpiService.getSimpisByProductId(productId, false, true).subscribe();
    }

    public onRefreshData(): void {
        this.refreshComplete = false;
        this.cdr.detectChanges();
        this.simpiService.getSimpisByProductId(this._productId, false, true).pipe(
            tap(simpis => {
                if (simpis) {
                    this.cdr.detectChanges();
                }
            }),
            finalize(() => this.refreshComplete = true)
        ).subscribe();
    };

    public goBack(): void {
        this.navCtrl.navigateRoot('/home', { replaceUrl: true });
    }

    public showSteps(simpiId: string): void {
        this.navCtrl.navigateRoot(`/nav/steps/${simpiId}`, { replaceUrl: true });
    }

    public ngAfterViewInit(): void {
        this.simpiSegment.ionChange.pipe(
            takeWhile(() => this._componentActive)
        ).subscribe(d => {
            if (d) this.selectedView = this.simpiSegment.value;
        });
    }

    public ngOnDestroy(): void {
        this._componentActive = false;
    }
}
