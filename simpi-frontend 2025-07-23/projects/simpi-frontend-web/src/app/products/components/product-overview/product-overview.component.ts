import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import {
  ProductResponse,
  CreateProductRequest,
} from "../../../../../../simpi-frontend-common/src/lib/models";
import { environment } from "../../../../environments/environment";
import { takeWhile } from "rxjs/operators";
import { ShareItemModalComponent } from "../../../shared/components/modals/share-item-modal/share-item-modal.component";
import { ProductService } from "projects/simpi-frontend-common/src/lib/services";
import { ContextMenuEntry } from "../../../shared/components/context-menu/model/context-menu-entry";
import { PrivacyModalComponent } from "../../../shared/components/modals/privacy-modal/privacy-modal.component";

@Component({
  selector: "sim-product-overview",
  templateUrl: "./product-overview.component.html",
  styleUrls: ["./product-overview.component.scss"],
})
export class ProductOverviewComponent implements OnInit, OnDestroy {
  public closeResult: string;
  public draggingRow: boolean = false;
  public config: PerfectScrollbarConfigInterface = {};
  public addingAborted: boolean = false;
  private _componentActive: boolean = true;
  @Input()
  public addModeEnabled: boolean;

  @Input()
  public addProductRequested: boolean;

  @Input()
  public products: ProductResponse[];

  @Input()
  public productForm: FormGroup;

  @Input()
  public errorLoadingData: boolean;

  @Input()
  public productImageUrl: string;

  @Input()
  public productPageImageUrl: string;

  @Output()
  public addProduct: EventEmitter<CreateProductRequest> =
    new EventEmitter<CreateProductRequest>();

  @Output()
  public selectProduct: EventEmitter<ProductResponse> =
    new EventEmitter<ProductResponse>();

  @Output()
  public enableOrDisableAddMode: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Output()
  public unselectProduct: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onShowSimpis: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public saveProduct: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public reloadData: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public deleteProduct: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public showProductSettings: EventEmitter<any> = new EventEmitter<any>();

  public contextMenuEntries: ContextMenuEntry<ProductResponse>[] = [
    {
      text: "Settings",
      clickHandler: (product) => {
        this.showProductSettings.emit({
          productAlias: product.productAlias,
          brandAlias: product.brandAlias,
        });
      },
      iconUrl: "assets/svg/edit.svg",
    },
    {
      text: "Share Product",
      clickHandler: (product) => this.onShareProduct(product.productId),
      iconUrl: "assets/svg/share.svg",
    },
    {
      text: "Delete",
      clickHandler: (product) => this.deleteProduct.emit(product.productId),
      iconUrl: "assets/svg/delete.svg",
    },
  ];

  public deploymentIconClickHandler = (product) =>
    this.showPrivacyModalDialog(product);

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  public ngOnInit(): void {
    this.productService.addProductRequested$
      .pipe(takeWhile(() => this._componentActive))
      .subscribe((requested) => {
        if (requested) {
          this.addProduct.emit();
        }
      });
  }
  public showProductDetails(product: ProductResponse): void {
    this.selectProduct.emit(product);
  }

  public enableAddMode(): void {
    this.addingAborted = false;
    if (!this.addModeEnabled) {
      this.enableOrDisableAddMode.emit(true);
    }
  }

  public disableAddMode(): void {
    this.addingAborted = true;
    if (this.addModeEnabled) {
      this.enableOrDisableAddMode.emit(false);
    }
  }

  public onShareProduct(productId: string): void {
    const modalRef = this.modalService.open(ShareItemModalComponent);
    modalRef.componentInstance.modalTitle = "Share Product";
    this.productService.products$.subscribe((products) => {
      if (products) {
        const product = products.find((x) => x.productId === productId);
        modalRef.componentInstance.sharedUrl = `${environment.baseUrl}/${product.brandAlias}/product/${product.productAlias}/overview`;
      }
    });
  }

  public showSimpis(productId: string): void {
    this.onShowSimpis.emit(productId);
  }

  private showPrivacyModalDialog(product: ProductResponse) {
    this.selectProduct.emit(product);
    const modalRef = this.modalService.open(PrivacyModalComponent);
    modalRef.componentInstance.form = this.productForm;
    modalRef.componentInstance.targetType = "Product";
    modalRef.componentInstance.targetName = product.productName;
    modalRef.result
      .then(() => {
        this.saveProduct.emit();
      })
      .catch((e) => {
        this.unselectProduct.emit(product);
      });
  }

  public ngOnDestroy(): void {
    this._componentActive = false;
  }
}
