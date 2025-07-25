import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DeploymentStateRequest, DeploymentStateResponse, SimpiResponse} from '../../models';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {SimpiService} from '../../services/simpis/simpi.service';
import {ImageType, UploadImgModalService} from '../../services/images/upload-img-modal.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Vector2} from '../../../step-editor/models/vector2';
import {filter, map, switchMap, take, takeWhile, tap} from 'rxjs/operators';
import {ImageService} from '../../services/images/image.service';
import {StepService} from '../../services/steps/step.service';
import {from, Observable} from 'rxjs';
import {GroupNameResponse} from '../../models/http/responses/goupNameResponse';

@Component({
  selector: 'sim-simpi-settings',
  templateUrl: './simpi-settings.component.html',
  styleUrls: ['./simpi-settings.component.scss'],
})
export class SimpiSettingsComponent implements OnInit, OnDestroy {

  private _simpi: SimpiResponse;
  private _simpiGroupNames: GroupNameResponse[];
  private componentActive: boolean = false;

  @Input()
  public set simpi(value: SimpiResponse) {
    this._simpi = value;
    if (value) {
      this.populateSimpiForm();
      this.getAllSimpiGroupNames();
      this.simpiService.getSimpiGroupName(value.simpiId).subscribe((name) => {
        this.groupName = name;
      });
    }
  }

  @Input()
  public showNextButton: boolean = false;

  @Input()
  public uploadImageModalComponent: any;

  @Input()
  public groupName: GroupNameResponse;

  @Output()
  public navigateBack: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onNextClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public exportTranslationsClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public importTranslationsClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public exportMetadataTranslationsClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public importMetadataTranslationsClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public aliasChanged: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public groupNameChange: EventEmitter<string> = new EventEmitter<string>();

  // tslint:disable-next-line:adjacent-overload-signatures
  public get simpi(): SimpiResponse {
    return this._simpi;
  }

  public get simpiGroupNames(): GroupNameResponse[] {
    return this._simpiGroupNames;
  }

  public simpiFormGroup: UntypedFormGroup;

  public deploymentState: typeof DeploymentStateResponse = DeploymentStateResponse;

  public simpiTitleChangeResult: string;

  public simpiDescriptionChangeResult: string;

  public simpiGroupNameChangeResult: string;

  public startPanelVisibilityChangeResult: string;

  public deploymentStateChangeResult: string;

  public simpiThumbnailChangeResult: string;

  public simpiDeletedResult: string;

  constructor(private fb: UntypedFormBuilder, private simpiService: SimpiService, private stepService: StepService,
              private modalService: NgbModal, private uploadImgModalService: UploadImgModalService, private imageService: ImageService) {
  }

  public ngOnInit(): void {
    this.simpiTitleChangeResult = null;
    this.simpiDescriptionChangeResult = null;
    this.deploymentStateChangeResult = null;
    this.simpiThumbnailChangeResult = null;
    this.simpiDeletedResult = null;
    this.componentActive = true;
  }

  public get editable(): boolean {
    if (this.simpiGroupNames) {
      return true;
    } else {
      return false;
    }
  }

  public changeSimpiThumbnailClicked(): void {
    this.simpiThumbnailChangeResult = null;
    this.openSimpiThumbnailChangeModal();
  }

  public onNavigateBackClick(): void {
    this.navigateBack.emit();
  }

  private populateSimpiForm(): void {
    this.simpiFormGroup = this.fb.group({
      simpiTitle: [this._simpi.title, Validators.required],
      simpiDescription: [this._simpi.description],
      deploymentState: [this._simpi.deploymentInfo?.deploymentState],
      startPanelVisibility: [this._simpi.showInfoOverlay],
    });
  }

