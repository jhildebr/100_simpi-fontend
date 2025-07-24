import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile, tap } from 'rxjs/operators';
import { TabNavItem } from '../../../shared/models/tabNavItem';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';

@Component({
    template: `
    <sim-tab-nav [routes]='simpiRoutes'></sim-tab-nav>
    <router-outlet></router-outlet>
    `
})

export class SimpisRoutingComponent implements OnInit, OnDestroy {
    private _componentActive: boolean = true;
    private _productId: string;

    public simpiRoutes: TabNavItem[] = [{ url: 'simpis', text: 'SIMPIs' }];

    constructor(
        private route: ActivatedRoute,
        private simpiService: SimpiService,
        private router: Router) {
    }

    public ngOnInit(): void {
        this.subscribeToSimpis();
        this.simpiService.deleteRestoreOperation$.pipe(
            tap(operation => {
                if (operation) {

                }
            }),
            takeWhile(() => this._componentActive)
        ).subscribe();
    }

    private subscribeToSimpis(): void {
        this.simpiService.simpis$.pipe(
            tap(simpis => {
                if (simpis && simpis.length) {
                    const deletedSimpis = simpis.filter(x => x.deleted);
                    if (deletedSimpis.length >= 1 && this.simpiRoutes.length !== 2) {
                        this.simpiRoutes.push({
                            url: 'deleted',
                            text: 'Deleted'
                        });
                    }
                    if (deletedSimpis.length === 0) {
                        const url = this.router.url.split('/');
                        if (url[5] === 'deleted') {
                            this.router.navigate([`../${this._productId}/simpis`], { relativeTo: this.route });
                        }
                        this.simpiRoutes.splice(2, 1);
                    }
                }
            }),
            takeWhile(() => this._componentActive)
        ).subscribe();
    }

    public ngOnDestroy(): void {
        this._componentActive = false;
    }
}
