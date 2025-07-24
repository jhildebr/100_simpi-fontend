import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { ProductService } from '../../../../../../simpi-frontend-common/src/lib/services';
import {
  ChangeOrderRequest,
  ProductResponse,
  SimpiResponse,
} from '../../../../../../simpi-frontend-common/src/lib/models';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import { catchError, filter, map, pluck, takeWhile, tap } from 'rxjs/operators';
import { ShareService } from '../../../shared/services/share.service';
import { AuthService } from '../../../../../../simpi-frontend-common/src/lib/services/auth/auth.service';
import { UploadImgModalComponent } from '../../../shared/components/upload-img-modal/upload-img-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ImageType,
  UploadImgModalService,
} from '../../../../../../simpi-frontend-common/src/lib/services/images/upload-img-modal.service';
import { Location } from '@angular/common';

import { DropdownMenuHelperService } from '../../../shared/services/dropdown-menu-helper.service';
import {SimpiGroup} from '../../../../../../simpi-frontend-common/src/lib/models/simpi-group';

@Component({
  template: `
    <sim-product-details
      [product]="product$ | async"
      [simpiGroups]="simpiGroups$ | async"
      [readonly]="false"
      [isLoaded]="isLoaded"
      (shareProduct)="shareProduct()"
      (changeProductPageImage)="openProductPageImgModal()"
      (changeProductName)="changeProductName($event)"
      (changeProductSettings)="changeProductSettings($event)"
      (editSimpiSteps)="navigateToSimpiStepEditor($event)"
      (deleteSimpi)="deleteSimpi($event)"
      (restoreSimpi)="restoreSimpi($event)"
      (shareSimpi)="shareSimpi($event)"
      (shareQRSimpi)="shareQRSimpi($event)"
      (cloneSimpi)="cloneSimpi($event)"
      (changeSimpiSettings)="changeSimpiSettings($event)"
      (onAddSimpi)="navigateToSimpiAssistant()"
      (changeOrder)="onChangeOrder($event)"
    >
    </sim-product-details>
  `,
  styles: [``],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  private componentActive: boolean = false;

  private product: ProductResponse;
  private userId: string;

  public product$: Observable<ProductResponse>;
  public simpis$: Observable<SimpiResponse[]>;
  public simpiGroups$: Observable<SimpiGroup[]>;
  public isLoaded: boolean;

  constructor(
    private dropdownMenuHelperService: DropdownMenuHelperService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private simpiService: SimpiService,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router,
    private uploadImgModalService: UploadImgModalService,
    private location: Location,
  ) {}

  public ngOnInit(): void {
    this.componentActive = true;
    this.authService.userInfo$.pipe(
      takeWhile(() => this.componentActive),
      pluck('id'),
      tap((id) => {
        this.userId = id;
      })
    );

    this.getRoutingParamsObservable()
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(({ brandAlias, productAlias }) => {
        if (brandAlias && productAlias) {
          this.product$ = this.productService
            .getProductByAlias(brandAlias, productAlias)
            .pipe(
              tap((prod) => {
                if (prod) {
                  console.log(prod.productAlias);
                  this.product = prod;
                  this.simpis$ = this.simpiService.getSimpisByProductId(
                    prod.productId,
                    false,
                    true
                  );
                  this.simpis$.subscribe((x) => (this.isLoaded = true));
                  this.simpiGroups$ = this.simpis$.pipe(map(x => this.groupSimpis(x)));
                }
              }),
              catchError((err) => {
                if (err?.status === 404) {
                  console.error(err?.error);
                } else {
                  console.error(err);
                }
                return [];
              })
            );
        }
      });
  }

  private groupSimpis(simpis: SimpiResponse[]): SimpiGroup[] {
    const simpiGroups: SimpiGroup[] = [];
    for (const simpi of simpis) {
      if (simpiGroups.some(x => x.groupName === simpi.groupName)) {
        simpiGroups.find(x => x.groupName === simpi.groupName).simpis.push(simpi);
      } else {
        simpiGroups.push({ groupName: simpi.groupName, simpis: [simpi] });
      }
    }
    return simpiGroups.sort(this.sortByGroupName);
  }

  private sortByGroupName = (a: SimpiGroup, b: SimpiGroup) => {
    if (a.groupName === b.groupName) {
      return 0;
    }
    if (this.isNullOrEmpty(a.groupName)) {
      return -1;
    }
    if (this.isNullOrEmpty(b.groupName)) {
      return 1;
    }
    return a.groupName.localeCompare(b.groupName);
  }

  private isNullOrEmpty(str: string): boolean {
    return (str == null || !str || str.length === 0);
  }

  private getRoutingParamsObservable() {
    return combineLatest([
      this.route.root.firstChild.paramMap,
      this.route.paramMap,
    ]).pipe(
      takeWhile(() => this.componentActive),
      map(([rootParamMap, routeParamMap]) => {
        return {
          brandAlias: rootParamMap?.get('brandAlias'),
          productAlias: routeParamMap?.get('productAlias'),
        };
      }),
      filter(({ brandAlias, productAlias }) => !!brandAlias && !!productAlias)
    );
  }

  public ngOnDestroy(): void {
    this.componentActive = false;
  }

  // dropdown-menu-functions implemented through injection of dropdown-menu-service
  public shareProduct(): void {
    console.log(this.product.productAlias);
    this.dropdownMenuHelperService.shareProduct();
  }

  public changeProductSettings(productId: string): void {
    this.dropdownMenuHelperService.changeProductSettings(
      productId,
      this.route
    );
  }
  public navigateToSimpiStepEditor(simpi: SimpiResponse) {
    this.dropdownMenuHelperService.navigateToSimpiStepEditor(simpi);
  }
  public shareSimpi(simpi: SimpiResponse) {
    this.dropdownMenuHelperService.shareSimpi(simpi);
  }
  public shareQRSimpi(simpi: SimpiResponse) {
    this.dropdownMenuHelperService.shareQRSimpi(simpi);
  }
  public changeSimpiSettings(simpi: SimpiResponse) {
    this.dropdownMenuHelperService.changeSimpiSettings(simpi);
  }
  public deleteSimpi(simpi: SimpiResponse): void {
    this.dropdownMenuHelperService.deleteSimpi(simpi);
  }
  public async cloneSimpi(simpi: SimpiResponse): Promise<void> {
    this.dropdownMenuHelperService.cloneSimpi(simpi);
  }

  public openProductPageImgModal(): void {
    const modalRef = this.modalService.open(UploadImgModalComponent);
    modalRef.componentInstance.imageType = ImageType.ProductPageImage;
    modalRef.componentInstance.modalTitle = 'Upload Product Page Image';
    if (this.product) {
      modalRef.componentInstance.productId = this.product.productId;
      modalRef.result.then(
        (result) => {
          if (result !== 'Cancel click') {
            this.productService
              .changeProductPageImage(
                this.product.productId,
                result.uploadedImageId
              )
              .subscribe(() => {
                this.product.productPageImageId = result.uploadedImageId;
                this.product.productPageImageUrl =
                  this.productService.getProductPageImageUrl(
                    result.uploadedImageId
                  );
                this.uploadImgModalService.clearState();
                this.product$ = of(this.product);
              });
          }
        },
        (rejected) => {
          console.log(rejected);
        }
      );
    }
  }

  public restoreSimpi(simpi: SimpiResponse): void {
    if (simpi) {
      this.simpiService
        .restoreSimpi(simpi.simpiId)
        .pipe(takeWhile(() => this.componentActive))
        .subscribe();
    }
  }

  public onChangeOrder(e: ChangeOrderRequest[]): void {
    this.simpiService.changeSimpiOrder(e).subscribe();
  }

  public changeProductName(newProductName: string): void {
    const oldProductName = this.product.productName;

    if (!newProductName || newProductName === oldProductName) {
      return;
    }

    this.product.productName = newProductName + '  (saving...)';

    this.productService
      .renameProduct(this.product.productId, newProductName)
      .subscribe(
        (response) => {
          if (response.ok) {
            this.product.productName = newProductName + '  (saved ✔)';
            this.product.productAlias = response.body.newProductAlias;
            this.location.replaceState(
              `/${this.product.brandAlias}/cockpit/products/${response.body.newProductAlias}`
            );
          } else {
            this.product.productName = newProductName + '  (error ❌)';
            console.warn(
              'Could not rename product:',
              response.status,
              response.statusText
            );
          }
          window.setTimeout(() => {
            if (response.ok) {
              this.product.productName = newProductName;
            } else {
              this.product.productName = oldProductName;
            }
          }, 3000);
        },
        (error) => {
          this.product.productName = newProductName + '  (error ❌)';
          console.warn('Could not rename product:', error?.statusText ?? error);
          window.setTimeout(() => {
            this.product.productName = oldProductName;
          }, 3000);
        }
      );
  }

  public navigateToSimpiAssistant(): void {
    this.router
      .navigate(['simpis/new-simpi/steps'], { relativeTo: this.route })
      .catch(console.error);
  }
}