  public changeTitle(): void {
    if (!this.simpi) {
      this.simpiTitleChangeResult = 'SIMPI not loaded.';
      return;
    }

    if (!this.simpiFormGroup.get('simpiTitle').valid) {
      this.simpiTitleChangeResult = 'Invalid SIMPI title.';
      return;
    }

    const newSimpiTitle: string = this.simpiFormGroup.get('simpiTitle').value;

    if (newSimpiTitle === this.simpi.title) {
      this.simpiTitleChangeResult = null;
      return;
    }

    this.simpiTitleChangeResult = 'Saving...';

    this.simpiService.changeSimpiTitle(this.simpi.simpiId, newSimpiTitle)
      .subscribe((response) => {
        if (response.ok) {
          this.simpiTitleChangeResult = 'Title saved ✔';
          this.simpi.title = newSimpiTitle;
          this.simpi.alias = response.body?.newSimpiAlias;
          this.aliasChanged.emit(response.body.newSimpiAlias);
        } else {
          this.simpiTitleChangeResult = '❌ SIMPI title could not be saved.';
          this.simpiFormGroup.get('simpiTitle').patchValue(this.simpi.title);
        }
      }, () => {
        this.simpiTitleChangeResult = '❌ An error occurred while saving SIMPI title.';
        this.simpiFormGroup.get('simpiTitle').patchValue(this.simpi.title);
      });
  }

  public changeGroupName(newValue: GroupNameResponse): void {
    if (!this.simpi) {
      this.simpiGroupNameChangeResult = 'SIMPI not loaded.';
      return;
    }

    if (newValue.name === this.simpi.groupName) {
      this.simpiGroupNameChangeResult = null;
      return;
    }

    this.simpiGroupNameChangeResult = 'Saving...';

    this.simpiService.changeSimpiGroupName(this.simpi.simpiId, newValue.name)
      .subscribe((response) => {
        if (response.ok) {
          this.simpiGroupNameChangeResult = 'Group name saved ✔';
          this.simpi.groupName = newValue.name;
        } else {
          this.simpiGroupNameChangeResult = '❌ SIMPI group name could not be saved.';
          this.simpiFormGroup.get('simpiGroupName').patchValue(this.simpi.groupName);
        }
      }, () => {
        this.simpiGroupNameChangeResult = '❌ An error occurred while saving SIMPI group name.';
        this.simpiFormGroup.get('simpiGroupName').patchValue(this.simpi.groupName);
      });

  }

  public changeDescription(): void {
    if (!this.simpi) {
      this.simpiDescriptionChangeResult = 'SIMPI not loaded.';
      return;
    }

    if (!this.simpiFormGroup.get('simpiDescription').valid) {
      this.simpiDescriptionChangeResult = 'Invalid SIMPI description.';
      return;
    }

    const newSimpiDescription: string = this.simpiFormGroup.get('simpiDescription').value;

    if (newSimpiDescription === this.simpi.description) {
      this.simpiDescriptionChangeResult = null;
      return;
    }

    this.simpiDescriptionChangeResult = 'Saving...';

    this.simpiService.changeSimpiDescription(this.simpi.simpiId, newSimpiDescription)
      .subscribe((response) => {
        if (response.ok) {
          this.simpiDescriptionChangeResult = 'Description saved ✔';
          this.simpi.description = newSimpiDescription;
        } else {
          this.simpiDescriptionChangeResult = '❌ SIMPI description could not be saved.';
          this.simpiFormGroup.get('simpiDescription').patchValue(this.simpi.description);
        }
      }, () => {
        this.simpiDescriptionChangeResult = '❌ An error occurred while saving SIMPI description.';
        this.simpiFormGroup.get('simpiDescription').patchValue(this.simpi.description);
      });
  }

  public changeStartPanelVisibility(): void {
    if (!this.simpi) {
      this.startPanelVisibilityChangeResult = 'SIMPI not loaded.';
      return;
    }

    if (!this.simpiFormGroup.get('startPanelVisibility').valid) {
      this.startPanelVisibilityChangeResult = 'Invalid SIMPI Start Panel Visibility.';
      return;
    }

    const newStartPanelVisibility: boolean = this.simpiFormGroup.get('startPanelVisibility').value;

    if (newStartPanelVisibility === this.simpi.showInfoOverlay) {
      this.startPanelVisibilityChangeResult = null;
      return;
    }

    this.startPanelVisibilityChangeResult = 'Saving...';

    this.simpiService.changeStartPanelVisibility(this.simpi.simpiId, newStartPanelVisibility)
      .subscribe((response) => {
        if (response.ok) {
          this.startPanelVisibilityChangeResult = 'Start Panel Visibility saved ✔';
          this.simpi.showInfoOverlay = newStartPanelVisibility;
        } else {
          this.startPanelVisibilityChangeResult = '❌ SIMPI Start Panel Visibility could not be saved.';
          this.simpiFormGroup.get('startPanelVisibility').patchValue(this.simpi.showInfoOverlay);
        }
      }, () => {
        this.startPanelVisibilityChangeResult = '❌ An error occurred while saving SIMPI Start Panel Visibility.';
        this.simpiFormGroup.get('startPanelVisibility').patchValue(this.simpi.showInfoOverlay);
      });
  }

