import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController, IonSlides } from '@ionic/angular';
import { catchError, endWith, map, shareReplay, takeUntil, takeWhile, tap } from 'rxjs/operators';
import {
  DeploymentStateRequest,
  DeploymentStateResponse,
  ResourceResponse,
  ResourceTypeResponse,
  SimpiResponse,
  StepResponse
} from '../../../../../../simpi-frontend-common/src/lib/models';
import { StepEditorComponent } from '../../../../../../simpi-frontend-common/src/step-editor/components/step-editor.component';
import {
  copyEditorStateToStepResponse,
  EditorState,
  editorStateFromStepResponse
} from '../../../../../../simpi-frontend-common/src/step-editor/models/editorState';
import { ScreenType } from '../../../../../../simpi-frontend-web/src/app/shared/models/screenTypes';
import { BehaviorSubject, EMPTY, from, interval, Observable, of, Subject, throwError } from 'rxjs';
import { MEDIATYPE_VIDEO } from 'projects/simpi-frontend-common/src/step-editor/components/editorConstants';
import { OverlayComponent } from '../../../../../../simpi-frontend-common/src/overlay/overlay.component';
import { environment } from '../../../../environments/environment';
import { StepService } from '../../../../../../simpi-frontend-common/src/lib/services/steps/step.service';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY_GUID } from '../../../../../../simpi-frontend-common/src/lib/shared/constants';
import { ActionSheetComponent } from '../action-sheet/action-sheet.component';
import { UrlService } from '../../services/url-service/url.service';
import { SimpiContextService } from '../../../../../../simpi-frontend-common/src/lib/services/simpi-context/simpi-context.service';

const { Share, Browser } = Plugins;

