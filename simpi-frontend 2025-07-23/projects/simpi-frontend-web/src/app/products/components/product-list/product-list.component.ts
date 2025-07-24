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

  @Output()
  public onSelectProduct: EventEmitter<string> = new EventEmitter<string>();

  public selectedProductId: string = "";

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onConfirmSelection(): void {
    this.onSelectProduct.emit(this.selectedProductId);
  }

}
