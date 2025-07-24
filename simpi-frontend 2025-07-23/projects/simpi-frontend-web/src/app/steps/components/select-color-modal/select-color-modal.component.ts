import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sim-select-color-modal',
  templateUrl: './select-color-modal.component.html',
  styleUrls: ['./select-color-modal.component.scss']
})
export class SelectColorModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  public selectedColor: string = null;

  ngOnInit(): void {
  }

  public closeModal(): void {
      this.activeModal.close('Cancel click');
  }

  public dismissModal(): void {
    this.activeModal.dismiss('Close click');
  }

  public selectColor(color: string): void {
    this.selectedColor = color;
  }

}