@Component({
  selector: 'sim-steps-slider',
  templateUrl: 'steps-slider.component.html',
  styleUrls: ['steps-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StepsSliderComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  private _showInfoOverlay: boolean;
  private _sliderChangedToFirstStepByRepeatMethod: boolean = false;
  private _buttonClicked$: Subject<boolean> = new Subject();
  private _steps: StepResponse[];

  public hostElement: ElementRef;

  public progressBarValue$: Observable<string> = of(`0%`);
  public feedbackButtonEnabled: boolean = false;
  public resourceType: typeof ResourceTypeResponse = ResourceTypeResponse;
  public infoCardShown: boolean = false;
  public isVideoPaused: boolean;
  public isAudioMuted: boolean = false;
  public screenTypes: typeof ScreenType = ScreenType;
  public swiperIndex: number = 0;
  public config: any = {
    slidesPerView: 1,
    initialSlide: 0,
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    touchEventsTarget: 'container',
    resistanceRatio: 0
  };

  public myProductsSliderOpts: any = {
    initialSlide: 0,
    slidesPerView: 2.25,
    touchRatio: 1.5,
    spaceBetween: 25,
    nested: true,
    preloadImages: true
  };

  public simpis$: Observable<SimpiResponse[]>;

  @ViewChildren('simpiViewers')
  public simpiViewers: QueryList<StepEditorComponent>;

  @ViewChild('lastPageSlider', { static: true })
  public lastPageSlider: IonSlides;

  @ViewChild('swiper', { static: true })
  public swiper: IonSlides;

  @ViewChild('swiper', { read: ElementRef })
  public swiperElRef: ElementRef;

  @ViewChild('sliderContainer')
  public sliderContainer: ElementRef<HTMLDivElement>;

  @ViewChild('overlay')
  public overlay: OverlayComponent;

  @ViewChild('actionSheet')
  public actionSheet: ActionSheetComponent;

  @Input()
  public set steps(val: StepResponse[]) {
    this._steps = val;
    this.cdr?.detectChanges();
  }

  public get steps(): StepResponse[] {
    return this._steps;
  }

  @Input()
  public simpi: SimpiResponse;

  @Input()
  public resources: ResourceResponse[];

  @Input()
  public width: number;

  @Input()
  public height: number;

  @Input()
  public screenType: ScreenType;

  @Input()
  public creatorMode: boolean = false;

  @Input()
  public inAppTextEditMode: boolean = false;

  @Input()
  public set showInfoOverlay(val: boolean) {
    this._showInfoOverlay = val;
    if (this._showInfoOverlay) {
      this.showInfoCard();
    }
  }

  public get showInfoOverlay(): boolean {
    return this._showInfoOverlay;
  }

  @Input()
  public set showNavigation(val: boolean) {
    if (val) {
      this.config.navigation = true;
      this.config.touchRatio = .25;
      this.config.shortSwipes = false;
      this.config.longSwipesRatio = 0;
    } else {
      this.config.navigation = false;
      this.config.touchRatio = 1;
      this.config.shortSwipes = true;
    }
  }

  @Output()
  public onTextEditModeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public goBack: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public loadSimpi: EventEmitter<SimpiResponse> = new EventEmitter<SimpiResponse>();

  private audio: HTMLAudioElement = new Audio();

  constructor(
    private cdr: ChangeDetectorRef,
    private alertController: AlertController,
    private stepService: StepService,
    private simpiService: SimpiService,
    private urlService: UrlService,
    private context: SimpiContextService) {
  }

  public ngOnInit(): void {
    if (this.simpi && !this.creatorMode) {
      const { productId, simpiId } = this.simpi;
      this.simpis$ = this.simpiService.getSimpisByProductId(productId, false, true).pipe(
        map(simpis => {
          if (simpis) {
            if (productId !== environment.mobileCreatedSimpisProductId) {
              return simpis.map((simpi, i) => {
                return {
                  ...simpi,
                  title: `${i + 1}/${simpis.length} ${simpi.title}`
                };
              });
            }
            return simpis;
          }
        }),
        tap(simpis => {
          if (simpis && productId !== environment.mobileCreatedSimpisProductId) {
            const index = simpis.findIndex(simpi => simpi.simpiId === simpiId);
            this.myProductsSliderOpts.initialSlide = index;
          }
        })
      );
    }
    this.simpiViewers.changes.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  public onPlaySimpi(): void {
    this.playMedia();
    this.cdr.detectChanges();
  }

  public onStopSimpi(): void {
    this.pauseMedia();
    this.cdr.detectChanges();
  }

  public onVideoBtnClicked(): void {
    this.isVideoPaused = !this.isVideoPaused;
  }

  public onLoadSimpi(simpi: SimpiResponse): void {
    this.swiper.slideTo(0);
    this.enablePagination();
    this.loadSimpi.emit(simpi);
  }


  public slideTo(index: number): void {
    this.swiper.slideTo(index);
  }

  public onShowInfoCard(): void {
    this.showInfoCard();
  }

  public onTap(e: TouchEvent): void {
    if (!this.showInfoOverlay){
        this.pauseMedia();
        this.playMedia();
    }
}

  private stopProgressBar(): void {
    this._buttonClicked$.next(true);
    this._buttonClicked$.complete();
    this.progressBarValue$ = of(`0%`);
  }

  public repeatSimpi(): void {
    this._sliderChangedToFirstStepByRepeatMethod = true;
    this.stopProgressBar();
    this.enableSwiper();
    this.swiper.slideTo(0);
    this.enablePagination();
    this.swiper.update();
  }

  public onOpenShoppingLink(url: string): void {
    if (url) {
      from(Browser.open({ url: this.urlService.getValidUrl(url) })).pipe(
        catchError(err => {
          return EMPTY;
        })
      ).subscribe();
    }
  }

  public shareSimpi(simpi: SimpiResponse): void {
    this.stopProgressBar();
    if (simpi.deploymentInfo?.deploymentState === DeploymentStateResponse.Public
      || simpi.deploymentInfo?.deploymentState === DeploymentStateResponse.PrivateGroup) {
      this.showNativeShareDialog(simpi);
    } else {
      this.askUserToPublishSimpi(simpi).then((success) => {
        if (success) {
          this.showNativeShareDialog(simpi);
        }
      });
    }
  }

  private showNativeShareDialog(simpi: SimpiResponse): void {
    from(Share.share({
      title: simpi.title,
      text: simpi.title,
      url: `${environment.baseUrl}/player/${simpi.alias}`,
      dialogTitle: 'Share SIMPI'
    })).subscribe();
  }

  public onNextSlide(): void {
    this.swiper.getActiveIndex().then(index => {
      this.swiperIndex = index;
      if (!this.creatorMode && this.swiperIndex === this.steps.length - 1) {
        this.disableSwiper();
        this.pauseMedia();
        this.progressBarValue$ = interval(100)
          .pipe(
            shareReplay(),
            map((progress) => progress === 100 ? `100%` : `${progress}%`),
            takeWhile(progress => progress !== '100%'),
            endWith('100%'),
            takeUntil(this._buttonClicked$),
          );
        this.disablePagination();
      }
      this.cdr.detectChanges();
      const activeStep = this.steps[this.swiperIndex];
      const activePlayer = this.simpiViewers.toArray().find(x => x.imageUrl === activeStep.thumbnailUrl);

      if (activeStep.stepId !== EMPTY_GUID) {
        const editorState = this.getEditorState(activeStep);
        activePlayer.importState(editorState);
      }
      if (this.swiperIndex < this.steps.length - 2) {
        const nextStep = this.steps[this.swiperIndex + 1];
        const nextPlayer = this.simpiViewers.toArray().find(x => x.imageUrl === this.steps[this.swiperIndex + 1].thumbnailUrl);
        if (nextStep && nextStep.stepId !== EMPTY_GUID) {
          const nextEditorState = this.getEditorState(nextStep);
          nextPlayer.importState(nextEditorState);
        }
      }
    });
  }

  public onPrevSlide(): void {
    this.swiper.getActiveIndex().then(index => {
      this.cdr.detectChanges();
      this.swiperIndex = index;

      if (this.swiperIndex > 0) {
        const activeStep = this.steps[this.swiperIndex];
        const activePlayer = this.simpiViewers.toArray().find(x => x.imageUrl === activeStep.thumbnailUrl);


        const nextStep = this.steps[this.swiperIndex + 1];

        if (activeStep && activeStep.stepId !== EMPTY_GUID) {
          const editorState = this.getEditorState(activeStep);

          activePlayer.importState(editorState);
        }
        if (nextStep && nextStep.stepId !== EMPTY_GUID) {
          const nextPlayer = this.simpiViewers.toArray().find(x => x.imageUrl === this.steps[this.swiperIndex + 1].thumbnailUrl);
          const nextEditorState = this.getEditorState(nextStep);
          nextPlayer.importState(nextEditorState);
        }

      } else if (this.swiperIndex === 1) {
        this.cdr.detectChanges();
        const firstStep = this.steps[0];
        const firstEditorState = this.getEditorState(firstStep);
        const firstPlayer = this.simpiViewers.toArray().find(x => x.imageUrl === firstStep.thumbnailUrl);
        firstPlayer.importState(firstEditorState);
      }
    });
  }

  public onEmojiClick(): void {
    this.feedbackButtonEnabled = true;
  }

  private enablePagination(): void {
    document.documentElement.style.setProperty('--simpi-slider-pagination-visibility', 'block');
  }

  private disablePagination(): void {
    document.documentElement.style.setProperty('--simpi-slider-pagination-visibility', 'none');
  }

  public onSlideChanged(): void {
    this.swiper.getActiveIndex().then(index => {
      const activeStep = this.steps[index];
      if (this._sliderChangedToFirstStepByRepeatMethod) {
        this._sliderChangedToFirstStepByRepeatMethod = false;
      } else {
        this.playMedia();
      }
      this.cdr.detectChanges();
    });
  }

  public ngAfterViewInit(): void {
    this.hostElement = this.swiperElRef;
    this.enableSwiper();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        this.cdr.detectChanges();
        switch (propName) {
          case 'steps': {
            if (this.steps && this.simpiViewers && this.simpiViewers.toArray().length) {
              const editorState = this.getEditorState(this.steps[0]);
              this.simpiViewers.toArray()[0].importState(editorState);

              if (this.simpiViewers.toArray().length > 1) {
                const editorStateNext = this.getEditorState(this.steps[1]);
                this.simpiViewers.toArray()[1].importState(editorStateNext);
              }
            }

          }
        }
      }
    }
  }

  public getStepsWithState(): StepResponse[] {
    const activeStep = this.steps[this.swiperIndex];
    const activePlayer = this.simpiViewers.toArray().find(x => x.imageUrl === activeStep.thumbnailUrl);
    this.saveEditorStateToStep(activePlayer.exportState(), activeStep);
    return this.steps;
  }

  public ngOnDestroy(): void {
    this.pauseMedia();
    this.cdr.detectChanges();
    this.enableSwiper();
    this.enablePagination();
    this.audio = undefined;
  }

  public onStickerEditModeChanged(active: boolean): void {
    if (active) {
      this.disableSwiper();
      this.pauseMedia();
    } else {
      this.enableSwiper();
      this.playMedia();
    }
  }

  public onActionSheetVisible(visible: boolean): void {
    this.infoCardShown = visible;
    if (visible) {
      this.disableSwiper();
      this.pauseMedia();
    } else {
      this.enableSwiper();
      this.playMedia();
    }
  }

  public textEditModeChanged(enabled: boolean): void {
    this.onTextEditModeChanged.emit(enabled);
  }

  private setPaginationBulletPosition(height: number = 17): void {
    document.documentElement.style.setProperty('--simpi-slider-pagination-bottom', `${height}px`);
  }

  private getEditorState(step: StepResponse): EditorState {
    return editorStateFromStepResponse(step);
  }

  public saveEditorStateToStep(state: EditorState, step: StepResponse): void {
    copyEditorStateToStepResponse(state, step);
  }

  private showInfoCard(): void {
    this.infoCardShown = true;
    this.cdr.detectChanges();
    this.disableSwiper();
    this.pauseMedia();
  }

  private disableSwiper(): void {
    this.swiper.lockSwipeToNext(true).catch(console.error);
    this.swiper.lockSwipeToPrev(true).catch(console.error);
  }

  private enableSwiper(): void {
    this.swiper.lockSwipeToNext(false).catch(console.error);
    this.swiper.lockSwipeToPrev(false).catch(console.error);
  }

  public beforeSlideChange() {
    this.pauseMedia();
    this.cdr.detectChanges();
    const activeStep = this.steps[this.swiperIndex];
    const activePlayer = this.simpiViewers.toArray().find(x => x.imageUrl === activeStep.thumbnailUrl);
    if (activeStep.stepId !== EMPTY_GUID) {
      this.saveEditorStateToStep(activePlayer.exportState(), activeStep);
    }
  }

  private askUserToPublishSimpi(simpi: SimpiResponse): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        message: 'Your simpi is in private mode. You need to either publish to a private group where everyone with the link has access or publicly for everyone.',
        buttons: [
          {
            text: 'Private Group',
            handler: () =>
              this.changeSimpiDeploymentState(simpi, DeploymentStateRequest.PrivateGroup)
                .subscribe(() => resolve(true), () => resolve(false))
          },
          {
            text: 'Public',
            handler: () =>
              this.changeSimpiDeploymentState(simpi, DeploymentStateRequest.Public)
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

  private changeSimpiDeploymentState(simpi: SimpiResponse, deploymentState: DeploymentStateRequest): Observable<any> {
    return this.simpiService.changeSimpiDeploymentInfo(simpi.simpiId, deploymentState).pipe(
      catchError(this.handleChangeSimpiDeploymentStateHttpError));
  }

  private handleChangeSimpiDeploymentStateHttpError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    console.error(errorMessage);
    alert('Error while publishing your simpi (' + errorMessage + ')');
    return throwError('Could not publish simpi');
  }

  public playMedia() {
    this.playAudioExplanation();
    this.playVideo();

  }

  public pauseMedia() {
    this.pauseAudioExplanation();
    this.pauseVideo();
  }


  public onAudioBtnClicked(): void {
    this.isAudioMuted = !this.isAudioMuted;
    this.audio.muted = this.isAudioMuted;
    if (!this.audio.muted && this.audio.ended) {
      this.playAudioExplanation();
    }
  }

  private playAudioExplanation(): void {
    const activeStep = this.steps[this.swiperIndex];
    if (activeStep?.stepId !== '0' && activeStep?.voiceOverEnabled && activeStep?.stepId) {
      this.audio.oncanplaythrough = () => {
        this.audio.play().catch(e => console.log(e));
      };
      this.audio.src = this.stepService.getStepDescriptionAudioVoiceOverUrl(activeStep.stepId);
      this.audio.load();
    }
  }

  private pauseAudioExplanation(): void {
    this.audio?.pause();
  }

  private playVideo() {
    const activeStep = this.steps[this.swiperIndex];
    if (activeStep?.stepId !== EMPTY_GUID && activeStep?.mediaType === MEDIATYPE_VIDEO) {
      this.context.playVideo();
      this.isVideoPaused = false;
    }
  }

  private pauseVideo() {
    const activeStep = this.steps[this.swiperIndex];
    if (activeStep?.stepId !== EMPTY_GUID && activeStep?.mediaType === MEDIATYPE_VIDEO) {
      this.context.pauseVideo();
      this.isVideoPaused = true;
    }
  }
}
