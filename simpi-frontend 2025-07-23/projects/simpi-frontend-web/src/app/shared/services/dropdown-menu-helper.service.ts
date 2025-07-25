import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "../../../environments/environment";
import { ShareService } from "./share.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ProductResponse,
  SimpiResponse,
} from "../../../../../simpi-frontend-common/src/lib/models";
import { ShareItemModalComponent } from "../components/modals/share-item-modal/share-item-modal.component";
import { SimpiService } from "projects/simpi-frontend-common/src/lib/services/simpis/simpi.service";
import { BrandService } from "projects/simpi-frontend-common/src/lib/services/brand/brand.service";
import { ProductService } from "projects/simpi-frontend-common/src/lib/services";
import { ProductListComponent } from "../../products/components/product-list/product-list.component";
import { takeWhile } from "rxjs/operators";
import { UntypedFormGroup } from "@angular/forms";
import { ProductChangeRequest } from "../../../../../simpi-frontend-common/src/lib/models";

@Injectable({
  providedIn: "root",
})
export class DropdownMenuHelperService {
  private componentActive: boolean = false;
  private _componentActive: boolean = true;
  private _savedProduct: boolean = false;

  public productForm: UntypedFormGroup;
  public product: ProductResponse;

  constructor(
    private modalService: NgbModal,
    private shareService: ShareService,
    private router: Router,
    private route: ActivatedRoute,
    private simpiService: SimpiService,
    private brandService: BrandService,
    private productService: ProductService
  ) {}

  public navigateToSimpiStepEditor(paramsJson: any): void {
    if (paramsJson) {
      const brandAlias = paramsJson.brandAlias;
      const productAlias = paramsJson.productAlias;
      const simpiAlias = paramsJson.simpiAlias;
      this.router
        .navigate([
          `${brandAlias}/cockpit/products/${productAlias}/simpis/${simpiAlias}/steps`,
        ])
        .catch(console.error);
    }
  }

  public shareSimpi(simpi: SimpiResponse): void {
    if (simpi) {
      const text = simpi.title
        ? `Check out this how-to: ${simpi.title}!`
        : undefined;
      const url = `${environment.baseUrl}/player/${simpi.alias}`;

      // if (navigator && "share" in navigator) {
        this.shareService.share(simpi.title, text, url);
      // } else {
      //   const modalRef = this.modalService.open(ShareItemModalComponent);
      //   modalRef.componentInstance.sharedUrl = url;
      // }
    }
  }

  public shareQRSimpi(simpi: SimpiResponse): void {
    if (simpi) {
      const url = `${environment.baseUrl}/player/${simpi.alias}`;
      const modalRef = this.modalService.open(ShareItemModalComponent);
      modalRef.componentInstance.sharedUrl = url;
    }
  }
  public changeSimpiSettings(paramsJson: any): void {
    if (paramsJson) {
      const brandAlias = paramsJson.brandAlias;
      const productAlias = paramsJson.productAlias;
      const simpiAlias = paramsJson.simpiAlias;
      this.router
        .navigate([
          `${brandAlias}/cockpit/products/${productAlias}/simpis/${simpiAlias}/settings`,
        ])
        .catch(console.error);
    }
  }

  public deleteSimpi(simpi: any): void {
    if (simpi) {
      console.log(this.simpiService);
      this.simpiService
        .deleteSimpi(simpi.simpiId)
        .pipe(takeWhile(() => this.componentActive))
        .subscribe();
    }
  }

  public async cloneSimpi(simpi: SimpiResponse): Promise<void> {
    if (!simpi) {
      return;
    }

    const { brandAlias } = this.route.root.firstChild.snapshot.params;
    const brand = await this.brandService
      .getBrandByAlias(brandAlias)
      .toPromise();
    const targets = await this.productService
      .getProducts(brand.brandId, false, true)
      .toPromise();

    const modalRef = this.modalService.open(ProductListComponent, {
      centered: true,
    });
    modalRef.componentInstance.products = targets;
    modalRef.componentInstance.onSelectProduct.subscribe(async (productId) => {
      modalRef.close();
      let startTime = Date.now();
      await this.simpiService
        .cloneSimpi(simpi.simpiId, productId)
        .toPromise()
        .then(() => {
          const secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
          alert(`SIMPI cloned successfully in ${secondsElapsed}s.`);
        })
        .catch((reason) => {
          alert(
            `Error cloning SIMPI: "${reason?.statusText ?? "Unknown error"}" (${
              reason?.error ?? reason
            }).`
          );
        });
    });
  }

  //for ProductOverviewPage (products in overview)
  public changeProductSettings(productId: string, route): void {
    this.router
      .navigate(["settings"], { relativeTo: route })
      .catch(console.error);
  }

  public shareProduct(): void {
    if (this.product) {
      const text = this.product.productName
        ? `Check out this how-to! ${this.product.productName}`
        : undefined;
      const url = `${environment.baseUrl}/${this.product.brandAlias}/product/${this.product.productAlias}/overview`;
      this.shareService.share(this.product.productName, text, url);
    }
  }
  public showProductSettings(paramsJson: any): void {
    const brandAlias = paramsJson.brandAlias;
    const productAlias = paramsJson.productAlias;
    this.router
      .navigate([`${brandAlias}/cockpit/products/${productAlias}/settings`], {
        queryParams: { parent: "overview" },
      })
      .catch(console.error);
  }

  public navigateToProductSettings(productAlias: string, route: any) {
    this.router
      .navigate([productAlias, "settings"], { relativeTo: route })
      .catch(console.error);
  }

  public onDeleteProduct(id: string): void {
    this.productService.setSelectedProduct(null);
    this.productService
      .deleteProduct(id)
      .pipe(takeWhile(() => this._componentActive))
      .subscribe();
  }

  public onSaveProduct(): void {
    this._savedProduct = false;
    const productToUpdate: ProductChangeRequest = {
      deploymentState: this.productForm.get("deploymentState").value,
      productImageId: this.productForm.get("productImageId").value,
      productPageImageId: this.productForm.get("productPageImageId").value,
      productName: this.productForm.get("productName").value,
    };
  }
}
