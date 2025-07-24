import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DeploymentStateResponse, ResourceResponse } from "../../models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ImageType,
  UploadImgModalService,
} from "../../services/images/upload-img-modal.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ResourceService } from "../../services/resources/resource.service";
import { Observable } from "rxjs";
import { forbiddHttp_sValidator } from "../../shared/validators/forbitHttp_s.validator";
import { ActivatedRoute, Router } from "@angular/router";
import { tryCreateUrl } from "../../../../../simpi-frontend-web/src/app/shared/helpers/tryCreateUrl";

@Component({
  selector: "sim-asset-settings",
  templateUrl: "./asset-settings.component.html",
  styleUrls: ["./asset-settings.component.scss"],
})
export class AssetSettingsComponent implements OnInit {
  private _asset: ResourceResponse;
  private returnTo: string;
  public assetTypes$: Observable<{ text: string; value: number }[]>;

  @Input()
  public set asset(value: ResourceResponse) {
    this._asset = value;
    if (value) {
      this.populateAssetForm();
    }
  }

  @Input()
  public showNextButton: boolean = false;

  @Input()
  public uploadImageModalComponent: any;

  @Output()
  public navigateBack: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onNextClick: EventEmitter<void> = new EventEmitter<void>();

  public get asset(): ResourceResponse {
    return this._asset;
  }

  public assetFormGroup: FormGroup;

  public deploymentState: typeof DeploymentStateResponse =
    DeploymentStateResponse;

  public assetTitleChangeResult: string;

  public assetDescriptionChangeResult: string;

  public assetManufacturerChangeResult: string;

  public assetShoppingLinkChangeResult: string;

  public assetTypeChangeResult: string;

  public assetThumbnailChangeResult: string;

  public assetDeletedResult: string;

  public assetShowOnStartPanelChangeResult: string;

  constructor(
    private fb: FormBuilder,
    private assetService: ResourceService,
    private modalService: NgbModal,
    private uploadImgModalService: UploadImgModalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const returnTo =
      this.router.getCurrentNavigation()?.extras?.state?.returnTo;
    if (returnTo) {
      this.returnTo = returnTo;
    }
  }

  public ngOnInit(): void {
    this.assetTypes$ = this.assetService.getResourceTypes();
    this.assetTitleChangeResult = null;
    this.assetDescriptionChangeResult = null;
    this.assetManufacturerChangeResult = null;
    this.assetTypeChangeResult = null;
    this.assetThumbnailChangeResult = null;
    this.assetShoppingLinkChangeResult = null;
    this.assetDeletedResult = null;
    this.assetShowOnStartPanelChangeResult = null;
  }

  public changeAssetThumbnailClicked(): void {
    this.assetThumbnailChangeResult = null;
    this.openAssetThumbnailChangeModal();
  }

  public onNavigateBackClick(): void {
    this.navigateBack.emit(this.returnTo);
  }

  private populateAssetForm(): void {
    this.assetFormGroup = this.fb.group({
      title: [this.asset.title, Validators.required],
      thumbnailId: this.asset.thumbnailId,
      description: this.asset.description,
      manufacturer: this.asset.manufacturer,
      shoppingLink: [
        this.asset.shoppingLink,
        forbiddHttp_sValidator(/(http|https)/),
      ],
      resourceType: this.asset.resourceType,
      resourceId: this.asset.resourceId,
      showOnStartPanel: this.asset.showOnStartPanel,
    });
  }

  public changeTitle(): void {
    if (!this.asset) {
      this.assetTitleChangeResult = "Asset not loaded.";
      return;
    }

    if (!this.assetFormGroup.get("title").valid) {
      this.assetTitleChangeResult = "Invalid Asset title.";
      return;
    }

    const newAssetTitle: string = this.assetFormGroup.get("title").value;

    if (newAssetTitle === this.asset.title) {
      this.assetTitleChangeResult = null;
      return;
    }

    this.assetTitleChangeResult = "Saving...";

    this.assetService
      .changeTitle(this.asset.resourceId, newAssetTitle)
      .subscribe(
        (response) => {
          if (response.ok) {
            this.assetTitleChangeResult = "Title saved ✔";
            this.asset.title = newAssetTitle;
            this.asset.alias = response.body?.newAlias;
          } else {
            this.assetTitleChangeResult = "❌ Asset title could not be saved.";
            this.assetFormGroup.get("title").patchValue(this.asset.title);
          }
        },
        () => {
          this.assetTitleChangeResult =
            "❌ An error occurred while saving the Assets title.";
          this.assetFormGroup.get("title").patchValue(this.asset.title);
        }
      );
  }

