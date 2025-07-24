import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductResponse } from '../../../../../../simpi-frontend-common/src/lib/models';

@Component({
  selector: 'sim-product-overview',
  templateUrl: 'product-overview.component.html',
  styleUrls: ['product-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductOverviewComponent {

  @Input()
  public products: ProductResponse[];

  @Output()
  public navigateToSimpis: EventEmitter<string> = new EventEmitter<string>();
}
