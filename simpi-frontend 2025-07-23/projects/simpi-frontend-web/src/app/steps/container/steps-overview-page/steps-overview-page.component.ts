import {AfterViewInit, ChangeDetectorRef, Component, ComponentRef, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Observable, of, Subscription} from 'rxjs';
import {
  catchError,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
  takeWhile,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import { BatchStepUploadModalComponent, BatchUploadResult } from '../../../shared/components/batch-step-upload-modal/batch-step-upload-modal.component';
import {
  ChangeOrderRequest,
  DeploymentStateRequest,
  SimpiInsertResponse,
  SimpiResponse,
  StepChangeRequest,
  StepResponse,
} from '../../../../../../simpi-frontend-common/src/lib/models';
import {StepService} from '../../../../../../simpi-frontend-common/src/lib/services/steps/step.service';
import {
  EditorState,
  stickerStateToStickerRequest,
} from '../../../../../../simpi-frontend-common/src/step-editor/models/editorState';
import {SimpiService} from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import {ProductService} from '../../../../../../simpi-frontend-common/src/lib/services';
import {SelectColorModalComponent} from '../../components/select-color-modal/select-color-modal.component';
import {StickerRequest} from '../../../../../../simpi-frontend-common/src/lib/models/http/requests/stickerRequest';
import { HttpResponse } from '@angular/common/http';
import {StepDetailsComponent} from '../../components/step-details/step-details.component';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {WebplayerComponent} from '../../../webPlayer/components/webplayer/webplayer.component';
import {Platform} from '@angular/cdk/platform';
import {ContainScaleStrategy} from 'projects/simpi-frontend-common/src/step-editor/components/containScaleStrategy';
import {
  StepMediaUploadService
} from '../../../../../../simpi-frontend-common/src/lib/services/steps/step-media-upload.service';
import {
  CopyPasteStepRequest
} from '../../../../../../simpi-frontend-common/src/lib/models/http/requests/CopyPasteStepRequest';

@Component({
  selector: 'sim-steps-overview-page',
  templateUrl: './steps-overview-page.component.html',
  styleUrls: ['./steps-overview-page.component.scss'],
})
export class StepsOverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  private _componentActive: boolean = false;
  private _simpiId: string;
  private _simpiAlias: string;
  private _brandAlias: string;
  private _selectedStep: StepResponse;
  private _overlayRef: OverlayRef;
  private _componentRef: ComponentRef<WebplayerComponent>;
  private _overlayShown: boolean;
  private _defaultTextBackgroundColor: string = '#d96635';
  private _closeSubscription: Subscription;
  private _backdropSubscription: Subscription;

  public simpiTitle: string;
  public simpi: SimpiResponse;
  public steps$: Observable<StepResponse[]>;
  public stepForm: UntypedFormGroup;
  public selectedStep$: Observable<StepResponse>;
  public errorLoadingData$: Observable<boolean>;
  public isActionInProgress: boolean = false;
  public componentPortal: ComponentPortal<WebplayerComponent>;
  public isCopied: boolean;

  @ViewChild(StepDetailsComponent)
  public stepDetails: StepDetailsComponent;

  public get brandAlias(): string {
    return this._brandAlias;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private stepService: StepService,
    private fb: UntypedFormBuilder,
    private simpiService: SimpiService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private overlay: Overlay,
    private platform: Platform,
    private stepMediaUploadService: StepMediaUploadService,
  ) {
  }

  public ngOnInit(): void {
    this._componentActive = true;
    this.isCopied = this.stepService.isCopied();
    this.selectedStep$ = this.stepService.selectedStep$.pipe(
      tap((selectedStep: StepResponse) => {
        this._selectedStep = selectedStep;
        this.populateStepForm(selectedStep);
        this.cdr.markForCheck();
      })
    );

    this.getRoutingParamsObservable()
      .pipe(takeWhile(() => this._componentActive))
      .subscribe((params) => {
        this._simpiAlias = params.simpiAlias;
        this._brandAlias = params.brandAlias;
        if (params.simpiAlias === 'new-simpi') {
          this.isActionInProgress = true;
          this.createNewSimpi(params.brandAlias, params.productAlias)
            .pipe(
              tap((createSimpiResponse) => {
                this.simpiService.setSelectedSimpi({
                  simpiId: createSimpiResponse.id,
                } as SimpiResponse);
                this.buildStepForm(createSimpiResponse.id);
              }),
              switchMap((createSimpiResponse) => {
                return this.stepService.createAndSaveEmptyStep(
                  createSimpiResponse.id,
                  null,
                );
              }),
              catchError((err) => {
                console.warn('Could not initialize new simpi', err);
                return of(null);
              })
            )
            .subscribe((newStepId: string) => {
              this.loadData(!!newStepId);
              this.stepService.setSelectedStepById(newStepId);
              window.setTimeout(() => {
                this.isActionInProgress = false;
                this.router
                  .navigate([`../../${this._simpiAlias}/steps`], {
                    relativeTo: this.route,
                  })
                  .catch(console.error);
              }, 1000);
            });
        } else {
          this.simpiService
            .getSimpiByAlias(this._simpiAlias)
            .subscribe((simpi) => {
              if (simpi) {
                this._simpiId = simpi.simpiId;
                this.simpiTitle = simpi.title;
                this.simpi = simpi;
                this.loadData(true);

                this.buildStepForm(this._simpiId);
              }
            });
        }
      });
  }

  public ngAfterViewInit(): void {
    this.componentPortal = new ComponentPortal(WebplayerComponent);
  }

  public onReloadData(): void {
    this.loadData(false);
  }

  public async onSaveStep(editorState: any): Promise<void> {
    try {
      const stepId = this.stepForm.get('stepId').value;
      if (!stepId) {
        return;
      }

      this.isActionInProgress = true;
      let previewImageIds: string[];

      if (editorState) {
        this.setEditorStateInForm(editorState);
        previewImageIds = (editorState as EditorState).stickers.map(
          (sticker) => sticker.previewImageId
        );
      }

      const portraitIndicator = this.stepForm.get('portraitIndicator').value;
      const stepToChange: StepChangeRequest = {
        description: this.stepForm.get('description').value,
        title: this.stepForm.get('title').value,
        thumbnailId: this.stepForm.get('thumbnailId').value,
        mediaType: this.stepForm.get('mediaType').value,
        stickers: this.stepForm.get('stickers').value,
        portraitIndicatorX1: portraitIndicator.x1,
        portraitIndicatorY1: portraitIndicator.y1,
        portraitIndicatorX2: portraitIndicator.x2,
        portraitIndicatorY2: portraitIndicator.y2,
        textBackgroundColor: this.stepForm.get('textBackgroundColor').value,
        textPositionY: this.stepForm.get('textPositionY').value,
        voiceOverEnabled: this.stepForm.get('voiceOverEnabled').value,
        videoId: this.stepForm.get('videoId').value,
      };

      await this.stepService
        .saveStep(
          stepId,
          stepToChange,
          previewImageIds
        )
        .pipe(
          takeWhile(() => this._componentActive)
        )
        .toPromise();
    } catch (error) {
      this.toastr.error(error || 'Unknown error', 'Error saving step');
    } finally {
      this.isActionInProgress = false;
    }
  }

  public async onSelectStep(step: StepResponse): Promise<void> {
    if (this._selectedStep?.stepId !== step?.stepId) {
      const editorState = this.stepDetails.getEditorState();
      await this.onSaveStep(editorState);
    }
    this.stepService.setSelectedStep(step);
  }

  public onCancelEditing(): void {
    this.buildStepForm(this._simpiId);
    this.stepService.removeUnsavedStep();
    this.cdr.detectChanges();
  }

  public onOpenColorPickerModal(): void {
    const modalRef = this.modalService.open(SelectColorModalComponent, {
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.selectedColor = this.stepForm.get(
      'textBackgroundColor'
    ).value;

    modalRef.result.then(
      (result) => {
        if (result && result.textBackgroundColor) {
          this.stepForm.patchValue({
            textBackgroundColor: result.textBackgroundColor,
          });
        }
      },
      (rejected) => {
      }
    );
  }

  public onAddStep(): void {
    this.isActionInProgress = true;
    this.saveCurrentStep()
      .then(() => {
        this.stepService
          .createAndSaveEmptyStep(this._simpiId, this._selectedStep?.stepId)
          .subscribe((newStepId) => {
            this.stepService.setSelectedStepById(newStepId);
            this.isActionInProgress = false;
          }, error => {
            this.toastr.error('New step must be saved first, but an error occurred while saving.', 'Error adding step');
            this.isActionInProgress = false;
          });
      })
      .catch(() => {
        this.toastr.error('Old selected step must be saved first, but an error occurred while saving.', 'Error adding step');
        this.isActionInProgress = false;
      });
  }

  public onBatchUploadFiles(files: File[]): void {
    if (!this._simpiId) {
      this.toastr.error('Cannot start batch upload because SIMPI ID is not available.', 'Error');
      return;
    }

    if (!files || files.length === 0) {
      return;
    }

    // Save current step before opening batch upload
    this.saveCurrentStep()
      .then(() => {
        const modalRef = this.modalService.open(BatchStepUploadModalComponent, {
          size: 'lg',
          backdrop: 'static',
          keyboard: false
        });

        modalRef.componentInstance.simpiId = this._simpiId;
        modalRef.componentInstance.insertAfterStepId = this._selectedStep?.stepId;
        modalRef.componentInstance.preSelectedFiles = files;

        modalRef.result.then((result: BatchUploadResult) => {
          if (result && result.success) {
            this.toastr.success(
              `Successfully created ${result.successfulUploads} out of ${result.totalFiles} steps.`,
              'Batch Upload Complete'
            );
            
            // Reload data to show the new steps
            this.loadData(false);
            
            // Select the last newly created step after data loads
            if (result.createdStepIds.length > 0) {
              const lastStepId = result.createdStepIds[result.createdStepIds.length - 1];
              
              // Wait for the steps to actually load, then select the last step
              this.steps$.pipe(
                filter(steps => steps !== null && steps.length > 0),
                take(1)
              ).subscribe(steps => {
                const lastStep = steps.find(step => step.stepId === lastStepId);
                if (lastStep) {
                  this.stepService.setSelectedStep(lastStep);
                }
              });
            }
          }
        }).catch(() => {
          // Modal was dismissed/cancelled - no action needed
        });
      })
      .catch(() => {
        this.toastr.error('Please save the current step first before starting batch upload.', 'Error');
      });
  }

  public onCopyStep(): void {
    this.isActionInProgress = true;
    this.stepService.copyStep(this._selectedStep?.stepId);
    this.isCopied = true;
    this.isActionInProgress = false;
  }

  public onPasteStep(): void {
    this.isActionInProgress = true;

    const stepPasteRequest: CopyPasteStepRequest = {
      simpiId: this._simpiId,
      insertStepAfterStepId: this._selectedStep?.stepId
    };

    this.saveCurrentStep().then(() => {
      this.stepService.pasteStep(stepPasteRequest).subscribe((newStepId) => {
          this.stepService.setSelectedStepById(newStepId);
          this.isActionInProgress = false;
          this.loadData(false);
        }, (error) => {
          this.toastr.error('New copied step must be saved first, but an error occurred while saving.', 'Error adding step');
          this.isActionInProgress = false;
        }
      );
    }).catch(() => {
      this.toastr.error('Old selected step must be saved first, but an error occurred while saving.', 'Error adding step');
      this.isActionInProgress = false;
    });
  }

  public onDeleteStep(stepId: string): void {
    if (!stepId || stepId !== this._selectedStep?.stepId) {
      return;
    }

    const posOfDeletedStep: number = this._selectedStep.positionIndex;

    this.isActionInProgress = true;
    this.stepService
      .deleteStep(stepId)
      .pipe(
        withLatestFrom(this.steps$ || of([])),
        tap(([resp, steps]) => {
          if (steps?.length) {
            const filteredSteps: StepResponse[] = steps.filter(x => x.positionIndex < posOfDeletedStep);
            const stepToSelect = filteredSteps.length > 0 ? filteredSteps[filteredSteps.length - 1] : steps[0];
            this.stepService.setSelectedStep(stepToSelect);
          }
        }),
        takeWhile(() => this._componentActive)
      )
      .subscribe(() => {
        this.isActionInProgress = false;
      });
  }

  public onChangeStepOrder(idsAndIndexes: ChangeOrderRequest[]): void {
    this.isActionInProgress = true;
    this.stepService.changeStepOrder(idsAndIndexes).subscribe(() => {
      this.isActionInProgress = false;
    });
  }

  private loadData(selectFirstStep: boolean): void {
    this.errorLoadingData$ = this.stepService.errors$;
    this.steps$ = this.stepService.getSteps(this._simpiId, false, true).pipe(
      takeWhile(() => this._componentActive),
      startWith(null),
      shareReplay(),
      tap((steps) => {
        if (selectFirstStep && steps && steps.length > 0) {
          const notDeletedSteps: StepResponse[] = steps.filter(
            (x) => !x.deleted
          );
          if (notDeletedSteps?.length) {
            this.stepService.setSelectedStep(notDeletedSteps[0]);
          }
          selectFirstStep = false;
        }
      })
    );
  }

  private populateStepForm(step: StepResponse): void {
    if (!step) {
      this.resetStepForm();
      return;
    }

    const {portraitIndicator} = step;

    this.stepForm.patchValue({
      stepId: step.stepId,
      title: step.title,
      description: step.description,
      thumbnailId: step.thumbnailId,
      mediaType: step.mediaType,
      positionIndex: step.positionIndex,
      stickers: step.stickers as StickerRequest[],
      portraitIndicator: {
        x1: portraitIndicator.x1,
        y1: portraitIndicator.y1,
        x2: portraitIndicator.x2,
        y2: portraitIndicator.y2,
      },
      textBackgroundColor: step.textBackgroundColor || this._defaultTextBackgroundColor,
      textPositionY: step.textPositionY,
      voiceOverEnabled: step.voiceOverEnabled,
      videoId: step.videoId,
    });
  }

  private setEditorStateInForm(state: EditorState): void {
    const {portraitIndicator, portraitIndicatorCenter} = state;

    this.stepForm.patchValue({
      stickers: state.stickers.map((sticker) =>
        stickerStateToStickerRequest(sticker)
      ),
    });

    if (portraitIndicator) {
      this.stepForm.patchValue({
        portraitIndicator: {
          x1: portraitIndicator.point1.x,
          y1: portraitIndicator.point1.y,
          x2: portraitIndicator.point2.x,
          y2: portraitIndicator.point2.y,
        },
      });
    }
    if (portraitIndicatorCenter) {
      this.stepForm.patchValue({
        portraitIndicator: {
          x1: portraitIndicatorCenter.x,
          y1: portraitIndicatorCenter.y,
        },
      });
    }

    if (state.textPositionY) {
      this.stepForm.patchValue({
        textPositionY: state.textPositionY,
      });
    }

    if (state.textContent) {
      this.stepForm.patchValue({
        title: state.textContent,
      });
    }
  }

  private buildStepForm(simpiId: string = null): void {
    this.stepForm = this.fb.group({
      simpiId: [simpiId, Validators.required],
      stepId: [null],
      title: [''],
      description: [''],
      thumbnailId: [null, Validators.required],
      mediaType: [null, Validators.required],
      positionIndex: [''],
      stickers: [],
      portraitIndicator: {
        x1: 0.5,
        y1: 0.5,
        x2: undefined,
        y2: undefined,
      },
      textBackgroundColor: [this._defaultTextBackgroundColor],
      textPositionY: [0],
      voiceOverEnabled: [true],
      videoId: [null],
    });
  }

  private resetStepForm(): void {
    this.stepForm.patchValue({
      stepId: null,
      title: '',
      description: '',
      thumbnailId: null,
      mediaType: null,
      positionIndex: '',
      stickers: [],
      portraitIndicator: {
        x1: 0.5,
        y1: 0.5,
        x2: undefined,
        y2: undefined,
      },
      textBackgroundColor: this._defaultTextBackgroundColor,
      textPositionY: 0,
      voiceOverEnabled: true,
      videoId: null,
    });
  }

  private buildStepChangeRequest(): StepChangeRequest {
    const portraitIndicator = this.stepForm.get('portraitIndicator').value;
    const {x1, y1} = portraitIndicator;
    const newTextBackgroundColor = this.stepForm.get('textBackgroundColor').value;

    if (newTextBackgroundColor) {
      this._defaultTextBackgroundColor = newTextBackgroundColor;
    }

    return {
      description: this.stepForm.get('description').value,
      thumbnailId: this.stepForm.get('thumbnailId').value,
      mediaType: this.stepForm.get('mediaType').value,
      title: this.stepForm.get('title').value,
      stickers: this.stepForm.get('stickers').value,
      portraitIndicatorX1: x1,
      portraitIndicatorY1: y1,
      textBackgroundColor: newTextBackgroundColor,
      textPositionY: this.stepForm.get('textPositionY').value,
      voiceOverEnabled: this.stepForm.get('voiceOverEnabled').value,
      videoId: this.stepForm.get('videoId').value,
    };
  }

  public ngOnDestroy(): void {
    this.stepService.setSelectedStep(null);
    this._componentActive = false;
    
    // Clean up any remaining overlay and subscriptions
    this.closePlayer();
  }

  public onNavigateBackClick(): void {
    this.router
      .navigate(['../../..'], {relativeTo: this.route})
      .catch(console.error);
  }

  public onDiscardClick(): void {
    this.router
      .navigate(['../../..'], {relativeTo: this.route})
      .catch(console.error);
  }

  public async onPreviewClick(): Promise<void> {
    if (this._selectedStep) {
      const editorState = this.stepDetails.getEditorState();
      await this.onSaveStep(editorState);
    }

    const isMobile = this.platform.ANDROID || this.platform.IOS;
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const configs = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'overlay-background',
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: isMobile ? '100%' : '92vw',
      height: isMobile ? '100%' : '92vh',
      positionStrategy,
      disposeOnNavigation: true
    });

    if (!this._overlayRef) {
      this._overlayRef = this.overlay.create(configs);
      this._overlayShown = true;
    }

    if (!this.componentPortal.isAttached) {
      this._componentRef = this.componentPortal.attach(this._overlayRef);
      this._componentRef.instance.scaleStrategy = new ContainScaleStrategy();
      this.subscribeToBackdrop();
      this.subscribeToClose();
    }

    this.steps$.pipe(
      takeWhile(() => this._overlayShown),
      filter(steps => Boolean(steps && steps.length)),
      take(1),
      tap(steps => {
        const simpi = this.simpi;
        this._componentRef.instance.simpiId = this.simpi.simpiId;
      }),
    ).subscribe();
  }

  private subscribeToClose(): void {
    this._closeSubscription = this._componentRef.instance.close.pipe(
      takeWhile(() => this._overlayShown)
    ).subscribe(() => {
      this.closePlayer();
    });
  }

  private subscribeToBackdrop(): void {
    this._backdropSubscription = this._overlayRef.backdropClick().pipe(
      takeWhile(() => this._overlayShown)
    ).subscribe(() => {
      this.closePlayer();
    });
  }

  private closePlayer(): void {
    this._overlayShown = false;
    
    try {
      // Clean up subscriptions
      if (this._closeSubscription) {
        this._closeSubscription.unsubscribe();
        this._closeSubscription = null;
      }
      
      if (this._backdropSubscription) {
        this._backdropSubscription.unsubscribe();
        this._backdropSubscription = null;
      }
      
      if (this.componentPortal && this.componentPortal.isAttached) {
        this.componentPortal.detach();
      }
      
      if (this._componentRef) {
        // Check if the component is still valid before destroying
        if (this._componentRef.instance) {
          this._componentRef.destroy();
        }
        this._componentRef = null;
      }
      
      if (this._overlayRef) {
        this._overlayRef.dispose();
        this._overlayRef = null;
      }
    } catch (error) {
      console.warn('Error closing player:', error);
      // Clean up references even if there's an error
      this._closeSubscription = null;
      this._backdropSubscription = null;
      this._componentRef = null;
      this._overlayRef = null;
    }
  }

  public onNextClicked(): void {
    this.router
      .navigate([`../../${this._simpiAlias}/settings`], {
        relativeTo: this.route,
        queryParams: {fromStepEditor: true},
      })
      .catch(console.error);
  }

  private createNewSimpi(
    brandAlias: string,
    productAlias: string
  ): Observable<SimpiInsertResponse> {
    if (!brandAlias || !productAlias) {
      return;
    }

    return this.productService
      .getProductByAlias(brandAlias, productAlias)
      .pipe(
        tap((product) => {
          this.productService.updateSimpiCount(product.productId);
        }),
        switchMap((product) => {
          return this.simpiService.addSimpi({
            title: 'New Simpi',
            deploymentInfo: {
              deploymentState: DeploymentStateRequest.Private,
              releaseDate: new Date(),
              deletionDate: undefined,
            },
            showInfoOverlay: true,
            description: '',
            productId: product.productId,
            creatorId: product.creatorId, // TODO simpi creator might not be the same as product creator,
            // TODO but anyways it would be better to let the backend set creatorId based on the JWT token
          });
        })
      )
      .pipe(
        tap((result: SimpiInsertResponse) => {
          this._simpiId = result.id;
          this._simpiAlias = result.alias;
        })
      );
  }

  private getRoutingParamsObservable() {
    return combineLatest([
      this.route.root.firstChild.paramMap,
      this.route.parent.paramMap,
    ]).pipe(
      takeWhile(() => this._componentActive),
      map(([rootParamMap, routeParamMap]) => {
        return {
          brandAlias: rootParamMap?.get('brandAlias'),
          productAlias: routeParamMap?.get('productAlias'),
          simpiAlias: routeParamMap?.get('simpiAlias'),
        };
      }),
      filter(
        ({brandAlias, productAlias, simpiAlias}) =>
          !!brandAlias && !!productAlias && !!simpiAlias
      )
    );
  }

  public async uploadAndApplyNewStepMedia(selectedFile: File): Promise<void> {
    return await this.changeStepMedia(selectedFile);
  }

  public async persistUploadedStepMedia(uploadedMediaId: string): Promise<void> {
    return await this.changeStepMedia(null, uploadedMediaId);
  }

  private async changeStepMedia(selectedFile?: File, uploadedMediaId?: string): Promise<void> {
    if (!this._selectedStep) {
      this.toastr.error('Step media cannot be changed because no step is selected.', 'Error saving step media.');
      return;
    }

    if (!(selectedFile || uploadedMediaId)) {
      this.toastr.error('Step media cannot be changed because an error occurred selecting a file.', 'Error saving step media.');
      return;
    }

    this.isActionInProgress = true;

    try {
      await this.saveCurrentStep();

      if (selectedFile) {
        const uploadResult = await this.stepMediaUploadService.uploadAndChangeStepMedia(this._selectedStep, selectedFile);
        if (!uploadResult?.success) {
          this.toastr.error('Step media was not uploaded or saved to step. Check console for details.', 'Error saving step media.');
          return;
        }
      } else if (uploadedMediaId) {
        await this.stepMediaUploadService.persistStepMediaPropertiesOfLatestUpload(this._selectedStep, uploadedMediaId);
      }

      this.stepForm.patchValue({
        mediaType: this._selectedStep.mediaType,
        thumbnailId: this._selectedStep.thumbnailId,
        videoId: this._selectedStep.videoId,
      });

      this.stepService.setSelectedStep(this._selectedStep);

      this.toastr.success('Step media successfully changed.', 'Done');
    } catch (error) {
      this.toastr.error(`Could not set step media ('${error}').`, 'Error saving step media');
    } finally {
      this.isActionInProgress = false;
    }
  }

  private async saveCurrentStep(): Promise<HttpResponse<any>> {
    console.log('Before saving current step');
    if (!this._selectedStep) {
      console.log('No Step selected');
      return;
    }

    return this.stepService
      .saveStep(this._selectedStep.stepId, this.buildStepChangeRequest(), [])
      .toPromise();
  }
}
