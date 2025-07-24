import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductResponse } from 'projects/simpi-frontend-common/src/public-api';

@Component({
  selector: 'sim-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input()
  public products: ProductResponse[];

  public get sortedProducts(): ProductResponse[] {
    if (!this.products) {
      return [];
    }
    return [...this.products].sort((a, b) => {
      const nameA = a.productName?.toLowerCase() || '';
      const nameB = b.productName?.toLowerCase() || '';
      return nameA.localeCompare(nameB);
    });
  }

  @Output()
  public onSelectProduct: EventEmitter<string> = new EventEmitter<string>();

  public selectedProductId: string = "";

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  selectProduct(productId: string): void {
    this.selectedProductId = productId;
  }

  onConfirmSelection(): void {
    this.onSelectProduct.emit(this.selectedProductId);
  }

}