  public changeDescription(): void {
    if (!this.asset) {
      this.assetDescriptionChangeResult = "Asset not loaded.";
      return;
    }

    if (!this.assetFormGroup.get("description").valid) {
      this.assetDescriptionChangeResult = "Invalid Asset description.";
      return;
    }

    const newAssetDescription: string =
      this.assetFormGroup.get("description").value;

    if (newAssetDescription === this.asset.description) {
      this.assetDescriptionChangeResult = null;
      return;
    }

    this.assetDescriptionChangeResult = "Saving...";

    this.assetService
      .changeDescription(this.asset.resourceId, newAssetDescription)
      .subscribe(
        (response) => {
          if (response.ok) {
            this.assetDescriptionChangeResult = "Description saved ✔";
            this.asset.description = newAssetDescription;
          } else {
            this.assetDescriptionChangeResult =
              "❌ Asset description could not be saved.";
            this.assetFormGroup
              .get("description")
              .patchValue(this.asset.description);
          }
        },
        () => {
          this.assetDescriptionChangeResult =
            "❌ An error occurred while saving the Assets description.";
          this.assetFormGroup
            .get("description")
            .patchValue(this.asset.description);
        }
      );
  }

  public changeManufacturer(): void {
    if (!this.asset) {
      this.assetManufacturerChangeResult = "Asset not loaded.";
      return;
    }

    if (!this.assetFormGroup.get("manufacturer").valid) {
      this.assetManufacturerChangeResult = "Invalid Asset manufacturer.";
      return;
    }

    const newAssetManufacturer: string =
      this.assetFormGroup.get("manufacturer").value;

    if (newAssetManufacturer === this.asset.manufacturer) {
      this.assetManufacturerChangeResult = null;
      return;
    }

    this.assetManufacturerChangeResult = "Saving...";

    this.assetService
      .changeManufacturer(this.asset.resourceId, newAssetManufacturer)
      .subscribe(
        (response) => {
          if (response.ok) {
            this.assetManufacturerChangeResult = "Manufacturer saved ✔";
            this.asset.manufacturer = newAssetManufacturer;
          } else {
            this.assetManufacturerChangeResult =
              "❌ Asset manufacturer could not be saved.";
            this.assetFormGroup
              .get("manufacturer")
              .patchValue(this.asset.manufacturer);
          }
        },
        () => {
          this.assetManufacturerChangeResult =
            "❌ An error occurred while saving the Assets manufacturer.";
          this.assetFormGroup
            .get("manufacturer")
            .patchValue(this.asset.manufacturer);
        }
      );
  }

  public changeAssetType(): void {
    if (!this.asset) {
      this.assetTypeChangeResult = "Asset not loaded.";
      return;
    }

    if (
      !this.assetFormGroup.get("resourceType").valid ||
      this.assetFormGroup.get("resourceType").value == null
    ) {
      this.assetTypeChangeResult = "Invalid Asset resource type.";
      return;
    }

    const newResourceType = this.assetFormGroup.get("resourceType").value;

    if (newResourceType === this.asset.manufacturer) {
      this.assetTypeChangeResult = null;
      return;
    }

    this.assetTypeChangeResult = "Saving...";

    this.assetService
      .changeResourceType(this.asset.resourceId, +newResourceType)
      .subscribe(
        (response) => {
          if (response.ok) {
            this.assetTypeChangeResult = "Asset type saved ✔";
            this.asset.resourceType = newResourceType;
          } else {
            this.assetTypeChangeResult = "❌ Asset type could not be saved.";
            this.assetFormGroup
              .get("resourceType")
              .patchValue(this.asset.resourceType);
          }
        },
        () => {
          this.assetTypeChangeResult =
            "❌ An error occurred while saving the Assets type.";
          this.assetFormGroup
            .get("resourceType")
            .patchValue(this.asset.resourceType);
        }
      );
  }

  public onPasteShoppingLink(e: ClipboardEvent): void {
    e.preventDefault();
    const value = e.clipboardData?.getData("text/plain");
    if (value) {
      const shoppingLink = tryCreateUrl(value);
      this.setShoppingLink(shoppingLink);
    }
  }

  public changeShowOnStartPanel(): void {
    if (!this.asset) {
      this.assetShowOnStartPanelChangeResult = "❌ Asset not loaded.";
      return;
    }

    const newResourceShowOnStartPanel = this.assetFormGroup.get("showOnStartPanel").value;

    if (newResourceShowOnStartPanel === this.asset.manufacturer) {
      this.assetShowOnStartPanelChangeResult = null;
      return;
    }

    this.assetShowOnStartPanelChangeResult = "Saving...";

    this.assetService
      .changeShowOnStartPanel(this.asset.resourceId, newResourceShowOnStartPanel)
      .subscribe(
        (response) => {
          if (response.ok) {
            this.assetShowOnStartPanelChangeResult = "saved ✔";
            this.asset.showOnStartPanel = newResourceShowOnStartPanel;
          } else {
            this.assetShowOnStartPanelChangeResult = "❌ showOnStartPanel option could not be saved.";
            this.assetFormGroup
              .get("showOnStartPanel")
              .patchValue(this.asset.showOnStartPanel);
          }
        },
        () => {
          this.assetShowOnStartPanelChangeResult =
            "❌ An error occurred while saving the showOnStartPanel option.";
          this.assetFormGroup
            .get("showOnStartPanel")
            .patchValue(this.asset.showOnStartPanel);
        }
      );
  }

