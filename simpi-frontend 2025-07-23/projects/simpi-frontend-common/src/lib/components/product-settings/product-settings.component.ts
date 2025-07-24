import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeploymentStateRequest, DeploymentStateResponse, ProductResponse } from '../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services';
import { ImageType, UploadImgModalService } from '../../services/images/upload-img-modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from '../../services/images/image.service';
import { Vector2 } from '../../../step-editor/models/vector2';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'sim-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.scss'],
})
export class ProductSettingsComponent implements OnInit {

  private _product: ProductResponse;

  @Input()
  public set product(value: ProductResponse) {
    this._product = value;
    if (value) {
      this.populateProductForm();
    }
  }

  @Input()
  public uploadImageModalComponent: any;

  @Output()
  public navigateBack: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public aliasChanged: EventEmitter<string> = new EventEmitter<string>();

  public get product(): ProductResponse {
    return this._product;
  }

  public productFormGroup: FormGroup;

  public deploymentState: typeof DeploymentStateResponse = DeploymentStateResponse;

  public productNameChangeResult: string;

  public productHideTitleResult: string;

  public deploymentStateChangeResult: string;

  public productImageChangeResult: string;

  public productPageImageChangeResult: string;

  public productDeletedResult: string;

  constructor(private fb: FormBuilder, private productService: ProductService, private modalService: NgbModal,
              private uploadImgModalService: UploadImgModalService, private imageService: ImageService) {
  }

  public ngOnInit(): void {
    this.productNameChangeResult = null;
    this.deploymentStateChangeResult = null;
    this.productImageChangeResult = null;
    this.productPageImageChangeResult = null;
    this.productDeletedResult = null;
  }

  public changeProductImageClicked(): void {
    this.productImageChangeResult = null;
    this.openProductImageChangeModal();
  }

  public onCloseClick(): void {
    this.navigateBack.emit();
  }

  public onSaveClick(): void {
    this.navigateBack.emit();
  }

  public changeProductPageImageClicked(): void {
    this.productPageImageChangeResult = null;
    this.openProductPageImageChangeModal();
  }

  private populateProductForm(): void {
    this.productFormGroup = this.fb.group({
      productName: [this._product.productName, Validators.required],
      deploymentState: [this._product.deploymentState],
      hideProductTitle: [this._product.hideTitle]
    });
  }

  public renameProduct(): void {
    if (!this.product) {
      this.productNameChangeResult = 'Product not loaded.';
      return;
    }

    if (!this.productFormGroup.get('productName').valid) {
      this.productNameChangeResult = 'Invalid product name.';
      return;
    }

    const newProductName: string = this.productFormGroup.get('productName').value;

    if (newProductName === this.product.productName) {
      this.productNameChangeResult = null;
      return;
    }

    this.productNameChangeResult = 'Saving...';

    this.productService.renameProduct(this.product.productId, newProductName)
      .subscribe((response) => {
        if (response.ok) {
          this.productNameChangeResult = 'Saved ✔';
          this.product.productName = newProductName;
          this.product.productAlias = response.body?.newProductAlias;
          this.aliasChanged.emit(response.body?.newProductAlias);
        } else {
          this.productNameChangeResult = '❌ Product name could not be saved.';
          this.productFormGroup.get('productName').patchValue(this.product.productName);
        }
      }, () => {
        this.productNameChangeResult = '❌ An error occurred while saving product name.';
        this.productFormGroup.get('productName').patchValue(this.product.productName);
      });
  }

  public productNameInputChanged(): void {
    this.productNameChangeResult = null;
  }


  public hideProductName(): void {
    if (!this.product) {
      this.productHideTitleResult = 'Product not loaded.';
      return;
    }

    const newHideProductTitle: boolean = this.productFormGroup.get('hideProductTitle').value;

    if (newHideProductTitle === this.product.hideTitle) {
      this.productHideTitleResult = null;
      return;
    }

    this.productHideTitleResult = 'Saving...';

    let productId: string;
    if (typeof this.product.productId === 'string') {
      productId = this.product.productId;
    } else {
      try {
        productId = String(this.product.productId);
      } catch (error) {
        console.error('Invalid product ID format:', error);
        this.productHideTitleResult = '❌ Invalid product ID.';
        return;
      }
    }

    this.productService.changeHideTitle(productId, newHideProductTitle)
      .subscribe({
        next: (response) => {
          if (response.ok) {
            this.productHideTitleResult = 'Saved ✓';
            this.product.hideTitle = newHideProductTitle;
          } else {
            this.productHideTitleResult = '❌ Could not save setting.';
            this.resetFormControlValue();
          }
        },
        // remove extra information for production
        error: (error) => {
          console.error('Error updating hide title setting:', error);
          if (error.status === 404) {
            this.productHideTitleResult = '❌ API endpoint not found.';
          } else if (error.status === 403) {
            this.productHideTitleResult = '❌ Permission denied.';
          } else {
            this.productHideTitleResult = '❌ Save failed.';
          }
          this.resetFormControlValue();
        }
      });
  }

  private resetFormControlValue(): void {
    this.productFormGroup.get('hideProductTitle').patchValue(this.product.hideTitle, { emitEvent: false });
  }

