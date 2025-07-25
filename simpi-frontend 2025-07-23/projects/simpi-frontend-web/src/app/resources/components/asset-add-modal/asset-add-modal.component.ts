import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { ImageType } from "../../../../../../simpi-frontend-common/src/lib/services/images/upload-img-modal.service";
import { ResourceService } from "../../../../../../simpi-frontend-common/src/lib/services/resources/resource.service";
import { UploadImgModalComponent } from "../../../shared/components/upload-img-modal/upload-img-modal.component";
import { tryCreateUrl } from "../../../shared/helpers/tryCreateUrl";

@Component({
  selector: "sim-asset-add-modal",
  templateUrl: "asset-add-modal.component.html",
  styleUrls: ["asset-add-modal.component.scss"],
})
export class AssetAddModalComponent implements OnInit {
  public createAssetForm: UntypedFormGroup;
  public assetTypes$: Observable<{ text: string; value: number }[]>;
  public thumbnailUrl: string | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal,
    private assetService: ResourceService
  ) {}

  public ngOnInit(): void {
    this.assetTypes$ = this.assetService.getResourceTypes();
    this.initForm();
  }

  public onPasteShoppingLink(e: ClipboardEvent): void {
    e.preventDefault();
    const value = e.clipboardData?.getData("text/plain");
    if (value) {
      const shoppingLink = tryCreateUrl(value);
      this.setShoppingLink(shoppingLink);
    }
  }

  public onCheckShoppingLink(): void {
    const shoppingLink = tryCreateUrl(
      this.createAssetForm.get("shoppingLink").value
    );
    this.setShoppingLink(shoppingLink);
  }

  public changeAssetThumbnail(): void {
    try {
      const modalRef = this.modalService.open(UploadImgModalComponent, {
        backdrop: 'static',
        keyboard: false
      });
      modalRef.componentInstance.imageType = ImageType.ResourceImage;
      modalRef.componentInstance.modalTitle = "Upload Asset Thumbnail";
      modalRef.result.then((result) => {
        if (result !== "Cancel click") {
          this.thumbnailUrl = result.uploadedImageUrl;
          this.createAssetForm.patchValue({
            thumbnailId: result.uploadedImageId,
          });
        }
      }).catch((error) => {
        console.warn('Modal was dismissed:', error);
      });
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  }

  private setShoppingLink(shoppingLink: string): void {
    this.createAssetForm.patchValue({ shoppingLink });
  }

  private initForm(): void {
    this.createAssetForm = this.fb.group({
      title: ["", Validators.required],
      thumbnailId: "",
      description: "",
      manufacturer: "",
      shoppingLink: "",
      resourceType: null,
      resourceId: null,
      showOnStartPanel: true,
    });
  }
}
