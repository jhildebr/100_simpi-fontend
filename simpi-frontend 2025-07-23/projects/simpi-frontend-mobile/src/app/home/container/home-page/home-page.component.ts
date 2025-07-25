import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { distinctUntilChanged, finalize, map, mergeAll, shareReplay, takeWhile } from 'rxjs/operators';
import { ProductService } from '../../../../../../simpi-frontend-common/src/lib/services';
import { ProductResponse, SimpiResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'sim-home',
    templateUrl: 'home-page.component.html',
    styleUrls: ['home-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit, OnDestroy, ViewWillEnter {
    public products$: Observable<ProductResponse[]>;
    public campaignProduct: ProductResponse;
    public mobileCreatedSimpis$: Observable<SimpiResponse[]>;
    public tenItems: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    public fourItems: number[] = [1, 2, 3, 4];

    private _mobileCreatedSimpis: BehaviorSubject<Observable<SimpiResponse[]>> = new BehaviorSubject<Observable<SimpiResponse[]>>(of([]));
    private _componentActive: boolean = true;

    public searchForm: UntypedFormGroup;

    public campaignSliderOpts: any = {
        initialSlide: 0,
        speed: 400,
        loop: true,
        preloadImages: true,
        lazy: false,
        touchEventsTarget: 'container',
        threshold: 5
    };

    public newSliderOpts: any = {
        initialSlide: 0,
        slidesPerView: 2.65,
        spaceBetween: 15,
        touchRatio: 1.5,
        freeMode: true,
        preloadImages: true,
        lazy: false,
        threshold: 5
    };

    public exploreSliderOpts: any = {
        initialSlide: 0,
        slidesPerView: 2.65,
        touchRatio: 1.5,
        spaceBetween: 20,
        freeMode: true,
        preloadImages: true,
        lazy: false,
        threshold: 5
    };

    public categories: any[] = [
        { backgroundColor: '#F4C66F', name: 'Gardening', icon: 'flower-outline' },
        { backgroundColor: '#ACB1C033', name: 'Cycling', icon: 'bicycle-outline' },
        { backgroundColor: '#ACB1C033', name: 'DIY', icon: 'hammer-outline' },
    ];

    constructor(
        private productService: ProductService,
        private simpiService: SimpiService,
        private cdr: ChangeDetectorRef,
        private navCtrl: NavController,
        private fb: UntypedFormBuilder) {
    }

    public ngOnInit(): void {
        this.products$ = this.productService.products$.pipe(
            distinctUntilChanged(),
            shareReplay(1),
            map(products => {
                if (products) {
                    const productsWithoutMobileCreated = products.filter(product => product.productId !== environment.mobileCreatedSimpisProductId);
                    const sortedProducts = productsWithoutMobileCreated.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
                    this.campaignProduct = sortedProducts[0];
                    this.cdr.markForCheck();
                    return sortedProducts.slice(1, 5);
                }
            }),
            takeWhile(() => this._componentActive)
        );
        this.searchForm = this.fb.group({
            searchTerm: [{ value: '', disabled: true }]
        });
    }

    public ionViewWillEnter() {
        this.loadData();
    }

    public ngOnDestroy(): void {
        this._componentActive = false;
    }

    public onRefreshData(e: any): void {
        this.mobileCreatedSimpis$ = of(undefined);
        this.loadData(e);
    }

    public showAllProducts(): void {
        this.navCtrl.navigateForward('/nav/products/overview');
    }

    public showAllNewSimpis(): void {
        this.navCtrl.navigateForward('/nav/simpis/new').catch(console.error);
    }

    public showSimpi(simpiId: string): void {
        this.navCtrl.navigateForward(`/nav/steps/${simpiId}`);
    }

    public showSimpisOfProduct(productId: string): void {
        this.navCtrl.navigateForward(`/nav/simpis/${productId}`);
    }

    public trackByFn(index: number, item: any): number {
        return index;
    }

    private loadData(e?: any): void {
        const allProducts$ = this.productService.getAllPublishedProducts().pipe(
            map(products => {
                if (products) {
                    this.cdr.markForCheck();
                    return products;
                }
                return [];
            })
        );
        const mobileCreatedSimpis$ = this.simpiService.getSimpisByProductId(environment.mobileCreatedSimpisProductId, false, true).pipe(
            map(simpis => {
                if (simpis) {
                    return simpis.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()).slice(0, 10);
                }
                return [];
            })
        );

        forkJoin([allProducts$, mobileCreatedSimpis$]).pipe(
            finalize(() => {
                if (e) {
                    e.complete();
                }
            })
        ).subscribe(result => {
            if (result) {
                const [_, mobileCreatedSimpis] = result;
                if (mobileCreatedSimpis && mobileCreatedSimpis.length) {
                    this._mobileCreatedSimpis.next(of(mobileCreatedSimpis));
                } else {
                    this._mobileCreatedSimpis.next(of([]));
                }
                this.mobileCreatedSimpis$ = this._mobileCreatedSimpis.asObservable().pipe(mergeAll());
                this.cdr.markForCheck();
            }
        });
    }
}