  public changeProductDeploymentState() {
    if (!this.product) {
      this.deploymentStateChangeResult = 'Product not loaded.';
      return;
    }

    if (!this.productFormGroup.get('deploymentState').valid) {
      this.deploymentStateChangeResult = 'Invalid deployment state.';
      return;
    }

    const newDeploymentState: DeploymentStateResponse = this.productFormGroup.get('deploymentState').value;

    if (newDeploymentState === this.product.deploymentState) {
      this.deploymentStateChangeResult = null;
      return;
    }

    this.deploymentStateChangeResult = 'Saving...';

    this.productService.changeDeploymentState(this.product.productId, newDeploymentState as unknown as DeploymentStateRequest)
      .subscribe((response) => {
        if (response.ok) {
          this.deploymentStateChangeResult = 'Saved ✔';
          this.product.deploymentState = newDeploymentState;
        } else {
          this.deploymentStateChangeResult = '❌ Deployment state could not be saved.';
          this.productFormGroup.get('deploymentState').patchValue(this.product.deploymentState);
        }
      }, () => {
        this.deploymentStateChangeResult = '❌ An error occurred while saving deployment state.';
        this.productFormGroup.get('deploymentState').patchValue(this.product.deploymentState);
      });
  }

  private openProductPageImageChangeModal(): void {
    if (this.product) {
      if (!this.uploadImageModalComponent) {
        console.error('ProductSettingsComponent: input `uploadImageModalComponent` not provided by parent component.');
        return;
      }
      const modalRef = this.modalService.open(this.uploadImageModalComponent);
      modalRef.componentInstance.imageType = ImageType.ProductPageImage;
      modalRef.componentInstance.modalTitle = 'Upload Product Cover Image';
      modalRef.result.then(result => {
        if (result !== 'Cancel click') {
          this.productPageImageChangeResult = 'Saving cover image...';
          this.productService.changeProductPageImage(this.product.productId, result.uploadedImageId)
            .subscribe((response) => {
              if (response.ok) {
                this.product.productPageImageId = result.uploadedImageId;
                this.product.productPageImageUrl = this.productService.getProductPageImageUrl(result.uploadedImageId);
                this.uploadImgModalService.clearState();
                this.productPageImageChangeResult = 'Cover image saved ✔';
              } else {
                this.productPageImageChangeResult = '❌ Cover image could not be saved.';
              }
            }, () => {
              this.productPageImageChangeResult = '❌ An error occurred while saving cover image.';
            });
        }
      });
    }
  }

  private openProductImageChangeModal(): void {
    if (this.product) {
      if (!this.uploadImageModalComponent) {
        console.error('ProductSettingsComponent: input `uploadImageModalComponent` not provided by parent component.');
        return;
      }
      const modalRef = this.modalService.open(this.uploadImageModalComponent);
      modalRef.componentInstance.imageType = ImageType.ProductImage;
      modalRef.componentInstance.modalTitle = 'Upload Product Thumbnail';
      modalRef.result.then(result => {
        if (result !== 'Cancel click') {
          this.productImageChangeResult = 'Saving thumbnail...';
          this.productService.changeProductImage(this.product.productId, result.uploadedImageId)
            .subscribe((response) => {
              if (response.ok) {
                this.product.productImageId = result.uploadedImageId;
                this.product.productImageUrl = this.productService.getProductImageUrl(result.uploadedImageId);
                this.uploadImgModalService.clearState();
                this.productImageChangeResult = 'Thumbnail saved ✔';
              } else {
                this.productImageChangeResult = '❌ Thumbnail could not be saved.';
              }
            }, () => {
              this.productImageChangeResult = '❌ An error occurred while saving thumbnail.';
            });
        }
      });
    }
  }

  public generateThumbnailFromCoverImage(): void {
    this.productImageChangeResult = 'Generating thumbnail...';
    this.imageService.cropAndScaleImage(this.product.productPageImageUrl, new Vector2(168, 160))
      .then((resizedImageFile) => {
        this.productImageChangeResult = 'Uploading thumbnail...';
        this.productService.uploadProductImage(resizedImageFile)
          .pipe(switchMap(imageId => (this.productService.changeProductImage(this.product.productId, imageId)
            .pipe(map(changeProductImageResponse => ({ imageId, changeProductImageResponse }))))))
          .subscribe(result => {
            if (result.changeProductImageResponse.ok) {
              this.productImageChangeResult = 'Thumbnail Saved ✔';
              this.product.productImageId = result.imageId;
              this.product.productImageUrl = this.productService.getProductImageUrl(result.imageId);
            } else {
              this.productImageChangeResult = '❌ Thumbnail could not be saved.';
            }
          }, () => {
            this.productImageChangeResult = '❌ Thumbnail could not be saved.';
          });
      })
      .catch(() => {
        this.productImageChangeResult = '❌ An error occurred while generating thumbnail.';
      });
  }

  public deleteProduct(): void {
    if (this.product) {
      this.productDeletedResult = 'Deleting product...';
      this.productService.deleteProduct(this.product.productId)
        .subscribe(result => {
          if (result.ok) {
            this.product.deleted = true;
            this.productDeletedResult = 'Product deleted ✔';
            this.clearProductDeletedResultDelayed();
          } else {
            this.productDeletedResult = '❌ Product could not be deleted.';
            this.clearProductDeletedResultDelayed();
          }
        }, () => {
          this.productDeletedResult = '❌ An error occurred while deleting product.';
          this.clearProductDeletedResultDelayed();
        });
    }
  }

  public restoreProduct(): void {
    if (this.product) {
      this.productDeletedResult = 'Restoring product...';
      this.productService.restoreProduct(this.product.productId)
        .subscribe(result => {
          if (result.ok) {
            this.product.deleted = false;
            this.productDeletedResult = 'Product restored ✔';
            this.clearProductDeletedResultDelayed();
          } else {
            this.productDeletedResult = '❌ Product could not be restored.';
            this.clearProductDeletedResultDelayed();
          }
        }, () => {
          this.productDeletedResult = '❌ An error occurred while restoring product.';
          this.clearProductDeletedResultDelayed();
        });
    }
  }

  private clearProductDeletedResultDelayed(): void {
    window.setTimeout(() => {
      this.productDeletedResult = null;
    }, 10000);
  }
}
