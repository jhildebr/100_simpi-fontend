import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, from, fromEvent, merge, Observable, Subscription, throwError } from 'rxjs';
import { catchError, debounceTime, mergeMap, switchMap, tap } from 'rxjs/operators';
import { StepService } from '../../../../../../simpi-frontend-common/src/lib/services/steps/step.service';
import { ScreenType } from '../../../../../../simpi-frontend-web/src/app/shared/models/screenTypes';
import {
    DeploymentStateRequest,
    SimpiChangeRequest,
    StepChangeRequest,
    StepResponse
} from '../../../../../../simpi-frontend-common/src/lib/models';
import { StepsSliderComponent } from '../../../shared/components/steps-slider/steps-slider.component';
import { Capacitor, KeyboardResize, Plugins } from '@capacitor/core';
import { AlertController, ModalController, NavController, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { CreateSimpiModalComponent } from '../../components/create-simpi-modal/create-simpi-modal.component';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TabNavService } from '../../../tabNav/tabNav.service';
import { IonPullUpFooterState } from 'ionic-pullup';

@Component({
    selector: 'sim-step-editor-creator-page',
    templateUrl: './step-editor-creator-page.component.html',
    styleUrls: ['./step-editor-creator-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepEditorCreatorPageComponent implements OnInit, ViewWillEnter, ViewWillLeave, AfterViewInit {

    private _subscriptions: Subscription[] = [];
    private _platform: string;
    private _firstThumbnailUrl: string;

    public editTextMode: boolean = false;

    public simpiId: string;
    public steps$: Observable<StepResponse[]>;
    public screenType: ScreenType = ScreenType.HAS_TOUCHSCREEN;

    public height: number = 720;
    public width: number = 360;

    public stickerBottomSheetState: IonPullUpFooterState = IonPullUpFooterState.Collapsed;

    @ViewChild(StepsSliderComponent)
    public stepsSlider: StepsSliderComponent;

    constructor(private stepService: StepService, private cdr: ChangeDetectorRef,
        private route: ActivatedRoute, private modalCtr: ModalController,
        private tabNavService: TabNavService, private simpiService: SimpiService,
        private navCtrl: NavController, private alertController: AlertController,
        private router: Router) {
    }

    public ngOnInit(): void {
        this._platform = Capacitor.getPlatform();
        this.steps$ = this.route.paramMap.pipe(
            switchMap(params => {
                this.simpiId = params.get('simpiId');
                return this.stepService.getSteps(this.simpiId, false, true).pipe(
                    tap(steps => {
                        if (steps && steps.length) {
                            this._firstThumbnailUrl = steps[0].thumbnailUrl;
                        }
                        this.cdr.detectChanges();
                    })
                );
            })
        );

        this._subscriptions.push(
            merge(
                fromEvent(window, 'resize'),
                fromEvent(window, 'orientationchange')
            )
                .pipe(
                    debounceTime(100),
                    tap(() => {
                        this.setScreenSize();
                    })
                ).subscribe());
    }

    public ionViewWillEnter(): void {
        this.tabNavService.setVisibility('hidden');
        this.stickerBottomSheetState = IonPullUpFooterState.Collapsed;
    }

    public onNextClick(): void {
        const stepsWithState = this.stepsSlider.getStepsWithState();
        const updateStepReqs$ = this.getSaveStepRequests(stepsWithState);
        from(this.modalCtr.create({
            component: CreateSimpiModalComponent,
            componentProps: {
                'thumbnail': this._firstThumbnailUrl
            }
        })).pipe(
            tap(modal => {
                modal.present();
            }),
            mergeMap(modal => {
                return from(modal.onDidDismiss()).pipe(
                    switchMap(result => {
                        const { data } = result;
                        if (data) {
                            return this.saveSimpi(data).pipe(
                                mergeMap(resp => {
                                    if (resp.status === 200) {
                                        return forkJoin(updateStepReqs$);
                                    }
                                })
                            );
                        }
                    })
                );
            })
        ).subscribe(() => {
            this.navCtrl.navigateRoot('/nav/home', { replaceUrl: true })
                .then(() => {
                    this.navCtrl.navigateForward(`/nav/steps/${this.simpiId}`).catch(console.error);
                })
                .catch(console.error);
        });
    }

    private getSaveStepRequests(stepsWithState: StepResponse[]) {
        return stepsWithState.map(x => {
            const portraitIndicator = x.portraitIndicator;
            const stepToChange: StepChangeRequest = {
                description: x.title,
                title: x.title,
                stickers: x.stickers,
                portraitIndicatorX1: portraitIndicator.x1,
                portraitIndicatorY1: portraitIndicator.y1,
                portraitIndicatorX2: portraitIndicator.x2,
                portraitIndicatorY2: portraitIndicator.y2,
                textBackgroundColor: x.textBackgroundColor,
                textPositionY: x.textPositionY,
                thumbnailId: x.thumbnailId,
                mediaType: x.mediaType,
                voiceOverEnabled: false,
            };
            const previewImageIds: string[] = x.stickers.map(sticker => sticker.previewImageId);
            return this.stepService.saveStep(x.stepId, stepToChange, previewImageIds);
        });
    }


    private saveSimpi(data: { title: string, description: string, deploymentState: DeploymentStateRequest }): Observable<HttpResponse<any>> {
        const { title, deploymentState, description } = data;
        return this.simpiService.getSimpi(this.simpiId).pipe(
            switchMap(simpi => {
                const updateReq: SimpiChangeRequest = {
                    iconColor: simpi.iconColor,
                    description,
                    title,
                    showInfoOverlay: simpi.showInfoOverlay,
                    deploymentInfo: {
                        deploymentState,
                        releaseDate: new Date(),
                        deletionDate: new Date()
                    },
                    thumbnailId: simpi.thumbnailId,
                    groupName: simpi.groupName,
                };
                return this.simpiService.saveSimpi(this.simpiId, updateReq);
            })
        );
    }

    public ngAfterViewInit(): void {
        if (this._platform === 'ios') {
            Plugins.Keyboard.setResizeMode({
                mode: KeyboardResize.None
            }).then(() => {
                this.setScreenSize();
            }).catch(e => {
                console.error('Could not set keyboardResizeMode', e);
            });
        } else {
            this.setScreenSize();
        }
    }

    public ionViewWillLeave(): void {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
        if (this._platform === 'ios') {
            Plugins.Keyboard.setResizeMode({
                mode: KeyboardResize.Native
            }).catch(e => {
                console.error('Could not set keyboardResizeMode', e);
            });
        }
    }

    public enableEditTextMode(): void {
        this.editTextMode = true;
        this.stickerBottomSheetState = IonPullUpFooterState.Collapsed;
    }

    private setScreenSize() {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        this.cdr.detectChanges();
    }

    public textEditModeChanged(enabled: boolean): void {
        this.editTextMode = enabled;
    }


    public onCloseClick(): void {
        this.askUserToDeleteSimpi(this.simpiId).then(success => {
            if (success) {
                this.router.navigateByUrl('/', { replaceUrl: true }).catch(console.error);
            }
        }).catch(console.error);
    }

    private askUserToDeleteSimpi(simpiId: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            const alert = await this.alertController.create({
                message: 'If you cancel, the simpi will be deleted. How do you want to continue?',
                buttons: [
                    {
                        text: 'Delete',
                        handler: () =>
                            this.deleteSimpi(simpiId)
                                .subscribe(() => resolve(true), () => resolve(false))
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => resolve(false)
                    },
                ],
                cssClass: 'sim-ion-alert',
            });
            await alert.present();
        });
    }

    private deleteSimpi(simpiId: string): Observable<any> {
        return this.simpiService.deleteSimpi(simpiId).pipe(
            catchError(this.handleDeleteSimpiHttpError));
    }

    private handleDeleteSimpiHttpError(error: HttpErrorResponse): Observable<never> {
        let errorMessage: string;
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            if (error.status) {
                errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
            } else {
                errorMessage = error as any;
            }
        }
        console.error(errorMessage);
        alert('Error while deleting your simpi (' + errorMessage + ')');
        return throwError('Could not delete simpi');
    }
}
