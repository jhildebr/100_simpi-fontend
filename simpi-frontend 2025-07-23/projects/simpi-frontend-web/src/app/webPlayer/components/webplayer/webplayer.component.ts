import {
    AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  Input, OnDestroy, OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import Swiper, { Navigation, Pagination } from 'swiper';
import {
  SimpiResponse,
  StepResponse,
  TranslationResponse,
  SimpiPlaybackResponse,
  StepPlaybackResponse
} from '../../../../../../simpi-frontend-common/src/lib/models';
import { ResourceResponse, ResourceTypeResponse } from 'projects/simpi-frontend-common/src/lib/models';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import { StepSlideComponent } from '../step-slide/stepSlide.component';
import { SimpiTranslationService } from 'projects/simpi-frontend-common/src/lib/services/translations/simpi-translations.service';
import { ScaleStrategy } from 'projects/simpi-frontend-common/src/step-editor/components/scaleStrategy';
import { StepMedia } from '../../../../../../simpi-frontend-common/src/step-editor/components/stepMedia';
import { ResourceService } from 'projects/simpi-frontend-common/src/lib/services/resources/resource.service';
import { SimpiContextService } from 'projects/simpi-frontend-common/src/lib/services/simpi-context/simpi-context.service';
import { STEP_MEDIA_TYPE_LEGACYVIDEO, STEP_MEDIA_TYPE_VIDEO } from 'projects/simpi-frontend-common/src/lib/shared/constants';
import { debounceTime, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'sim-webplayer',
  templateUrl: 'webplayer.component.html',
  styleUrls: ['webplayer.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('0.3s cubic-bezier(0.25, 1, 0.5, 1)', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})

export class WebplayerComponent implements OnDestroy, OnInit, AfterViewInit {

  @Input()
  public set simpiId(value: string) {
    if (value && value != this.simpi?.simpiId) {
      this.loadSimpi(value)
        .catch(console.error);
    }
  }

  @Input()
  public showCloseButton: boolean = true;

  @Input()
  public width: number;

  @Input()
  public height: number;

  @Input()
  public scaleStrategy: ScaleStrategy;

  @Output()
  public close: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public share: EventEmitter<void> = new EventEmitter<void>();

  public swiper: Swiper;

  @ViewChildren('slide')
  public stepSlides: QueryList<StepSlideComponent>;

  @ViewChild('audio')
  public audioEl: ElementRef<HTMLAudioElement>;

  public steps: StepPlaybackResponse[];

  public simpi: SimpiPlaybackResponse;

  public resources: ResourceResponse[];

  public translations: TranslationResponse[];

  public language: string;

  public initialLoadingCompleted: boolean = false;

  private _videoPlayingError: string = null;

  private _active = true;

  private set videoPlayingError(value: string) {
    this._videoPlayingError = value;
    this.isMediaPlayingError = !!this._videoPlayingError || !!this._audioPlayingError;
  }

  private _isAudioMuted: boolean = false;

  public set isAudioMuted(value: boolean) {
    this._isAudioMuted = value;
  }

  public get isAudioMuted(): boolean {
    return this._isAudioMuted;
  }

  private _audioPlayingError: string = null;

  private set audioPlayingError(value: string) {
    this._audioPlayingError = value;
    this.isMediaPlayingError = !!this._videoPlayingError || !!this._audioPlayingError;
  }

  public isMediaPlayingError: boolean = !!this._videoPlayingError || !!this._audioPlayingError;

  public get videoPlayingErrorMessage(): string {
    return this._videoPlayingError;
  }

  public get audioPlayingErrorMessage(): string {
    return this._audioPlayingError;
  }

  private loadMediaSubscription: Subscription;

  public relatedSimpis$: Observable<SimpiResponse[]>;

  public set showInfoOverlay(value: boolean) {
    if (value) {
      this.disableSwiper();
    } else {
      this.enableSwiper();
    }
    this._showInfoOverlay = value;
  }

  public get showInfoOverlay(): boolean {
    return this._showInfoOverlay;
  }

  private _showInfoOverlay: boolean;

  public get swiperIndex(): number {
    return this.swiper?.activeIndex ?? 0;
  }

  public get currentSlide(): StepSlideComponent {
    return this.stepSlides.length ? this.stepSlides.toArray()[this.swiperIndex] : null;
  }

  public hasAudio: boolean = false;

  public canPlay: boolean = false;

  public onSlideChanged(): void {
    const audioUrl = Boolean(this.currentSlide?.step.voiceOverEnabled);
    const videoUrl = Boolean(this.currentSlide?.step.media.find(m => m.type.toLowerCase() == STEP_MEDIA_TYPE_VIDEO || m.type.toLowerCase() == STEP_MEDIA_TYPE_LEGACYVIDEO));
    this.hasAudio = audioUrl;
    this.canPlay = audioUrl || videoUrl;

    this.audioEl.nativeElement.oncanplaythrough = undefined;
    this.loadMediaSubscription?.unsubscribe();
    this.stopAudio();

    if (this.currentSlide && this.audioEl?.nativeElement) {
      this.loadMediaSubscription = this.currentSlide.stepMedia$.subscribe((stepMedia: StepMedia) => {
        const hasVideo = stepMedia.mediaType.toLowerCase() === STEP_MEDIA_TYPE_VIDEO || stepMedia.mediaType.toLowerCase() === STEP_MEDIA_TYPE_LEGACYVIDEO;
        this.context.initialize(hasVideo,
          stepMedia.audioUrl,
          this.currentSlide?.step?.stepId,
          this.simpi?.simpiId,
          stepMedia.mediaOrientationIsLandscape,
          this.steps?.findIndex(step => step.stepId === this.currentSlide?.step?.stepId) === 0,
        );
        this.updateScreenOrientationInContext();
        if (!this.showInfoOverlay) {
          this.context.play();
        }

        // this.loadAudio(stepMedia.audioUrl);
        if (!this.showInfoOverlay) {
          this.audioEl.nativeElement.oncanplaythrough = () => {
            // playAudio was called here, subjected to be removed --mbue
            this.audioEl.nativeElement.oncanplaythrough = undefined;
          };
        }
      });
    }
  }

  public resourceType: typeof ResourceTypeResponse = ResourceTypeResponse;


  constructor(
    private ref: ElementRef,
    private translationService: SimpiTranslationService,
    private simpiService: SimpiService,
    private resourceService: ResourceService,
    private context: SimpiContextService) {
  }

  public ngOnInit(): void {
    this.rescale();
  }

  public ngAfterViewInit(): void {
    this.subscribeToContext();
    this.subscribeToResizeAndOrientationChange();
  }

  public ngOnDestroy(): void {
    this._active = false;
    this.loadMediaSubscription?.unsubscribe();
  }

  private async loadSimpi(simpiId: string): Promise<void> {
    // 1. Initial loading of metadata
    //  * information about all steps and their respective mediaIds ("what to load")
    this.simpi = await this.simpiService.getSimpiForPlayback(simpiId).toPromise();
    this.steps = this.simpi.steps;
    this.resources = this.simpi.resources.map(r => {
      if (r)
      {
        r.thumbnailUrl = this.resourceService.getResourceImageUrl(r.thumbnailId);
      }
      return r;
    });
    this.showInfoOverlay = this.simpi.showInfoOverlay;
    this.language = this.simpi.bestTranslationTarget;
    this.translations = this.simpi.translations;
    this.initialLoadingCompleted = true;

    this.stepSlides.setDirty();

    setTimeout(async () => {
      this.initializeSwiper();
      this.initializeLastPageSwiper();
      
      if (this.showInfoOverlay) {
        this.disableSwiper();
      }

      this.onSlideChanged();

      // 2. Load step media (image / video, audio, etc.)
      for (let slide of this.stepSlides) {
        await slide.loadMedia();
      }

      this.relatedSimpis$ = this.simpiService.getSimpisByProductId(this.simpi.productId);
    }, 0);
  }

  public translatedTitle(step: StepResponse): Observable<string> {
    return of(this.translations.find(t => t?.associatedStepId == step.stepId)?.translatedTitle ?? step.title);
  }

  public onAudioBtnClicked(): void {
    this.toggleSound();
  }

  public openShoppingLink(shoppingLinkUrl: string): void {
    if (shoppingLinkUrl) {
      window.open('https://' + shoppingLinkUrl, '_blank');
    }
  }

  public playSimpi(): void {
    this.showInfoOverlay = false;
    this.context.playVideo();
    this.context.playAudio();
  }

  public toggleSound(): void {
    this.isAudioMuted = !this.isAudioMuted;

    if (this.isAudioMuted) {
      this.context.muteAudio();
    }
    else {
      this.context.unmuteAudio();
    }
  }

  /* Last-slide-specific (should probably be moved into sim-last-slide component */

  public lastPageSwiper: Swiper;

  public onLastSwiperTap(): void {
    this.disableSwiper();
  }

  public onLastSwiperTouchEnd(): void {
    this.enableSwiper();
  }

  public async selectRelatedSimpi(simpi: SimpiResponse): Promise<void> {
    this.enableSwiper();
    await this.loadSimpi(simpi.simpiId);
    this.repeatSimpi();
  }

  private disableSwiper(): void {
    if (this.swiper) {
      this.swiper.allowSlideNext = false;
      this.swiper.allowSlidePrev = false;
    }
  }

  private enableSwiper(): void {
    if (this.swiper) {
      this.swiper.allowSlideNext = true;
      this.swiper.allowSlidePrev = true;
    }
  }

  public repeatSimpi(): void {
    this.swiper?.slideTo(0);
    this.showInfoOverlay = true;
    this.disableSwiper();
  }

  public onTap(e: TouchEvent | PointerEvent): void {
    if (this.showInfoOverlay) {
      this.playSimpi();
      e.preventDefault();
      e.stopPropagation();
    }
  }

  public rescale(): void {
    this.width = this.ref.nativeElement.clientWidth;
    this.height = this.ref.nativeElement.clientHeight;
  }

  public onVideoPlayError(stepId_error: [string, string]): void {
    if (stepId_error[0] === this.currentSlide?.step?.stepId) {
      this.videoPlayingError = stepId_error[1];

      this.context.pauseAudio();
    }
  }

  public onAudioEnded(): void {
    this.context.audioHasEnded();
    this.stopAudio();
  }

  private loadAudio(audioSrc: string): void {
    if (audioSrc && this.audioEl?.nativeElement) {
      this.audioEl.nativeElement.autoplay = false;
      this.audioEl.nativeElement.loop = false;
      this.audioEl.nativeElement.src = audioSrc;
      this.audioEl.nativeElement.load();
      this.audioEl.nativeElement.preload = 'metadata';
    }
  }

  private playAudio(fromBeginning: boolean = true): void {
    if (!this.audioEl?.nativeElement) {
      console.warn('WebplayerComponent: <audio>-Element is undefined. Not calling play().');
      return;
    }

    console.debug('WebplayerComponent: play() called.');

    if (fromBeginning) {
      this.audioEl.nativeElement.pause();
      this.audioEl.nativeElement.currentTime = 0; // start from beginning (e.g., if audio should be played a second time)
    }
    this.audioEl.nativeElement.play()
      .then(() => {
        this.setAudioIsPlaying();
        this.context.audioHasStarted();
        console.debug('WebplayerComponent: Audio is playing.');
        this.audioEl.nativeElement.oncanplay = undefined;
      })
      .catch((error) => {
        this.setAudioError(error);
        console.error('WebplayerComponent: Error playing audio: ' + error);
        this.context.pauseVideo();

        // retry because Safari sometimes only loads audio after first call to play()
        this.audioEl.nativeElement.oncanplay = () => {
          this.audioEl.nativeElement.play()
            .then(() => {
              this.setAudioIsPlaying();
              this.context.audioHasStarted();
              console.debug('WebplayerComponent: Audio is playing.');
              this.audioEl.nativeElement.oncanplay = undefined;
            })
            .catch((error) => {
              this.setAudioError(error);
              console.error('WebplayerComponent: Error playing audio: ' + error);
              this.context.pauseVideo();
            });
        };
      });
  }

  private subscribeToContext(): void {
    this.context.restartAudio$.pipe(takeWhile(() => this._active)).subscribe(() => {
        this.playAudio(true);
    });

    this.context.resumeAudio$.pipe(takeWhile(() => this._active)).subscribe(() => {
        this.playAudio(false);
    });

    this.context.pauseAudio$.pipe(takeWhile(() => this._active)).subscribe(() => {
        this.pauseAudio();
    });

    this.context.muteAudio$.pipe(takeWhile(() => this._active)).subscribe(() => {
        this.muteAudio(true);
    });

    this.context.unmuteAudio$.pipe(takeWhile(() => this._active)).subscribe(() => {
        this.muteAudio(false);
    });

    this.context.audioUrl$.pipe(takeWhile(() => this._active)).subscribe(url => {
        this.loadAudio(url);
    });
  }

  private subscribeToResizeAndOrientationChange(): void {
      const resize$ = fromEvent(window, 'resize');
      const orientationChange$ = fromEvent(window, 'orientationchange');
      merge(resize$, orientationChange$)
      .pipe(
        debounceTime(100),
        tap(() => {
          this.rescale();
        }),
        takeWhile(() => this._active)
      ).subscribe(() => {
        this.updateScreenOrientationInContext();
      });
  }

  private updateScreenOrientationInContext(): void {
    const mql = window.matchMedia('(orientation: portrait)');
    if (mql?.matches || window.screen?.orientation?.type === 'portrait-primary' || window.screen?.orientation?.type === 'portrait-secondary') {
      this.context.screenOrientationIsPortrait();
      console.log('Device orientation is detected as portrait');
    } else {
      this.context.screenOrientationIsLandscape();
      console.log('Device orientation is detected as landscape');
    }
  }

  private setAudioIsPlaying(): void {
    this.audioPlayingError = null;
  }

  private setAudioError(error: string): void {
    this.audioPlayingError = error;
  }

  private pauseAudio(): void {
    this.audioEl?.nativeElement?.pause();
  }

  public stopAudio(): void {
    if (!this.audioEl?.nativeElement) {
      return;
    }

    this.pauseAudio();
    this.audioEl.nativeElement.currentTime = 0;
  }

  private muteAudio(muted: boolean): void {
    if (!this.audioEl?.nativeElement) {
      return;
    }

    this.audioEl.nativeElement.muted = muted;
  }

  private initializeSwiper(): void {
    Swiper.use([Navigation, Pagination]);
    
    const swiperElement = document.querySelector('.swiper-container');
    if (swiperElement && !this.swiper) {
      this.swiper = new Swiper(swiperElement as HTMLElement, {
        direction: 'horizontal',
        slidesPerView: 1,
        keyboard: true,
        mousewheel: true,
        resistanceRatio: 0,
        on: {
          slideChange: () => {
            this.onSlideChanged();
          },
          tap: (swiper, event) => {
            this.onTap(event as TouchEvent);
          }
        }
      });
    }
  }

  private initializeLastPageSwiper(): void {
    const lastSwiperElement = document.querySelector('.last-slide-slider .swiper-container');
    if (lastSwiperElement && !this.lastPageSwiper) {
      this.lastPageSwiper = new Swiper(lastSwiperElement as HTMLElement, {
        initialSlide: 0,
        slidesPerView: 2.25,
        touchRatio: 2,
        spaceBetween: 25,
        nested: true,
        on: {
          tap: () => {
            this.onLastSwiperTap();
          },
          touchEnd: () => {
            this.onLastSwiperTouchEnd();
          }
        }
      });
    }
  }

  public nextSlide(): void {
    this.swiper?.slideNext();
  }

  public prevSlide(): void {
    this.swiper?.slidePrev();
  }
}
