import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewChildren,
  QueryList,
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
import {UntypedFormControl, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, CdkDrag} from '@angular/cdk/drag-drop';
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
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  constructor(
    private overlay: Overlay,
    private platform: Platform,
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
  public productNameFormControl: UntypedFormControl;
  public dragStartDelay: number = 500;
  public draggableId: string = EMPTY_GUID;
  private _timer: any;
  private _selectedSimpiId: string;
  public draggableGroupName = 'SIMPIS';
  
  // Enhanced drag & drop functionality
  @ViewChildren(CdkDrag) draggableItems?: QueryList<CdkDrag>;
  public allSimpis: SimpiResponse[] = [];
  public visibleGroups: SimpiGroup[] = [];

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
    this.updateSimpiGroups();
  }

  public ngOnChanges(): void {
    this.updateSimpiGroups();
  }

  public onSimpiDrop(event: CdkDragDrop<SimpiResponse[]>): void {
    const draggedSimpi = event.item.data as SimpiResponse;
    
    if (event.previousContainer === event.container) {
      // Same group - use precise positioning logic from reference implementation
      console.log(`CDK Drag event: previousIndex=${event.previousIndex}, currentIndex=${event.currentIndex}`);

      // Find the actual previous index in the data array
      const actualPreviousIndex = event.container.data.findIndex(simpi => simpi.simpiId === draggedSimpi.simpiId);
      if (actualPreviousIndex === -1) {
        console.error("Could not find dragged item in the data array!");
        return;
      }
      console.log(`Actual Previous Index: ${actualPreviousIndex}`);

      // Calculate target index using the reference implementation's approach
      const pointerX = event.dropPoint.x;
      const pointerY = event.dropPoint.y;
      const siblings = this.draggableItems?.toArray() || [];
      let targetIndex = siblings.length; // Default to end if not dropped before anything

      for (let i = 0; i < siblings.length; i++) {
        const sibling = siblings[i];
        // Don't compare with the item being dragged itself
        if (sibling.data === draggedSimpi) {
          continue;
        }

        const rect = (sibling.element.nativeElement as HTMLElement).getBoundingClientRect();
        const midX = rect.left + rect.width / 2;
        
        // Check if pointer is within the vertical bounds of the item and before its horizontal midpoint
        if (pointerY >= rect.top && pointerY <= rect.bottom && pointerX < midX) {
          const siblingIndexInData = event.container.data.indexOf(sibling.data as SimpiResponse);
          if (siblingIndexInData !== -1) { // Make sure sibling exists in data
            targetIndex = siblingIndexInData;
            break; // Found the item we are dropping before
          }
        }
      }

      console.log(`Target Index: ${targetIndex}`);

      // Only move if the target index is different from the actual previous index
      if (actualPreviousIndex !== targetIndex) {
        moveItemInArray(event.container.data, actualPreviousIndex, targetIndex);
        console.log(`Item moved from index ${actualPreviousIndex} to ${targetIndex}`);
      }
    } else {
      // Cross-group transfer
      const sourceGroupName = event.previousContainer.id;
      const targetGroupName = event.container.id;
      
      console.log(`Cross-group transfer: ${sourceGroupName} -> ${targetGroupName}`);
      
      // Remove from source group
      const sourceGroup = this.simpiGroups.find(g => g.groupName === sourceGroupName);
      if (sourceGroup) {
        const sourceIndex = sourceGroup.simpis.findIndex(s => s.simpiId === draggedSimpi.simpiId);
        if (sourceIndex >= 0) {
          sourceGroup.simpis.splice(sourceIndex, 1);
        }
      }
      
      // Add to target group at the end
      const targetGroup = this.simpiGroups.find(g => g.groupName === targetGroupName);
      if (targetGroup) {
        targetGroup.simpis.push(draggedSimpi);
        
        // Update the SIMPI's group name
        draggedSimpi.groupName = targetGroupName;
        this.simpiService.changeSimpiGroupName(draggedSimpi.simpiId, targetGroupName).subscribe();
      }
    }
    
    // Update position indices and emit order changes
    this.updatePositionIndices();
    setTimeout(() => {
      const idsAndIndexes: ChangeOrderRequest[] = this.simpiGroupsToChangeOrderRequestArray(this.simpiGroups);
      this.changeOrder.emit(idsAndIndexes);
    }, 100);
  }

  private updatePositionIndices(): void {
    // Update position indices for all groups
    this.simpiGroups.forEach(group => {
      group.simpis.forEach((simpi, index) => {
        simpi.positionIndex = index;
      });
    });
  }

  public trackBy(index, simpi): void {
    return simpi.simpiId;
  }


  public updateSimpiGroups(): void {
    if (!this.simpis) return;
    
    // Store all SIMPIs for easy access
    this.allSimpis = [...this.simpis];
    
    // Group SIMPIs by groupName
    const grouped = this.allSimpis.reduce((groups, simpi) => {
      const groupName = simpi.groupName || 'Default';
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(simpi);
      return groups;
    }, {} as { [key: string]: SimpiResponse[] });
    
    // Convert to SimpiGroup array and sort SIMPIs within each group
    this.visibleGroups = Object.keys(grouped).map(groupName => ({
      groupName,
      simpis: grouped[groupName].sort((a, b) => a.positionIndex - b.positionIndex)
    }));
  }

  public ngAfterViewInit(): void {
    this.componentPortal = new ComponentPortal(WebplayerComponent);
  }

  private _isDragging: boolean = false;

  public onDragStarted(): void {
    this._isDragging = true;
    clearTimeout(this._timer);
  }

  public onDragEnded(): void {
    this._isDragging = false;
  }

  public onSimpiClick(simpiId: string, event: Event): void {
    // Only open player if we're not in a drag operation
    if (!this._isDragging) {
      event.preventDefault();
      event.stopPropagation();
      this.selectSimpi(simpiId);
    }
  }

  public mousedown(simpiId: string): void {
    this.draggableId = EMPTY_GUID;
    this._selectedSimpiId = simpiId;
    this._isDragging = false;
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
    // Only open player if not dragging and no drag operation occurred
    if (this.draggableId === EMPTY_GUID && !this._isDragging) {
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
      this.subscribeToSelectSimpi();
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

  private subscribeToSelectSimpi(): void {
    this._componentRef.instance.selectSimpi
      .pipe(takeWhile(() => this._overlayShown))
      .subscribe((simpiId: string) => {
        // Use setTimeout to allow current execution to complete before destroying the component
        setTimeout(() => {
          // Check if overlay is still shown and component still exists before proceeding
          if (this._overlayShown && this._componentRef && this.componentPortal.isAttached) {
            this.closePlayer();
            this.selectSimpi(simpiId);
          }
        }, 0);
      });
  }

  public ngOnDestroy(): void {
    if (this._componentRef) {
      this._componentRef.destroy();
    }
    this._componentActive = false;
  }

  private closePlayer(): void {
    this._overlayShown = false;
    if (this.componentPortal.isAttached) {
      // detach() handles component destruction automatically
      this.componentPortal.detach();
    } else if (this._componentRef) {
      // Only manually destroy if portal didn't handle it
      this._componentRef.onDestroy(null);
      this._componentRef.destroy();
    }
    this._componentRef = null;
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
      this.productNameFormControl = new UntypedFormControl(
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
