import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {Platform} from '@angular/cdk/platform';
import {delay, takeWhile} from 'rxjs/operators';
import {
  ChangeOrderRequest,
  ProductResponse,
  SimpiResponse,
} from '../../../../../../simpi-frontend-common/src/lib/models';
import {WebplayerComponent} from '../../../webPlayer/components/webplayer/webplayer.component';
import {EMPTY_GUID} from '../../../../../../simpi-frontend-common/src/lib/shared/constants';
import {ContextMenuEntry} from '../../../shared/components/context-menu/model/context-menu-entry';
import {FormControl, Validators} from '@angular/forms';
import {DragulaService} from 'ng2-dragula';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PrivacyModalComponent} from '../../../shared/components/modals/privacy-modal/privacy-modal.component';
import {SimpiService} from 'projects/simpi-frontend-common/src/lib/services/simpis/simpi.service';
import {ContainScaleStrategy} from 'projects/simpi-frontend-common/src/step-editor/components/containScaleStrategy';
import {SimpiGroup} from '../../../../../../simpi-frontend-common/src/lib/models/simpi-group';

@Component({
  selector: 'sim-product-details',
  templateUrl: 'product-details.component.html',
  styleUrls: ['product-details.component.scss'],
})
export class ProductDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private overlay: Overlay,
    private platform: Platform,
    private dragulaService: DragulaService,
    private modalService: NgbModal,
    private simpiService: SimpiService
  ) {}
  private _componentRef: ComponentRef<WebplayerComponent>;
  private _overlayRef: OverlayRef;
  private _componentActive: boolean = true;
  private _overlayShown: boolean = false;
  public editProductName: boolean = false;
  public componentPortal: ComponentPortal<WebplayerComponent>;
  public contextMenuEntries: ContextMenuEntry<SimpiResponse>[] = [
    {
      text: 'Edit steps',
      clickHandler: (simpiStats) =>
        this.editSimpiSteps.emit({
          simpiAlias: simpiStats.alias,
          productAlias: this.product.productAlias,
          brandAlias: this.product.brandAlias,
        }),
      iconUrl: 'assets/svg/edit.svg',
    },
    {
      text: 'Create QR code',
      clickHandler: (simpiStats) => this.shareQRSimpi.emit(simpiStats),
      iconUrl: 'assets/svg/scaner-barcode.svg',
    },
    {
      text: 'Share SIMPI',
      clickHandler: (simpiStats) => this.shareSimpi.emit(simpiStats),
      iconUrl: 'assets/svg/share.svg',
    },
    {
      text: 'Clone SIMPI',
      clickHandler: (simpiStats) => this.cloneSimpi.emit(simpiStats),
      iconUrl: 'assets/svg/clone.svg',
    },
    {
      text: 'Settings',
      clickHandler: (simpiStats) => {
        this.changeSimpiSettings.emit({
          simpiAlias: simpiStats.alias,
          productAlias: this.product.productAlias,
          brandAlias: this.product.brandAlias,
        });
      },
      iconUrl: 'assets/svg/edit.svg',
    },
    {
      text: 'Delete',
      clickHandler: (simpiStats) => this.deleteSimpi.emit(simpiStats),
      iconUrl: 'assets/svg/delete.svg',
    },
  ];
  public deletedSimpiContextMenuEntries: ContextMenuEntry<SimpiResponse>[] = [
    {
      text: 'Restore',
      clickHandler: (simpiStats) => this.restoreSimpi.emit(simpiStats),
      iconUrl: 'assets/svg/restore.svg',
    },
  ];
  public productNameFormControl: FormControl;
  public dragStartDelay: number = 500;
  public draggableId: string = EMPTY_GUID;
  private _timer: any;
  private _selectedSimpiId: string;
  public draggableGroupName = 'SIMPIS';

  @Input()
  public product: ProductResponse;

  @Input()
  public simpis: SimpiResponse[];

  @Input()
  public simpiGroups: SimpiGroup[];

  @Input()
  public readonly: boolean = true;

  @Input()
  public isLoaded: boolean = false;

  @Output()
  public shareProduct: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public editSimpiSteps: EventEmitter<any> = new EventEmitter<any>();

  @Output() shareQRSimpi = new EventEmitter<any>();

  @Output()
  public shareSimpi: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public cloneSimpi: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public changeSimpiSettings: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public deleteSimpi: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public restoreSimpi: EventEmitter<SimpiResponse> =
    new EventEmitter<SimpiResponse>();

  @Output()
  public changeProductPageImage: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public changeProductName: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public changeProductSettings: EventEmitter<string> =
    new EventEmitter<string>();

  @Output()
  public onAddSimpi: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public changeOrder: EventEmitter<ChangeOrderRequest[]> = new EventEmitter<
    ChangeOrderRequest[]
  >();

  @ViewChild('productNameInput') productNameInput: ElementRef<HTMLInputElement>;
  public deploymentIconClickHandler = (simpi) =>
    simpi.deleted
      ? this.restoreSimpi.emit(simpi)
      : this.showPrivacyModal(simpi)

  public stepsLabelClickHandler = (simpi) =>
    this.editSimpiSteps.emit({
      simpiAlias: simpi.alias,
      productAlias: this.product.productAlias,
      brandAlias: this.product.brandAlias,
    })

  public ngOnInit(): void {
    this.editProductName = false;
    this.dragulaService.createGroup(this.draggableGroupName, {
      copy: false,
      delay: this.dragStartDelay,
    });
    this.dragulaService
      .dropModel(this.draggableGroupName)
      .pipe(
        delay(100),
        takeWhile(() => this._componentActive)
      )
      .subscribe(() => {
        const idsAndIndexes: ChangeOrderRequest[] = this.simpiGroupsToChangeOrderRequestArray(this.simpiGroups);
        this.changeOrder.emit(idsAndIndexes);
      });
  }

  public trackBy(index, simpi): void {
    return simpi.simpiId;
  }

  public ngAfterViewInit(): void {
    this.componentPortal = new ComponentPortal(WebplayerComponent);
  }

  public mousedown(simpiId: string): void {
    this.draggableId = EMPTY_GUID;
    this._selectedSimpiId = simpiId;
    const isMobile = this.platform.ANDROID || this.platform.IOS;
    if (isMobile) {
      event.preventDefault();
    }
    this._timer = setTimeout(() => {
      this.draggableId = simpiId;
    }, this.dragStartDelay);
  }

  public mouseup(e: MouseEvent | PointerEvent | TouchEvent): void {
    const target = e.target as HTMLElement;
    if (target.classList.contains('dropdown-toggle')) {
      return;
    }
    clearTimeout(this._timer);
    if (this.draggableId === EMPTY_GUID) {
      this.selectSimpi(this._selectedSimpiId);
    }
  }

  public selectSimpi(simpiId: string): void {
    this._overlayShown = true;
    const isMobile = this.platform.ANDROID || this.platform.IOS;
    const positionStrategy = this.overlay
      .position()
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
      disposeOnNavigation: true,
    });

    if (!this._overlayRef) {
      this._overlayRef = this.overlay.create(configs);
    }

    if (!this.componentPortal.isAttached) {
      this._componentRef = this.componentPortal.attach(this._overlayRef);
      this.subscribeToClose();
      this.subscribeToBackdrop();
      this.subscribeToShare();
    }

    this._componentRef.instance.simpiId = simpiId;
    this._componentRef.instance.scaleStrategy = new ContainScaleStrategy();
  }

  private showPrivacyModal(simpi: SimpiResponse) {
    const modalRef = this.modalService.open(PrivacyModalComponent);
    modalRef.componentInstance.targetType = 'Simpi';
    modalRef.componentInstance.targetName = simpi.title;
    modalRef.componentInstance.selection = simpi.deploymentInfo.deploymentState;
    modalRef.result.then((deploymentState) => {
      this.simpiService
        .changeSimpiDeploymentInfo(simpi.simpiId, deploymentState)
        .pipe(takeWhile(() => this._componentActive))
        .subscribe();
    });
  }

  private subscribeToClose(): void {
    this._componentRef.instance.close
      .pipe(takeWhile(() => this._overlayShown))
      .subscribe(() => {
        this.closePlayer();
      });
  }

  private subscribeToShare(): void {
    this._componentRef.instance.share
      .pipe(takeWhile(() => this._overlayShown))
      .subscribe(() => {
        this.shareProduct.emit();
      });
  }

  private subscribeToBackdrop(): void {
    this._overlayRef
      .backdropClick()
      .pipe(takeWhile(() => this._overlayShown))
      .subscribe(() => {
        this.closePlayer();
      });
  }

  public ngOnDestroy(): void {
    if (this._componentRef) {
      this._componentRef.destroy();
    }
    this._componentActive = false;
    this.dragulaService.destroy(this.draggableGroupName);
  }

  private closePlayer(): void {
    this._overlayShown = false;
    if (this.componentPortal.isAttached) {
      this.componentPortal.detach();
    }
    this._componentRef.onDestroy(null);
    this._componentRef.destroy();
    this._overlayRef = undefined;
  }

  public addSimpi(): void {
    this.onAddSimpi.emit();
  }

  public changeProductPageImageClicked(): void {
    this.changeProductPageImage.emit();
  }

  public onProductNameClick(): void {
    if (!this.readonly) {
      this.productNameFormControl = new FormControl(
        this.product?.productName ?? '',
        Validators.required
      );
      this.editProductName = true;
      window.setTimeout(() => {
        this.productNameInput?.nativeElement?.focus();
      }, 0);
    }
  }

  public updateProductName(): void {
    if (!this.readonly) {
      if (this.productNameFormControl.valid) {
        this.editProductName = false;
        this.changeProductName.emit(this.productNameFormControl.value);
      }
    }
  }

  public onChangeProductSettingsClick(): void {
    if (!this.readonly && this.product) {
      this.changeProductSettings.emit(this.product.productId);
    }
  }

  private simpiGroupsToChangeOrderRequestArray(simpiGroups: SimpiGroup[]): ChangeOrderRequest[] {
    return simpiGroups.reduce((a: SimpiResponse[], val) => a.concat(val.simpis), [])
      .map((simpiResponse, index) => {
        return {objectId: simpiResponse.simpiId, positionIndex: index};
      });
  }
}
