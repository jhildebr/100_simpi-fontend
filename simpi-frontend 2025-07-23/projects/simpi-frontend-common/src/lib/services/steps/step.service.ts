import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, from, Observable, of, Subscription, throwError } from 'rxjs';
import { catchError, map, mergeMap, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { RestService } from '../base/rest.service';
import {
  ChangeOrderRequest,
  CreateStepRequest,
  PortraitIndicatorResponse,
  StepChangeRequest,
  StepMediaChangeRequest,
  StepInsertResponse,
  StepResponse,
  StickerResponse,
  UploadStepVideoResponse,
  UploadStepImageResponse,
} from '../../models';
import { COMMON_CONFIG, SimpiCommonConfig } from '../../simpi-common-config';
import { AuthService } from '../auth/auth.service';
import { StickerRequest } from '../../models/http/requests/stickerRequest';
import {CopyPasteStepRequest} from "../../models/http/requests/CopyPasteStepRequest";

@Injectable({ providedIn: 'root' })
export class StepService extends RestService implements OnDestroy {
  private readonly restUrl: string;

  private selectedStep: BehaviorSubject<StepResponse> = new BehaviorSubject<StepResponse>(null);

  public selectedStep$: Observable<StepResponse> = this.selectedStep.asObservable();

  public changeOrderSubscription: Subscription = new Subscription();

  private renameStepRequest: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private steps: BehaviorSubject<StepResponse[]> = new BehaviorSubject<StepResponse[]>([]);

  public steps$: Observable<StepResponse[]> = this.steps.asObservable();

  public renameStepRequest$ = this.renameStepRequest.asObservable();

  private errors: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public errors$: Observable<boolean> = this.errors.asObservable();

  private deleteRestoreOperation: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  public deleteRestoreOperation$: Observable<string> = this.deleteRestoreOperation.asObservable();

  private copiedStepId;

  constructor(@Inject(COMMON_CONFIG) private config: SimpiCommonConfig,
              private httpClient: HttpClient, private authService: AuthService) {
    super(config);
    this.restUrl = this.config.restUrl;
  }

  public requestStepRename(val: boolean): void {
    if (val) {
      this.renameStepRequest.next(true);
    }
  }

  public setSelectedStep(step: StepResponse | null): void {
    this.selectedStep.next(step);
  }

  public setSelectedStepById(id: string): void {
    const step = this.steps.getValue()?.find(x => x.stepId === id);
    this.selectedStep.next(step);
  }

  public getStep(stepId: string): Observable<StepResponse> {
    return this.selectedStep$.pipe(
      shareReplay(),
      switchMap((step) => {
        if (step !== null && step.stepId === stepId) {
          return of(step);
        }
        const options = { headers: this.headers };
        return this.httpClient.get<StepResponse>(`${this.restUrl}/api/v1/steps/${stepId}`, options);
      })
    );
  }

  public saveStep(stepId: string, stepToChange: StepChangeRequest, stickerPreviewImageIds: string[]): Observable<HttpResponse<any>> {
    const options = {
      observe: 'response' as const,
      headers: this.headers,
    };

    if (!Number.isFinite(stepToChange.portraitIndicatorX1) || !Number.isFinite(stepToChange.portraitIndicatorY1)) {
      console.warn(`Refusing to save step ${stepId} without valid portraitIndicator.`);
      return of(null);
    }

    return this.httpClient.put<HttpResponse<any>>(`${this.restUrl}/api/v1/steps/${stepId}`, stepToChange, options).pipe(
      tap(response => {
        const steps = this.steps.getValue();
        if (response.status === 204 && steps.length > 0) {
          const step = steps.find(x => x.stepId === stepId);
          step.description = stepToChange.description;
          step.title = stepToChange.title;
          step.thumbnailId = stepToChange.thumbnailId;
          step.thumbnailUrl = this.getStepImageUrl(step.thumbnailId);
          step.portraitIndicator = this.convertPortraitIndicator(step, stepToChange);
          step.stickers = this.convertStickersToResponseFormat(stepToChange.stickers, stickerPreviewImageIds);
          step.textBackgroundColor = stepToChange.textBackgroundColor;
          step.textPositionY = stepToChange.textPositionY;
          step.voiceOverEnabled = stepToChange.voiceOverEnabled;
          step.videoId = stepToChange.videoId;
          step.videoUrl = this.getStepVideoUrl(step.videoId);
          this.steps.next(steps.sort((a, b) => a.positionIndex - b.positionIndex));
        }
      })
    );
  }

  public saveNewStepMedia(stepId: string, newStepMedia: StepMediaChangeRequest): Observable<HttpResponse<any>> {
    const options = {
      observe: 'response' as const,
      headers: this.headers,
    };

    return this.httpClient.put<HttpResponse<any>>(`${this.restUrl}/api/v1/steps/${stepId}/media`, newStepMedia, options).pipe(
      tap(response => {
        const steps = this.steps.getValue();
        if (response.status === 204 && steps && steps.length > 0) {
          const step = steps.find(x => x.stepId === stepId);
          step.mediaType = newStepMedia.mediaType;
          step.thumbnailId = newStepMedia.thumbnailId;
          step.thumbnailUrl = this.getStepImageUrl(step.thumbnailId);
          step.videoId = newStepMedia.videoId;
          step.videoUrl = this.getStepVideoUrl(step.videoId);
          this.steps.next(steps.sort((a, b) => a.positionIndex - b.positionIndex));
        }
      })
    );
  }

  public setError(value: boolean): void {
    this.errors.next(value);
  }

  private convertPortraitIndicator(step: StepResponse, stepToConvert: StepChangeRequest): PortraitIndicatorResponse {
    return step.portraitIndicator = {
      x1: stepToConvert.portraitIndicatorX1,
      y1: stepToConvert.portraitIndicatorY1,
      x2: stepToConvert.portraitIndicatorX2,
      y2: stepToConvert.portraitIndicatorY2
    };
  }

  private convertStickersToResponseFormat(stickers: StickerRequest[], stickerPreviewImageIds: string[]): StickerResponse[] {
    if (!stickers) {
      return [];
    }

    return stickers.map((sticker, i) => {
      return {
        actionId: sticker.actionId,
        actionType: sticker.actionType,
        actionTargetUrl: sticker.actionTargetUrl,
        appearanceDelayInMilliseconds: sticker.appearanceDelayInMilliseconds,
        collectionId: sticker.collectionId,
        customAnimations: sticker.customAnimations,
        previewImageId: (i in stickerPreviewImageIds ? stickerPreviewImageIds[i] : ''),
        rotationAngle: sticker.rotationAngle,
        scaleFactor: sticker.scaleFactor,
        showPopUpEffect: sticker.showPopUpEffect,
        type: sticker.type,
        x: sticker.x,
        y: sticker.y,
      };
    });
  }

  public renameStep(stepId: string, stepName: string): Observable<HttpResponse<any>> {
    const body = {
      stepId,
      stepName
    };
    const options = {
      observe: 'response' as const,
      headers: this.headers,
    };
    return this.httpClient.put<HttpResponse<any>>(`${this.restUrl}/api/v1/steps/${stepId}`, body, options);
  }

  public clearSteps(): void {
    this.steps.next([]);
  }

  public getSteps(simpiId: string, includeDeleted: boolean = false, refresh: boolean = false): Observable<StepResponse[]> {
    if (this.steps.getValue() && this.steps.getValue().length >= 1 && !refresh) {
      return this.steps$;
    }
    this.steps.next([]);
    return this.requestSteps(simpiId, includeDeleted).pipe(
      shareReplay(),
      map(s => {
        if (s) {
          this.errors.next(false);

          s.sort((a, b) => {
            return a.positionIndex - b.positionIndex;
          });
          return s;
        }
      }),
      switchMap(steps => {
        if (steps) {
          steps.forEach(s => {
            if (s.thumbnailId) {
              s.thumbnailUrl = this.getStepImageUrl(s.thumbnailId);
            } else {
              s.thumbnailId = null;
              s.thumbnailUrl = null;
            }
            if (s.videoId) {
              s.videoUrl = this.getStepVideoUrl(s.videoId);
            } else {
              s.videoId = null;
              s.videoUrl = null;
            }
            if (s.voiceOverEnabled) {
              s.audioUrl = this.getStepDescriptionAudioVoiceOverUrl(s.stepId);
            }
          });
        }
        this.steps.next(steps);
        return this.steps$;
      }),
      catchError(err => {
        this.errors.next(true);
        return [];
      })
    );
  }

  public createAndSaveEmptyStep(simpiId: string, insertStepAfterStepId: string | undefined): Observable<string> {
    return this.addStep({
      title: '',
      description: '',
      simpiId: simpiId,
      thumbnailId: null,
      mediaType: null,
      portraitIndicator: {
        x1: 0.5,
        y1: 0.5,
      },
      stickers: [],
      textBackgroundColor: '',
      textPositionY: 0,
      voiceOverEnabled: true,
      videoId: null,
      insertStepAfterStepId: insertStepAfterStepId,
    });
  }

  public removeUnsavedStep(): void {
    const steps = this.steps.getValue();
    const filtered = steps.filter(x => x.stepId !== null);
    this.steps.next(filtered);
  }

  public uploadStepThumbnail(file: File): Observable<HttpResponse<UploadStepImageResponse>> {
    const formData = new FormData();
    formData.append('stepImage', file, file.name);
    const options = {
      headers: this.fileHeaders,
      observe: 'response' as const,
    };
    return this.httpClient.post<UploadStepImageResponse>(`${this.restUrl}/api/v1/steps/thumbnail`, formData, options);
  }

  public uploadStepImage(file: File): Observable<HttpResponse<UploadStepImageResponse>> {
    const formData = new FormData();
    formData.append('stepImage', file, file.name);
    const options = {
      headers: this.fileHeaders,
      observe: 'response' as const,
    };
    return this.httpClient.post<UploadStepImageResponse>(`${this.restUrl}/api/v1/steps/image`, formData, options);
  }

  public uploadStepVideo(file: File): Observable<HttpResponse<UploadStepVideoResponse>> {
    const formData = new FormData();
    formData.append('stepVideo', file, file.name);
    const options = {
      headers: this.fileHeaders,
      observe: 'response' as const,
    };
    return this.httpClient.post<UploadStepVideoResponse>(`${this.restUrl}/api/v1/steps/video`, formData, options);
  }

  public getStepImageUrl(imageId: string): string {
    if (imageId) {
      return `${this.restUrl}/api/v1/steps/thumbnail/${imageId}`;
    } else {
      return '';
    }
  }


  public getStepVideoUrl(videoId: string): string {
    if (videoId) {
      return `${this.restUrl}/api/v1/steps/video/${videoId}`;
    } else {
      return '';
    }
  }

  public getStepDescriptionAudioVoiceOverUrl(stepId: string, language: string = null): string {
    if (language) {
      return `${this.restUrl}/api/v1/steps/${stepId}/explanation/audio/${language}`;
    } else {
      return `${this.restUrl}/api/v1/steps/${stepId}/explanation/audio`;
    }
  }

  public removeStepImage(imageId: string): Observable<HttpResponse<any>> {
    const options = {
      headers: this.headers,
      observe: 'response' as const,
    };
    return this.httpClient.delete<HttpResponse<any>>(`${this.restUrl}/api/v1/steps/thumbnail/${imageId}`, options).pipe(
      catchError(this.errorHandler)
    );
  }

  public removeStepVideo(videoId: string): Observable<HttpResponse<any>> {
    const options = {
      headers: this.headers,
      observe: 'response' as const,
    };
    return this.httpClient.delete<any>(`${this.restUrl}/api/v1/steps/video/${videoId}`, options).pipe(
      catchError(this.errorHandler)
    );
  }

  public changeStepOrder(idsAndIndexes: ChangeOrderRequest[]): Observable<HttpResponse<any>> {
    const options = {
      headers: this.headers,
      observe: 'response' as const,
    };
    return this.httpClient.put<HttpResponse<any>>(`${this.restUrl}/api/v1/steps`, idsAndIndexes, options)
      .pipe(tap(response => {
        if (idsAndIndexes && response.ok) {
          const steps = this.steps.getValue() || [];
          for (let idAndIndex of idsAndIndexes) {
            const step = steps.find(x => x.stepId === idAndIndex.objectId);
            if (step) {
              step.positionIndex = idAndIndex.positionIndex;
            }
          }
          this.steps.next(steps);
        }
      }));
  }

  public errorHandler(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(error.message || 'server error.');
  }

  private requestSteps(simpiId: string, includeDeleted: boolean): Observable<StepResponse[]> {
    const options = { headers: this.headers };
    if (includeDeleted) {
      return this.httpClient.get<StepResponse[]>(`${this.restUrl}/api/v1/steps/all/simpi/${simpiId}`, options).pipe(
        startWith(this.steps.getValue()),
        shareReplay(1)
      );
    }
    return from(this.authService.getToken()).pipe(mergeMap(token => {
      let url: string;
      if (token) {
        url = `${this.restUrl}/api/v1/steps/simpi/${simpiId}`;
      } else {
        url = `${this.restUrl}/api/v1/steps/published/simpi/${simpiId}`;
      }
      return this.httpClient.get<StepResponse[]>(url, options).pipe(
        startWith(this.steps.getValue()),
        shareReplay(1)
      );
    }));
  }

  public addStep(step: CreateStepRequest): Observable<string> {
    const options = { headers: this.headers };
    return this.httpClient.post<StepInsertResponse>(`${this.restUrl}/api/v1/steps`, step, options).pipe(
      map(response => {
        if (response) {
          const steps = this.steps.getValue() || [];
          const newStep = this.createEmptyStep(step, response.id, response.positionIndex);
          this.sortAndAdjustPosition(steps, newStep);
          return response.id;
        }
      })
    );
  }

  private createEmptyStep(step: CreateStepRequest, stepId: string, positionIndex: number): StepResponse {
    return {
      description: step.description,
      mediaType: step.mediaType,
      portraitIndicator: step.portraitIndicator,
      positionIndex: positionIndex,
      stickers: this.convertStickersToResponseFormat(step.stickers, []),
      simpiId: step.simpiId,
      stepId,
      textBackgroundColor: step.textBackgroundColor,
      textPositionY: step.textPositionY,
      thumbnailId: step.thumbnailId,
      thumbnailUrl: this.getStepImageUrl(step.thumbnailId),
      title: step.title,
      deleted: false,
      schemaVersion: 2,
      voiceOverEnabled: step.voiceOverEnabled,
      videoId: step.videoId,
      videoUrl: this.getStepImageUrl(step.videoId),
    };
  }

  public restoreStep(stepId: string): Observable<HttpResponse<any>> {
    const body = {
      stepId,
      deleted: false
    };

    const options = { observe: 'response' as const, headers: this.headers };
    return this.httpClient.put(`${this.restUrl}/api/v1/steps/${stepId}`, body, options).pipe(
      tap(response => {
        if (response.status === 204) {
          const steps = this.steps.getValue();
          steps.map(x => {
            if (x.stepId === stepId) {
              x.deleted = false;
            }
          });
          this.steps.next(steps);
          this.deleteRestoreOperation.next('restored step');
        }
      })
    );
  }

  public deleteStep(stepId: string): Observable<HttpResponse<any>> {
    const options = {
      observe: 'response' as const,
      headers: this.headers,
    };
    return this.httpClient.delete<HttpResponse<any>>(`${this.restUrl}/api/v1/steps/${stepId}`, options).pipe(
      tap(response => {
        if (response.status === 204) {
          const steps = this.steps.getValue() || [];
          steps.forEach(x => {
            if (x.stepId === stepId) {
              x.deleted = true;
            }
          });
          this.steps.next(steps.filter(x => !x.deleted));
          this.deleteRestoreOperation.next('step deleted');
        }
      })
    );
  }

  public copyStep(stepId: string): void {
    this.copiedStepId = stepId;
  }

  public isCopied(): boolean {
    return this.copiedStepId !== undefined;
  }

  public pasteStep(step: CopyPasteStepRequest): Observable<string> {
    const options = { headers: this.headers };
    return this.httpClient.put<StepResponse>(
      `${this.restUrl}/api/v1/steps/${this.copiedStepId}/paste`, step, options)
      .pipe(map(response => {
        if (response) {
          const steps = this.steps.getValue() || [];
          this.sortAndAdjustPosition(steps, response);

          return response.stepId;
        }
      }));
  }

  private sortAndAdjustPosition(steps: StepResponse[], newStep: StepResponse): void {
    steps.forEach(step => {
      if (step.positionIndex >= newStep.positionIndex) {
        step.positionIndex += 1;
      }
    });
    steps.push(newStep);
    steps.sort((a, b) => a.positionIndex - b.positionIndex);
    this.steps.next(steps);
  }

  public ngOnDestroy(): void {
    if (this.changeOrderSubscription) {
      this.changeOrderSubscription.unsubscribe();
    }
  }
}