  public changeShoppingLink(): void {
    if (!this.asset) {
      this.assetShoppingLinkChangeResult = "Asset not loaded.";
      return;
    }

    const shoppingLink = tryCreateUrl(
      this.assetFormGroup.get("shoppingLink").value
    );
    this.setShoppingLink(shoppingLink);

    if (!this.assetFormGroup.get("shoppingLink").valid) {
      this.assetShoppingLinkChangeResult =
        "Invalid shopping Link. Please remove http:// or https://.";
      return;
    }

    const newShoppingLink: string =
      this.assetFormGroup.get("shoppingLink").value;

    if (newShoppingLink === this.asset.manufacturer) {
      this.assetShoppingLinkChangeResult = null;
      return;
    }

    this.assetShoppingLinkChangeResult = "Saving...";

    this.assetService
      .changeShoppingLink(this.asset.resourceId, newShoppingLink)
      .subscribe(
        (response) => {
          if (response.ok) {
            this.assetShoppingLinkChangeResult = "Shopping link saved ✔";
            this.asset.shoppingLink = newShoppingLink;
          } else {
            this.assetShoppingLinkChangeResult =
              "❌ Asset shopping link could not be saved.";
            this.assetFormGroup
              .get("shoppingLink")
              .patchValue(this.asset.shoppingLink);
          }
        },
        () => {
          this.assetShoppingLinkChangeResult =
            "❌ An error occurred while saving the Assets shopping link.";
          this.assetFormGroup
            .get("shoppingLink")
            .patchValue(this.asset.shoppingLink);
        }
      );
  }

  public assetTitleInputChanged(): void {
    this.assetTitleChangeResult = null;
  }

  public descriptionInputChanged(): void {
    this.assetDescriptionChangeResult = null;
  }

  public manufacturerInputChanged(): void {
    this.assetManufacturerChangeResult = null;
  }

  public assetTypeSelectChanged(): void {
    this.assetTypeChangeResult = null;
  }

  public shoppingLinkInputChanged(): void {
    this.assetShoppingLinkChangeResult = null;
  }

  private openAssetThumbnailChangeModal(): void {
    if (this.asset) {
      if (!this.uploadImageModalComponent) {
        console.error('AssetSettingsComponent: input `uploadImageModalComponent` not provided by parent component.')
        return;
      }
      const modalRef = this.modalService.open(this.uploadImageModalComponent);
      modalRef.componentInstance.imageType = ImageType.ResourceImage;
      modalRef.componentInstance.modalTitle = "Upload Asset Thumbnail";
      modalRef.result.then((result) => {
        if (result !== "Cancel click") {
          this.assetThumbnailChangeResult = "Saving thumbnail...";
          this.assetService
            .changeThumbnail(this.asset.resourceId, result.uploadedImageId)
            .subscribe(
              (response) => {
                if (response.ok) {
                  this.asset.thumbnailId = result.uploadedImageId;
                  this.asset.thumbnailUrl =
                    this.assetService.getResourceImageUrl(
                      result.uploadedImageId
                    );
                  this.uploadImgModalService.clearState();
                  this.assetThumbnailChangeResult = "Thumbnail saved ✔";
                } else {
                  this.assetThumbnailChangeResult =
                    "❌ Thumbnail could not be saved.";
                }
              },
              () => {
                this.assetThumbnailChangeResult =
                  "❌ An error occurred while saving thumbnail.";
              }
            );
        }
      });
    }
  }

  public deleteAsset(): void {
    if (this.asset) {
      this.assetDeletedResult = "Deleting Asset...";
      this.assetService.deleteResource(this.asset.resourceId).subscribe(
        (result) => {
          if (result.ok) {
            this.asset.deleted = true;
            this.assetDeletedResult = "Asset deleted ✔";
            this.clearAssetDeletedResultDelayed();
          } else {
            this.assetDeletedResult = "❌ Asset could not be deleted.";
            this.clearAssetDeletedResultDelayed();
          }
        },
        () => {
          this.assetDeletedResult =
            "❌ An error occurred while deleting Asset.";
          this.clearAssetDeletedResultDelayed();
        }
      );
    }
  }

  public restoreAsset(): void {
    if (this.asset) {
      this.assetDeletedResult = "Restoring Asset...";
      this.assetService.restoreResource(this.asset.resourceId).subscribe(
        (result) => {
          if (result.ok) {
            this.asset.deleted = false;
            this.assetDeletedResult = "Asset restored ✔";
            this.clearAssetDeletedResultDelayed();
          } else {
            this.assetDeletedResult = "❌ Asset could not be restored.";
            this.clearAssetDeletedResultDelayed();
          }
        },
        () => {
          this.assetDeletedResult =
            "❌ An error occurred while restoring Asset.";
          this.clearAssetDeletedResultDelayed();
        }
      );
    }
  }

  private setShoppingLink(shoppingLink: string): void {
    this.assetFormGroup.patchValue({ shoppingLink });
  }

  private clearAssetDeletedResultDelayed(): void {
    window.setTimeout(() => {
      this.assetDeletedResult = null;
    }, 10000);
  }
}