  public getAllSimpiGroupNames(): void {
    if (!this.simpiGroupNames) {
      this.simpiService.getAllSimpiGroupNames().subscribe(simpiGroupNamesResponse => {
        this._simpiGroupNames = simpiGroupNamesResponse.groupNames.map(gn => {
          return {name: gn};
        });
      });
    }
  }

  public simpiTitleInputChanged(): void {
    this.simpiTitleChangeResult = null;
  }

  public simpiDescriptionInputChanged(): void {
    this.simpiDescriptionChangeResult = null;
  }

  public simpiGroupNameInputChanged(): void {
    this.simpiGroupNameChangeResult = null;
  }

  public startPanelVisibilityChanged(): void {
    this.startPanelVisibilityChangeResult = null;
  }

  public changeSimpiDeploymentState() {
    if (!this.simpi) {
      this.deploymentStateChangeResult = 'SIMPI not loaded.';
      return;
    }

    if (!this.simpiFormGroup.get('deploymentState').valid) {
      this.deploymentStateChangeResult = 'Invalid privacy settings.';
      return;
    }

    const newDeploymentState: DeploymentStateResponse = this.simpiFormGroup.get('deploymentState').value;

    if (newDeploymentState === this.simpi.deploymentInfo?.deploymentState) {
      this.deploymentStateChangeResult = null;
      return;
    }

    this.deploymentStateChangeResult = 'Saving...';

    this.simpiService.changeSimpiDeploymentInfo(this.simpi.simpiId, newDeploymentState as unknown as DeploymentStateRequest)
      .subscribe((response) => {
        if (response.ok) {
          this.deploymentStateChangeResult = 'Privacy settings saved ✔';
          this.simpi.deploymentInfo.deploymentState = newDeploymentState;
        } else {
          this.deploymentStateChangeResult = '❌ Privacy settings could not be saved.';
          this.simpiFormGroup.get('deploymentState').patchValue(this.simpi.deploymentInfo?.deploymentState);
        }
      }, () => {
        this.deploymentStateChangeResult = '❌ An error occurred while saving privacy settings.';
        this.simpiFormGroup.get('deploymentState').patchValue(this.simpi.deploymentInfo?.deploymentState);
      });
  }

  private openSimpiThumbnailChangeModal(): void {
    if (this.simpi) {
      if (!this.uploadImageModalComponent) {
        console.error('SimpiSettingsComponent: input `uploadImageModalComponent` not provided by parent component.');
        return;
      }
      const modalRef = this.modalService.open(this.uploadImageModalComponent);
      modalRef.componentInstance.imageType = ImageType.SimpiThumbnail;
      modalRef.componentInstance.modalTitle = 'Upload SIMPI Thumbnail';
      modalRef.result.then(result => {
        if (result !== 'Cancel click') {
          this.simpiThumbnailChangeResult = 'Saving thumbnail...';
          this.simpiService.changeSimpiThumbnail(this.simpi.simpiId, result.uploadedImageId)
            .subscribe((response) => {
              if (response.ok) {
                this.simpi.thumbnailId = result.uploadedImageId;
                this.simpi.thumbnailUrl = this.simpiService.getThumbnailUrl(result.uploadedImageId);
                this.uploadImgModalService.clearState();
                this.simpiThumbnailChangeResult = 'Thumbnail saved ✔';
              } else {
                this.simpiThumbnailChangeResult = '❌ Thumbnail could not be saved.';
              }
            }, () => {
              this.simpiThumbnailChangeResult = '❌ An error occurred while saving thumbnail.';
            });
        }
      });
    }
  }

