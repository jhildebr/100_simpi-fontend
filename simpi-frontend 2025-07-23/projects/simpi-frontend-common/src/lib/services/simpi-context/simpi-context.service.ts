import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SimpiContextService {
  private _audioUrl: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  public audioUrl$: Observable<string> = this._audioUrl.asObservable();

  private _resumeAudio: Subject<void> = new Subject<void>();
  public resumeAudio$: Observable<void> = this._resumeAudio.asObservable();

  private _restartAudio: Subject<void> = new Subject<void>();
  public restartAudio$: Observable<void> = this._restartAudio.asObservable();

  private _pauseAudio: Subject<void> = new Subject<void>();
  public pauseAudio$: Observable<void> = this._pauseAudio.asObservable();

  private _muteAudio: Subject<void> = new Subject<void>();
  public muteAudio$: Observable<void> = this._muteAudio.asObservable();

  private _unmuteAudio: Subject<void> = new Subject<void>();
  public unmuteAudio$: Observable<void> = this._unmuteAudio.asObservable();

  private _resumeVideo: Subject<void> = new Subject<void>();
  public resumeVideo$: Observable<void> = this._resumeVideo.asObservable();

  private _restartVideo: Subject<void> = new Subject<void>();
  public restartVideo$: Observable<void> = this._restartVideo.asObservable();

  private _pauseVideo: Subject<void> = new Subject<void>();
  public pauseVideo$: Observable<void> = this._pauseAudio.asObservable();

  private _scaleStrategy: Subject<'scaleStrategyContains' | 'scaleStrategyCover'> = new Subject<"scaleStrategyContains" | "scaleStrategyCover">();
  public scaleStrategy$: Observable<'scaleStrategyContains' | 'scaleStrategyCover'> = this._scaleStrategy.asObservable();

  private _audioHasEnded: boolean = undefined;
  private _videoHasEnded: boolean = undefined;
  private _stepHasVideo: boolean = undefined;
  private _stepHasAudio: boolean = undefined;
  private _audioIsSupposedToPlay: boolean = undefined;
  private _videoIsSupposedToPlay: boolean = undefined;
  private _videoHasStartedToPlay: boolean = undefined;
  private _audioHasStartedToPlay: boolean = undefined;
  private _stepId: string = undefined;
  private _simpiId: string = undefined;
  private _screenOrientationIsLandscape: boolean = undefined;
  private _mediaOrientationIsLandscape: boolean = undefined;
  private _isFirstStep;

  set audioUrl(value: string) {
    this._audioHasEnded = false;
    this._audioUrl.next(value);
  }

  public initialize(hasVideo: boolean, audioUrl: string | undefined, stepId: string, simpiId: string, mediaOrientationIsLandscape: boolean, isFirstStep: boolean): void {
    this._stepId = stepId;
    this._isFirstStep = isFirstStep
    this._simpiId = simpiId;
    this._stepHasVideo = hasVideo;
    this._stepHasAudio = !!audioUrl;
    this._mediaOrientationIsLandscape = mediaOrientationIsLandscape;
    this.calculateScaleStrategy();
    this.audioUrl = audioUrl;

    if (this._stepHasAudio) {
      this._audioIsSupposedToPlay = true;
      this._audioHasEnded = false;
      this._audioHasStartedToPlay = false;
    }

    if (hasVideo) {
      this._videoIsSupposedToPlay = true;
      this._videoHasEnded = false;
      this._videoHasStartedToPlay = false;
    }
  }

  public play(): void {
    this.playVideo();
    this.playAudio();
  }

  public playAudio(): void {
    if (!this._stepHasAudio) {
      return;
    }

    this._audioIsSupposedToPlay = true;
    if (!this._audioHasStartedToPlay || (this._audioHasEnded && (this._videoHasEnded || !this._stepHasVideo))) {
      this._restartAudio.next();
    } else {
      this._resumeAudio.next();
    }
  }

  public pauseAudio(): void {
    if (!this._stepHasAudio) {
      return;
    }

    this._audioIsSupposedToPlay = false;
    this._pauseAudio.next();
  }

  public muteAudio(): void {
    if (!this._stepHasAudio) {
      return;
    }

    this._muteAudio.next();
  }

  public unmuteAudio(): void {
    if (!this._stepHasAudio) {
      return;
    }

    this._unmuteAudio.next();
  }


  public playVideo(): void {
    if (!this._stepHasVideo) {
      return;
    }

    this._videoIsSupposedToPlay = true;
    if (!this._videoHasStartedToPlay || (this._videoHasEnded && (this._audioHasEnded || !this._stepHasAudio))) {
      this._restartVideo.next();
    } else {
      this._resumeVideo.next();
    }
  }

  public pauseVideo(): void {
    if (!this._stepHasVideo) {
      return;
    }
    this._videoIsSupposedToPlay = false;
    this._pauseVideo.next();
  }

  public audioHasEnded(): void {
    this._audioHasEnded = true;
    this._audioIsSupposedToPlay = false;
  }

  public videoHasEnded(): void {
    this._videoHasEnded = true;
    this._videoIsSupposedToPlay = false;
  }

  public videoHasStarted(): void {
    this._videoHasStartedToPlay = true;
  }

  public audioHasStarted(): void {
    this._audioHasStartedToPlay = true;
  }

  public get simpiId(): string {
    return this._simpiId;
  }

  public get stepId(): string {
    return this._stepId;
  }

  public get isFirstStep(): boolean {
    return this._isFirstStep;
  }

  public screenOrientationIsPortrait(): void {
    this._screenOrientationIsLandscape = false;
    this.calculateScaleStrategy();
  }

  public screenOrientationIsLandscape(): void {
    this._screenOrientationIsLandscape = true;
    this.calculateScaleStrategy();
  }

  private calculateScaleStrategy(): void {
    if (this._screenOrientationIsLandscape) {
      this._scaleStrategy.next('scaleStrategyContains');
    } else {
      this._scaleStrategy.next('scaleStrategyCover');
    }
  }}
