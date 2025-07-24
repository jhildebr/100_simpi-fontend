import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContextMenuEntry } from '../../../shared/components/context-menu/model/context-menu-entry';
import { ProductResponse } from '../../../../../../simpi-frontend-common/src/lib/models';

@Component({
  selector: 'sim-deleted-product-overview',
  templateUrl: './deleted-product-overview.component.html',
})

export class DeletedProductOverviewComponent {
  @Input()
  public products: ProductResponse[];

  @Output()
  public restoreProduct: EventEmitter<ProductResponse> = new EventEmitter<ProductResponse>();

  @Output()
  public onShowSimpis: EventEmitter<string> = new EventEmitter<string>();

  public contextMenuEntries: ContextMenuEntry<ProductResponse>[] = [
    { text: 'Restore', clickHandler: product => this.restoreProduct.emit(product), iconUrl: 'assets/svg/restore.svg' },
  ];

  public showSimpis(productId: string): void {
    this.onShowSimpis.emit(productId);
  }
}