  public deleteSimpi(): void {
    if (this.simpi) {
      this.simpiDeletedResult = 'Deleting SIMPI...';
      this.simpiService.deleteSimpi(this.simpi.simpiId)
        .subscribe(result => {
          if (result.ok) {
            this.simpi.deleted = true;
            this.simpiDeletedResult = 'SIMPI deleted ✔';
            this.clearSimpiDeletedResultDelayed();
          } else {
            this.simpiDeletedResult = '❌ SIMPI could not be deleted.';
            this.clearSimpiDeletedResultDelayed();
          }
        }, () => {
          this.simpiDeletedResult = '❌ An error occurred while deleting SIMPI.';
          this.clearSimpiDeletedResultDelayed();
        });
    }
  }

  public restoreSimpi(): void {
    if (this.simpi) {
      this.simpiDeletedResult = 'Restoring SIMPI...';
      this.simpiService.restoreSimpi(this.simpi.simpiId)
        .subscribe(result => {
          if (result.ok) {
            this.simpi.deleted = false;
            this.simpiDeletedResult = 'SIMPI restored ✔';
            this.clearSimpiDeletedResultDelayed();
          } else {
            this.simpiDeletedResult = '❌ SIMPI could not be restored.';
            this.clearSimpiDeletedResultDelayed();
          }
        }, () => {
          this.simpiDeletedResult = '❌ An error occurred while restoring SIMPI.';
          this.clearSimpiDeletedResultDelayed();
        });
    }
  }

  private clearSimpiDeletedResultDelayed(): void {
    window.setTimeout(() => {
      this.simpiDeletedResult = null;
    }, 10000);
  }

  public generateThumbnailFromFirstStep(): void {
    this.simpiThumbnailChangeResult = 'Generating thumbnail...';
    this.stepService.getSteps(this.simpi.simpiId, false, true)
      .pipe(
        takeWhile(() => this.componentActive),
        map(stepResponse => stepResponse?.filter(x => !x.deleted && x.thumbnailId)),
        tap(stepResponse => {
          if (!!stepResponse?.length) {
            this.simpiThumbnailChangeResult = 'Loading step image...';
          } else {
            this.simpiThumbnailChangeResult = 'No steps found.';
          }
        }),
        filter(stepResponse => !!stepResponse?.length),
        map(stepResponse => this.stepService.getStepImageUrl(stepResponse[0]?.thumbnailId)),
        switchMap(firstStepThumbnailUrl => from(this.imageService.cropAndScaleImage(firstStepThumbnailUrl, new Vector2(168, 269)))),
        switchMap((resizedImageFile) => {
          this.simpiThumbnailChangeResult = 'Uploading thumbnail...';
          return this.simpiService.uploadThumbnail(resizedImageFile)
            .pipe(switchMap(imageId => (this.simpiService.changeSimpiThumbnail(this.simpi.simpiId, imageId)
              .pipe(map(changeSimpiThumbnailResponse => ({imageId, changeSimpiThumbnailResponse}))))));
        }),
        take(1)
      )
      .subscribe(result => {
        if (result.changeSimpiThumbnailResponse.ok) {
          this.simpiThumbnailChangeResult = 'Thumbnail Saved ✔';
          this.simpi.thumbnailId = result.imageId;
          this.simpi.thumbnailUrl = this.simpiService.getThumbnailUrl(result.imageId);
        } else {
          this.simpiThumbnailChangeResult = '❌ Thumbnail could not be saved.';
        }
      }, (error) => {
        this.simpiThumbnailChangeResult = '❌ An error occurred while generating thumbnail.';
        console.error(error);
      });
  }

  public onSelectedChange(newValue): void {

    let groupNameResponse: GroupNameResponse;

    if (newValue instanceof FocusEvent) {
      // @ts-ignore
      groupNameResponse = { name: newValue.target.value };
    } else if (newValue.name) {
      groupNameResponse = newValue;
    } else {
      groupNameResponse = { name: newValue };
    }

    this.changeGroupName(groupNameResponse);
  }

  public ngOnDestroy(): void {
    this.componentActive = false;
  }
}
