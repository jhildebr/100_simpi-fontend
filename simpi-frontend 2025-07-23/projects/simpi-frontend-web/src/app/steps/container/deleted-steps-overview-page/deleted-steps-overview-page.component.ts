import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SimpiService } from 'projects/simpi-frontend-common/src/lib/services/simpis/simpi.service';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError, takeWhile, tap, switchMap } from 'rxjs/operators';
import { StepResponse } from '../../../../../../simpi-frontend-common/src/lib/models/http/responses/stepResponse';
import { StepService } from '../../../../../../simpi-frontend-common/src/lib/services/steps/step.service';

@Component({
    template: `
        <ng-container *ngIf="(deletedSteps$ | async) as steps">
            <sim-deleted-steps-overview [steps]='steps' (restoreStep)='restoreStep($event.stepId)'></sim-deleted-steps-overview>
        </ng-container>
    `
})

export class DeletedStepsOverviewPageComponent implements OnInit {
    private _componentActive: boolean = true;
    private _simpiId: string;

    public deletedSteps$: Observable<StepResponse[]>;
    public errorLoadingData: boolean = false;

    constructor(private stepService: StepService, private route: ActivatedRoute, private simpiService: SimpiService) { }

    public ngOnInit(): void {
        this.route.parent.params.pipe(
            switchMap(({ simpiAlias }) => this.simpiService.getSimpiByAlias(simpiAlias)),
            tap(simpi => {
                this._simpiId = simpi.simpiId;
                this.subscribeToSteps();
                this.loadData();
            })
        ).subscribe();
    }

    private subscribeToSteps(): void {
        this.deletedSteps$ = this.stepService.steps$.pipe(
            map(steps => {
                if (steps) {
                    return steps.filter(x => x.deleted)
                }
            })
        );
    }

    private loadData(): void {
        this.errorLoadingData = false;
        this.stepService.getSteps(this._simpiId, true, true).pipe(
            catchError(() => {
                this.errorLoadingData = true;
                return EMPTY;
            }),
            takeWhile(() => this._componentActive)
        ).subscribe();
    }

    public restoreStep(stepId: string): void {
        this.stepService.restoreStep(stepId).pipe(
            takeWhile(() => this._componentActive)
        ).subscribe();
    }

    public ngOnDestroy(): void {
        this._componentActive = false;
    }
}