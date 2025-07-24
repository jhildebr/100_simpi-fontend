import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map, switchMap, takeWhile, tap, withLatestFrom } from 'rxjs/operators';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import { ProductService } from '../../../../../../simpi-frontend-common/src/lib/services';
import { SimpiResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { SimpiAssistantService } from '../../../simpis/services/simpi-assistant.service';
import { TabNavItem } from '../../../shared/models/tabNavItem';
import { StepService } from '../../../../../../simpi-frontend-common/src/lib/services/steps/step.service';

@Component({
    selector: 'sim-steps-routing',
    templateUrl: './steps-routing.component.html',
    styleUrls: ['./steps-routing.component.scss']
})
export class StepsRoutingComponent implements OnInit, OnDestroy {
    private _componentActive: boolean = true;
    private _simpiId: string;
    private _productId: string;

    public simpi: SimpiResponse;
    public stepsRoutes: TabNavItem[] = [{ url: 'steps' }, { url: 'resources' }];

    constructor(private route: ActivatedRoute, private simpiService: SimpiService,
        private productService: ProductService,
        private simpiAssistantService: SimpiAssistantService, private stepService: StepService,
        private router: Router) {
    }

    public ngOnInit(): void {
        const params$ = this.route.params;

      // combineLatest([params$, this.route.root.firstChild.params])
      //   .pipe(
      //     map(([params, rootParams]) => {
      //       return {
      //         brandAlias: rootParams?.brandAlias,
      //         productAlias: params?.productAlias,
      //       };
      //     }),
      //       switchMap(({ brandAlias, productAlias }) => this.productService.getProductByAlias(brandAlias, productAlias)),
      //       tap(prod => {
      //           if (prod) {
      //               this._productId = prod.productId;
      //           }
      //       }),
      //       withLatestFrom(params$),
      //       switchMap(([prod, params]) => this.simpiService.getSimpiByAlias(params.simpiAlias)),
      //       tap(simpi => {
      //           if (simpi) {
      //               this._simpiId = simpi.simpiId;
      //           }
      //       }),
      //       tap(_ => {
      //           this.loadSteps();
      //           this.subscribeToSteps();
      //       })
      //   ).subscribe();
    }

    private loadSteps(): void {
        this.stepService.getSteps(this._simpiId, true, true).pipe(
            tap(steps => {
                if (steps) {
                    this.stepService.setError(false);
                }
            }),
            takeWhile(() => this._componentActive)
        ).subscribe();
    }

    private subscribeToSteps(): void {
        this.stepService.steps$.pipe(
            distinctUntilChanged(),
            tap(steps => {
                if (steps && steps.length) {
                    const deletedSteps = steps.filter(x => x.deleted);
                    if (deletedSteps.length > 0 && this.stepsRoutes.length !== 5) {
                        this.stepsRoutes.push({
                            url: 'deleted',
                            text: 'Deleted'
                        });
                    }
                    if (deletedSteps.length === 0) {
                        const url = this.router.url.split('/');
                        if (url[7] === 'deleted') {
                            this.router.navigate([`../${this._simpiId}/steps`], { relativeTo: this.route });
                        }
                        if (this.stepsRoutes.length === 5) {
                            this.stepsRoutes.splice(this.stepsRoutes.length - 1, 1);
                        }
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
