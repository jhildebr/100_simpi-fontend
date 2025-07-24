import { Component, ChangeDetectorRef, AfterViewInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { StepResponse, ResourceResponse, SimpiResponse } from '../../../../../../simpi-frontend-common/src/lib/models/http/responses';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith, takeWhile, tap } from 'rxjs/operators';
import { StepService } from '../../../../../../simpi-frontend-common/src/lib/services/steps/step.service';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ResourceService } from '../../../../../../simpi-frontend-common/src/lib/services/resources/resource.service';
import { NavController, ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { TabNavService } from '../../../tabNav/tabNav.service';
import { MEDIATYPE_IMAGE } from '../../../../../../simpi-frontend-common/src/step-editor/components/editorConstants';
import { EMPTY_GUID } from '../../../../../../simpi-frontend-common/src/lib/shared/constants';

@Component({
    selector: 'sim-steps-page',
    template: `
    <ion-content class='h-100' *ngIf="(steps$ | async) as steps" scrollY="false">
        <ng-container *ngIf="(simpi$ | async) as simpi">
            <sim-steps-slider class="h-100" [steps]='steps' [height]="height" [width]="width"
            [showInfoOverlay]="showInfoOverlay" [resources]="resources$ | async" [simpi]="simpi"
            (goBack)="onGoBack()" (loadSimpi)="onLoadSimpi($event)"></sim-steps-slider>
        </ng-container>
    </ion-content>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class StepsPageComponent implements AfterViewInit, OnDestroy, ViewDidEnter, ViewWillLeave {
    private _simpiId: string;
    private _componentActive: boolean = true;

    public showInfoOverlay: boolean;
    public height: number = 500;
    public width: number = 500;
    public simpi$: Observable<SimpiResponse>;
    public steps$: Observable<StepResponse[]>;
    public resources$: Observable<ResourceResponse[]>;
    public loading: boolean = false;
    public bottomSheetVisible: boolean;

    constructor(
        private route: ActivatedRoute,
        private stepService: StepService,
        private cdr: ChangeDetectorRef,
        private simpiService: SimpiService,
        private resourceService: ResourceService,
        private navCtrl: NavController,
        private tabNavService: TabNavService) { }

    public ngOnInit(): void {
        this._simpiId = this.route.snapshot.params.simpiId;
        this.steps$ = this.stepService.getSteps(this._simpiId, false, true).pipe(
            distinctUntilChanged(),
            map(steps => {
                if (steps && steps.length) {
                    steps.push({
                        deleted: false,
                        description: null,
                        mediaType: MEDIATYPE_IMAGE,
                        portraitIndicator: null,
                        positionIndex: steps.length,
                        schemaVersion: 2,
                        simpiId: EMPTY_GUID,
                        stepId: EMPTY_GUID,
                        stickers: [],
                        textBackgroundColor: null,
                        textPositionY: 0,
                        thumbnailId: null,
                        title: 'last-page',
                        voiceOverEnabled: false,
                        thumbnailUrl: null
                    });
                }
                return steps;
            })
        );
        this.simpi$ = this.simpiService.getSimpi(this._simpiId).pipe(
            startWith(undefined),
            tap(simpi => {
                if (simpi) {
                    this.showInfoOverlay = simpi.showInfoOverlay;
                }
            })
        );
        this.resources$ = this.resourceService.getResourcesBySimpiId(this._simpiId);
    }

    public onLoadSimpi(simpi: SimpiResponse): void {
        this.steps$ = this.stepService.getSteps(simpi.simpiId, false, true).pipe(
            distinctUntilChanged(),
            map(steps => {
                if (steps && steps.length) {
                    steps.push({
                        deleted: false,
                        description: null,
                        mediaType: MEDIATYPE_IMAGE,
                        portraitIndicator: null,
                        positionIndex: steps.length,
                        schemaVersion: 2,
                        simpiId: EMPTY_GUID,
                        stepId: EMPTY_GUID,
                        stickers: [],
                        textBackgroundColor: null,
                        textPositionY: 0,
                        thumbnailId: null,
                        title: 'last-page',
                        voiceOverEnabled: false,
                        thumbnailUrl: null
                    });
                }
                return steps;
            })
        );
        this.simpi$ = this.simpiService.getSimpi(simpi.simpiId).pipe(
            startWith(undefined),
            tap(simpi => {
                if (simpi) {
                    this.showInfoOverlay = simpi.showInfoOverlay;
                }
            })
        );
        this.resources$ = this.resourceService.getResourcesBySimpiId(simpi.simpiId);
    }

    public ionViewDidEnter(): void {
        this.checkOrientation();
        this.tabNavService.setVisibility('hidden');
    }

    public ionViewWillLeave(): void {
        this.bottomSheetVisible = false;
        this.tabNavService.setVisibility('visible');
        this.stepService.clearSteps();
    }

    public ngAfterViewInit() {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        this.cdr.detectChanges();
    }

    public ngOnDestroy(): void {
        this._componentActive = false;
    }

    public onGoBack(): void {
        this.navCtrl.back();
    }

    private checkOrientation(): void {
        ScreenOrientation.onChange().pipe(
            takeWhile(() => this._componentActive)
        ).subscribe((e: any) => {
            if (e && e.type === 'orientationchange') {
                this.height = window.innerHeight;
                this.width = window.innerWidth;
                this.cdr.detectChanges();
            }
        });
    }
}
