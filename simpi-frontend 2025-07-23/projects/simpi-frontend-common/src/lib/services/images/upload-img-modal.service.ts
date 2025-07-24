import { Injectable } from '@angular/core';
import { ProductService } from '../products/product.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BrandService } from '../brand/brand.service';
import { ResourceService } from '../resources/resource.service';
import { SimpiService } from '../simpis/simpi.service';
import { StepMediaUploadService } from '../steps/step-media-upload.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import { StepService } from '../steps/step.service';

export enum ImageType {
  ProductImage,
  ProductPageImage,
  CorporateIdentityLogo,
  ResourceImage,
  SimpiThumbnail,
  StepMedia,
}

@Injectable({
  providedIn: 'root'
})
export class UploadImgModalService {

  private lastUploadedImageId: string;
  private lastUploadedImageType: ImageType;

  constructor(private productService: ProductService, private brandService: BrandService,
              private resourceService: ResourceService, private simpiService: SimpiService,
              private stepMediaUploadService: StepMediaUploadService, private stepService: StepService) {
  }

  /**
   * Uploads the imageFile of given type to the server and returns the imageId.
   *
   * The file upload is not started until the returned observable is subscribed.
   *
   * The upload itself is performed by a different service. The service and its upload
   * method are chosen depending on the image type. So, if you add a new image type you
   * also have to call the respective service that handles the upload.
   *
   * @param imageType Type of image that should be uploaded.
   * @param imageFile The file handle for the image that should be uploaded.
   * @returns Observable containing the id of the uploaded image
   */
  public uploadImageToServer(imageType: ImageType, imageFile: File): Observable<string> {
    switch (imageType) {
      case ImageType.ProductImage:
        return this.productService.uploadProductImage(imageFile)
          .pipe(
            tap(uploadedImageId => this.persistState(uploadedImageId, imageType)),
          );

      case ImageType.ProductPageImage:
        return this.productService.uploadProductPageImage(imageFile)
          .pipe(
            tap(uploadedImageId => this.persistState(uploadedImageId, imageType)),
          );

      case ImageType.CorporateIdentityLogo:
        return this.brandService.uploadLogo(imageFile)
          .pipe(
            tap(uploadedImageId => this.persistState(uploadedImageId, imageType)),
          );
      case ImageType.ResourceImage:
        return this.resourceService.uploadThumbnail(imageFile)
          .pipe(
            tap(uploadedImageId => this.persistState(uploadedImageId, imageType)),
          );
      case ImageType.SimpiThumbnail:
        return this.simpiService.uploadThumbnail(imageFile)
          .pipe(
            tap(uploadedImageId => this.persistState(uploadedImageId, imageType)),
          );
      case ImageType.StepMedia:
        return fromPromise(this.stepMediaUploadService.uploadStepMedia(imageFile))
          .pipe(
            map(uploadResult => uploadResult.thumbnailId),
            tap(uploadedImageId => this.persistState(uploadedImageId, imageType)),
          );
      default:
        console.error('Invalid image type passed to upload image method: %s', imageType);
        break;
    }
  }

  /**
   * Deletes the image that was last uploaded by the method `uploadImageToServer` from the server.
   *
   * The delete request will just be sent when the returned observable is subscribed.
   */
  public deleteLastUploadedImageFromServer(): Observable<boolean> {
    if (this.lastUploadedImageId) {
      switch (this.lastUploadedImageType) {
        case ImageType.ProductImage:
          return this.productService.removeProductImage(this.lastUploadedImageId)
            .pipe(map(response => {
              if (response.status === 204) {
                this.clearState();
                return true;
              }
              return false;
            }));
        case ImageType.ProductPageImage:
          return this.productService.removeProductPageImage(this.lastUploadedImageId)
            .pipe(map(response => {
              if (response.status === 204) {
                this.clearState();
                return true;
              }
              return false;
            }));
        case ImageType.CorporateIdentityLogo:
          return this.brandService.deleteLogo(this.lastUploadedImageId)
            .pipe(map(response => {
              if (response.status === 204) {
                this.clearState();
                return true;
              }
              return false;
            }));
        case ImageType.ResourceImage:
          return this.resourceService.deleteThumbnail(this.lastUploadedImageId)
            .pipe(map(response => {
              if (response.status === 204) {
                this.clearState();
                return true;
              }
              return false;
            }));
        case ImageType.SimpiThumbnail:
          return this.simpiService.removeThumbnail(this.lastUploadedImageId)
            .pipe(map(response => {
              if (response.status === 204) {
                this.clearState();
                return true;
              }
              return false;
            }));
        case ImageType.StepMedia:
          return fromPromise(this.stepMediaUploadService.removeLastUploadedStepMediaFromServer(this.lastUploadedImageId))
            .pipe(map(success => {
              if (success) {
                this.clearState();
                return true;
              }
              return false;
            }));

        default:
          console.error('Invalid image type persisted internally: %s', this.lastUploadedImageType);
          break;
      }

    } else {
      return of(false);
    }
  }

  /**
   * Returns the URL at which the image with the given imageId and type can be retrieved.
   * This URL can be used, e.g., as the `src` of an `<img>`.
   *
   * The image type determines the service that is called to get this information.
   *
   * @param imageId Id of the image.
   * @param imageType Type of the image (product image, product page image, corporate identity logo).
   */
  public getImageUrlFromImageId(imageId: string, imageType: ImageType): string {
    switch (imageType) {
      case ImageType.ProductImage:
        return this.productService.getProductImageUrl(imageId);

      case ImageType.ProductPageImage:
        return this.productService.getProductPageImageUrl(imageId);

      case ImageType.CorporateIdentityLogo:
        return this.brandService.getLogoImageUrl(imageId);

      case ImageType.ResourceImage:
        return this.resourceService.getResourceImageUrl(imageId);

      case ImageType.SimpiThumbnail:
        return this.simpiService.getThumbnailUrl(imageId);

      case ImageType.StepMedia:
        return this.stepService.getStepImageUrl(imageId);

      default:
        console.error('Invalid image type passed to upload image method: %s', imageType);
        break;
    }
  }

  private persistState(uploadedImageId: string, imageType: ImageType): void {
    this.lastUploadedImageId = uploadedImageId;
    this.lastUploadedImageType = imageType;
  }

  public clearState(): void {
    this.persistState(undefined, undefined);
  }
}
