import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Observer, of, ReplaySubject } from 'rxjs';
import { StepService } from '../../../../../../simpi-frontend-common/src/lib/services/steps/step.service';
import { StepMedia } from '../../../../../../simpi-frontend-common/src/step-editor/components/stepMedia';
import { MediaResponse, StepPlaybackResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { catchError, filter, map, share, takeWhile } from 'rxjs/operators';
import { editorStateFromStepResponse } from 'projects/simpi-frontend-common/src/step-editor/models/editorState';
import { StepEditorComponent } from 'projects/simpi-frontend-common/src/step-editor/components/step-editor.component';
import { ScaleStrategy } from 'projects/simpi-frontend-common/src/step-editor/components/scaleStrategy';
import { SimpiContextService } from 'projects/simpi-frontend-common/src/lib/services/simpi-context/simpi-context.service';

@Component({
    selector: 'sim-step-slide',
    templateUrl: 'stepSlide.component.html',
    styleUrls: ['stepSlide.component.scss']
})

export class StepSlideComponent implements OnDestroy {

  constructor(private stepService: StepService, private httpClient: HttpClient, private context: SimpiContextService) {
  }

  @Input()
  public set step(value: StepPlaybackResponse) {
    const state = editorStateFromStepResponse(value);
    this.editor?.importState(state);
    this._step = value;
  }

  public get step(): StepPlaybackResponse {
    return this._step;
  }

  @Input()
  public set title(value: string) {
    this.editor.updateTitle(value);
  }

  @Input()
  public set active(value: boolean) {
    this._active = value;

    // Start or stop loading if necessary
    if (value && !this.loaded && !this.currentDownload) {
      this.loadMedia();
    } else if (!value && !this.loaded && this.currentDownload) {
      this.abortDownload();
    }
  }

  public get active(): boolean {
    return this._active;
  }

  @ViewChild(StepEditorComponent, { static: true })
  public editor: StepEditorComponent;

  @Input()
  public simpiId: string;

  private _step: StepPlaybackResponse;

  @Input()
  public voiceOverLanguage: string;

  @Input()
  public width: number;

  @Input()
  public height: number;

  @Input()
  public isVideoPaused: boolean = undefined;

  @Input()
  public isVideoMuted: boolean = undefined;

  @Output()
  public videoStarted: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public videoPaused: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public videoEnded: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public videoStopped: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public videoMutedChanged: EventEmitter<[string, boolean]> = new EventEmitter<[string, boolean]>();

  @Output()
  public videoPlayError: EventEmitter<[string, string]> = new EventEmitter<[string, string]>();

  private _active: boolean = false;

  @Input()
  public scaleStrategy: ScaleStrategy;

  private downloadProgress: BehaviorSubject<number> = new BehaviorSubject(0);

  public downloadProgress$: Observable<number> = this.downloadProgress.asObservable();

  private stepMedia: ReplaySubject<StepMedia> = new ReplaySubject(1);

  public stepMedia$: Observable<StepMedia> = this.stepMedia.asObservable();

  private currentDownload: Promise<void> = null;

  public showLoadingBar: boolean = true;

  public loaded: boolean = false;

  private aborted: boolean = false;

  private imageUrl: string;

  private videoUrl: string;

  private audioUrl: string;

  public ngOnDestroy(): void {
    URL.revokeObjectURL(this.imageUrl);
    URL.revokeObjectURL(this.videoUrl);
    URL.revokeObjectURL(this.audioUrl);
    this.active = false;
  }

  public loadMedia(): Promise<void> {
    if (this.currentDownload && !this.aborted) {
      return this.currentDownload;
    } else {
    this.aborted = false;
    return this.currentDownload = this._loadMedia();
    }
  }

  private async _loadMedia(): Promise<void> {
    console.debug(`Beginning download of step ${this.step.stepId}`);
    let mediaType: string;
    let videoDownloadUrl: string;
    let imageDownloadUrl: string;
    let audioDownloadUrl: string;
    const byDescendingHeight = (v1: MediaResponse, v2: MediaResponse) => v2.height - v1.height;
    const videos = this.step.media.filter(v => v.type == 'Video');
    const images = this.step.media.filter(v => v.type == 'Image');
    const legacyVideos = this.step.media.filter(v => v.type == 'LegacyVideo');
    let mediaOrientationIsLandscape: boolean;
    if (videos.length || legacyVideos.length) {
      mediaType = 'video';
      if (videos.length) {
        const selectedVideo = videos.sort(byDescendingHeight)[0];
        mediaOrientationIsLandscape = selectedVideo.width > selectedVideo.height;
        videoDownloadUrl = this.stepService.getStepVideoUrl(selectedVideo.assetId);
      } else {
        const selectedLegacyVideo = legacyVideos.sort(byDescendingHeight)[0];
        videoDownloadUrl = this.stepService.getStepImageUrl(selectedLegacyVideo.assetId);
        mediaOrientationIsLandscape = selectedLegacyVideo.width > selectedLegacyVideo.height;
      }
    } else if (images.length) {
      mediaType = 'image';
      const selectedImage = images.sort(byDescendingHeight)[0];
      imageDownloadUrl = this.stepService.getStepImageUrl(selectedImage.assetId);
      mediaOrientationIsLandscape = selectedImage.width > selectedImage.height;
    } else {
        mediaType = 'unknown';
    }
    if (this.step.voiceOverEnabled) {
      audioDownloadUrl = this.stepService.getStepDescriptionAudioVoiceOverUrl(this.step.stepId, this.voiceOverLanguage);
    }

    const [image, video, audio] = await this.download([imageDownloadUrl, videoDownloadUrl, audioDownloadUrl], this.downloadProgress);

    if (!this.aborted) {
      this.imageUrl = this.createObjectUrl(image);
      this.videoUrl = this.createObjectUrl(video);
      this.audioUrl = this.createObjectUrl(audio);
      const media: StepMedia = {
        mediaType,
        imageUrl: this.imageUrl,
        videoUrl: this.videoUrl,
        audioUrl: this.audioUrl,
        mediaOrientationIsLandscape,
      };
      this.stepMedia.next(media);
      this.loaded = true;
      setTimeout(() => this.showLoadingBar = false, 2000);
      console.debug(`Download of step ${this.step.stepId} completed`);
    }
  }

  private async download(urls: string[], progress: Observer<number>): Promise<Blob[]> {
    const options = {
      observe: 'events' as const,
      reportProgress: true,
      responseType: 'blob' as const,
    };

    const downloads: Observable<HttpEvent<Blob>>[] = [];

    for (const url of urls) {
      if (url == null || url == undefined) {
        downloads.push(of(null));
      } else {
        downloads.push(this.httpClient.get(url, options).pipe(
          takeWhile(_ => !this.aborted), // this will cancel the actual HTTP request
          filter(ev => (ev.type === HttpEventType.DownloadProgress && ev.total > 0) || ev.type === HttpEventType.Response),
          catchError((err, _) => {
            console.warn(`Could not download ${url}`);
            return of(null);
          }),
        ));
      }
    }

    const downloadEvents = combineLatest(downloads).pipe(share());

    downloadEvents.pipe(
      map(events => {
        let loaded = 0;
        let total = 0;
        for (const ev of events) {
          if (ev?.type === HttpEventType.DownloadProgress) {
            loaded += ev.loaded;
            total += ev.total;
          } else if (ev?.type === HttpEventType.Response) {
            loaded += ev.body?.size ?? 0;
            total += ev.body?.size ?? 0;
          }
        }
        return loaded / total;
      })
    ).subscribe(progress);

    return await downloadEvents.pipe(
      filter(events => this.all(events, ev => ev === null || ev.type === HttpEventType.Response)),
      map(events => events.map(ev => ev?.type === HttpEventType.Response ? ev.body : null)),
    ).toPromise();
  }

  public onVideoStarted(): void {
    this.videoStarted.emit(this.step?.stepId);
  }

  public onVideoEnded(): void {
    this.videoEnded.emit(this.step?.stepId);
  }

  public onVideoStopped(): void {
    this.videoStopped.emit(this.step?.stepId);
  }

  public onVideoPaused(): void {
    this.videoPaused.emit(this.step?.stepId);
  }

  public onVideoPlayError(error: string): void {
    this.videoPlayError.emit([this.step?.stepId, error]);
  }

  public onVideoMutedChange(value: boolean): void {
    this.videoMutedChanged.emit([this.step?.stepId, value]);
  }

  private all<T>(items: T[], predicate: (value: T) => boolean): boolean {
    return items.filter(predicate).length == items.length;
  }

  private abortDownload(): void {
    console.debug(`Aborting download of step ${this.step.stepId}`);
    this.aborted = true;
  }

  private createObjectUrl(blob: Blob): string {
    return blob ? URL.createObjectURL(blob) : null;
  }
}
