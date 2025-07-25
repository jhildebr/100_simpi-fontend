import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { EMPTY, Observable } from "rxjs";
import {
  catchError,
  map,
  pluck,
  shareReplay,
  startWith,
  switchMap,
  takeWhile,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { ProductService } from "../../../../../../simpi-frontend-common/src/lib/services";
import {
  CreateProductRequest,
  DeploymentStateResponse,
  ProductChangeRequest,
  ProductResponse,
} from "../../../../../../simpi-frontend-common/src/lib/models";
import { AuthService } from "../../../../../../simpi-frontend-common/src/lib/services/auth/auth.service";
import { BrandService } from "../../../../../../simpi-frontend-common/src/lib/services/brand/brand.service";
import { SimpiService } from "projects/simpi-frontend-common/src/lib/services/simpis/simpi.service";
import { DropdownMenuHelperService } from "../../../shared/services/dropdown-menu-helper.service";

@Component({
  selector: "sim-product-overview-page",
  template: `
    <sim-product-overview
      [products]="products$ | async"
      [productForm]="productForm"
      (addProduct)="onAddProduct()"
      [addModeEnabled]="addModeEnabled"
      [errorLoadingData]="errorLoadingData"
      (enableOrDisableAddMode)="onEnableOrDisableAddMode($event)"
      (onShowSimpis)="onShowSimpis($event)"
      (selectProduct)="onSelectProduct($event)"
      [productImageUrl]="productImageUrl$ | async"
      [productPageImageUrl]="productPageImageUrl$ | async"
      (unselectProduct)="onUnselectProduct()"
      (saveProduct)="onSaveProduct()"
      (deleteProduct)="onDeleteProduct($event)"
      (reloadData)="onReloadData()"
      (showProductSettings)="showProductSettings($event)"
    >
    </sim-product-overview>
  `,
})
export class ProductOverviewPageComponent implements OnInit, OnDestroy {
  private _componentActive: boolean = true;
  private _savedProduct: boolean = false;
  private _brandId: string;
  private _brandName: string;
  private _brandAlias: string;
  private _userId: string;

  public products$: Observable<ProductResponse[]>;
  public selectedProduct$: Observable<ProductResponse>;
  public productForm: UntypedFormGroup;
  public addModeEnabled: boolean = false;
  public productImageUrl$: Observable<string>;
  public productPageImageUrl$: Observable<string>;
  public errorLoadingData: boolean = false;
  public labelLeft: string = "DRAFT";
  public labelRight: string = "PUBLISHED";

  constructor(
    private fb: UntypedFormBuilder,
    private productService: ProductService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private brandService: BrandService,
    private simpiService: SimpiService,
    private dropdownMenuHelperService: DropdownMenuHelperService
  ) {}

  public ngOnInit(): void {
    this.buildProductForm();
    this.products$ = this.authService.userInfo$.pipe(
      pluck("id"),
      tap((id) => {
        this._userId = id;
        this.productForm.patchValue({ creatorId: this._userId });
      }),
      withLatestFrom(this.route.root.firstChild.params),
      switchMap(([_, params]) => {
        this._brandAlias = params.brandAlias;
        if (this._brandAlias) {
          this.productForm.patchValue({ brandAlias: this._brandAlias });
          return this.brandService.getBrandByAlias(this._brandAlias).pipe(
            map((brandResponse) => {
              if (brandResponse) {
                this._brandId = brandResponse.brandId;
                this.productForm.patchValue({ brandId: this._brandId });
                this.loadData();
              }
            })
          );
        }
      }),
      switchMap(() => {
        return this.productService.products$.pipe(
          startWith(null),
          map((products) => {
            if (products) {
              if (products.length) {
                return products
                  .filter((x) => !x.deleted)
                  .sort((a, b) =>
                    (a.productName ?? "").localeCompare(b.productName)
                  );
              }
              return [];
            }
          })
        );
      })
    );

    this.selectedProduct$ = this.productService.selectedProduct$;

    this.productImageUrl$ = this.productService.tempProductImageUrl$.pipe(
      shareReplay()
    );

    this.productPageImageUrl$ =
      this.productService.tempProductPageImageUrl$.pipe(shareReplay());

    this.cdr.detectChanges();
  }

  public onReloadData(): void {
    this.loadData();
  }

  private loadData(): void {
    this.errorLoadingData = false;
    this.productService
      .getProducts(this._brandId, true, true)
      .pipe(
        shareReplay(),
        catchError(() => {
          this.errorLoadingData = true;
          return EMPTY;
        }),
        takeWhile(() => this._componentActive)
      )
      .subscribe();

    this.brandService
      .getBrandById(this._brandId)
      .pipe(takeWhile(() => this._componentActive))
      .subscribe((brandResponse) => {
        this._brandName = brandResponse.brandName;
      });
  }

  public onSaveProduct(): void {
    this._savedProduct = false;
    const productToUpdate: ProductChangeRequest = {
      deploymentState: this.productForm.get("deploymentState").value,
      productImageId: this.productForm.get("productImageId").value,
      productPageImageId: this.productForm.get("productPageImageId").value,
      productName: this.productForm.get("productName").value,
    };

    this.productService
      .saveProduct(this.productForm.get("productId").value, productToUpdate)
      .pipe(
        tap((r) => {
          if (r.status === 204) {
            this._savedProduct = true;
          }
        }),
        takeWhile(() => this._componentActive)
      )
      .subscribe();
  }

  public onDeleteProduct(id: string): void {
    this.dropdownMenuHelperService.onDeleteProduct(id);
  }

  public onUnselectProduct(): void {
    this.buildProductForm();
  }

  private buildProductForm(): void {
    this.productForm = this.fb.group({
      brandId: [this._brandId, Validators.required],
      brandAlias: [this._brandAlias, Validators.required],
      brandName: [
        { value: this._brandName, disabled: false },
        Validators.required,
      ],
      productName: [null, Validators.required],
      creatorId: [this._userId, Validators.required],
      deploymentState: [DeploymentStateResponse.Private],
      productImageId: [null],
      productPageImageId: [null],
      lastUpdated: [null],
      creationDate: [null],
      productId: [null],
    });

    this.cdr.detectChanges();
  }

  public onAddProduct(): void {
    let productToAdd: CreateProductRequest = {
      productId: null,
      brandId: this.productForm.get("brandId").value,
      brandAlias: this.productForm.get("brandAlias").value,
      creatorId: this.productForm.get("creatorId").value,
      productName: this.productForm.get("productName").value,
      brandName: this.productForm.get("brandName").value,
      deploymentState: this.productForm.get("deploymentState").value,
      productImageId: this.productForm.get("productImageId").value,
      productPageImageId: this.productForm.get("productPageImageId").value,
    };

    this.productService
      .addProduct(productToAdd)
      .pipe(
        tap((result) => {
          if (result) {
            this.navigateToProductSettings(result.alias);
          }
        }),
        shareReplay(),
        takeWhile(() => this._componentActive)
      )
      .subscribe();
  }

  public onShowSimpis(productId: string): void {
    this.productService.setSelectedProduct(<ProductResponse>{
      productId: productId,
    });
    this.simpiService.setSelectedSimpi(null);

    this.products$ = this.products$.pipe(
      tap((products) => {
        if (products) {
          const product = products.find((x) => x.productId === productId);
          if (product) {
            if (product.simpiCount > 0) {
              this.router.navigate([`${product.productAlias}`], {
                relativeTo: this.route,
              });
            } else {
              this.router.navigate(
                [
                  `${product.productAlias}/simpis/new-simpi/steps`,
                  { assistant: true },
                ],
                { relativeTo: this.route }
              );
            }
          }
        }
      })
    );
  }

  public onEnableOrDisableAddMode(enabled: boolean): void {
    if (enabled) {
      this.productService.setSelectedProduct(null);
      this.buildProductForm();
      this.addModeEnabled = true;
      this.productService.setTempProductImageUrl("");
      this.productService.setTempProductPageImageUrl("");
    }
    if (!enabled) {
      this.addModeEnabled = false;
      this.productService.setTempProductImageUrl("");
      this.productService.setTempProductPageImageUrl("");
      this.productService.removeProductImage(
        this.productForm.get("productImageId").value
      );
      this.productService.removeProductPageImage(
        this.productForm.get("productPageImageId").value
      );
    }
  }

  public onSelectProduct(product: ProductResponse): void {
    this.addModeEnabled = false;
    this.productService.setSelectedProduct(product);
    this.populateProductForm(product);
  }

  private populateProductForm(product: ProductResponse): void {
    this.productForm.patchValue({
      productId: product.productId,
      brandId: product.brandId,
      brandAlias: product.brandAlias,
      brandName: product.brandName,
      productName: product.productName,
      creatorId: product.creatorId,
      deploymentState: product.deploymentState,
      productImageId: product.productImageId,
      productPageImageId: product.productPageImageId,
      creationDate: product.creationDate,
      lastUpdated: product.lastUpdated,
    });
  }

  public showProductSettings(paramsJson: any): void {
    this.dropdownMenuHelperService.showProductSettings(paramsJson);
  }

  public ngOnDestroy(): void {
    this._componentActive = false;
  }

  public navigateToProductSettings(productAlias: string) {
    this.dropdownMenuHelperService.navigateToProductSettings(
      productAlias,
      this.route
    );
  }
}
