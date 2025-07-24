import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize, map, startWith } from 'rxjs/operators';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import { SimpiResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { ProductService } from '../../../../../../simpi-frontend-common/src/lib/services';

@Component({
    template: `
    <ion-header class="no-border" translucent="true">
        <ion-toolbar>
            <ion-button class="back-btn" slot="start" (click)="onGoBack()">
                <ion-icon src="/assets/svg/back.svg"
                        class="back-icon"
                        slot="icon-only">
                </ion-icon>
            </ion-button>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <sim-simpi-overview [loading]="loading" [simpis]="simpis$ | async"
            [productPageImageUrl]="productPageImageUrl$ | async" (navigateToSimpi)="onNavigateToSimpi($event)"
            (goBack)="onGoBack()">
        </sim-simpi-overview>
    </ion-content>
    `
})

export class SimpiOverviewPageComponent implements OnInit {
    public loading: boolean = true;
    public simpis$: Observable<SimpiResponse[]>;
    public productPageImageUrl$: Observable<string>;

    constructor(private route: ActivatedRoute, private simpiService: SimpiService,
        private productService: ProductService, private navCtrl: NavController) { }

    public ngOnInit(): void {
        const { productId } = this.route.snapshot.params;
        this.simpis$ = this.simpiService.getSimpisByProductId(productId, false, true, false).pipe(
            finalize(() => this.loading = false)
        );

        this.productPageImageUrl$ = this.productService.getProduct(productId).pipe(
            startWith(undefined),
            map(product => product?.productPageImageUrl)
        );
    }

    public onNavigateToSimpi(simpiId: string): void {
        this.navCtrl.navigateForward(`/nav/steps/${simpiId}`);
    }

    public onGoBack(): void {
        this.navCtrl.back();
    }
}
