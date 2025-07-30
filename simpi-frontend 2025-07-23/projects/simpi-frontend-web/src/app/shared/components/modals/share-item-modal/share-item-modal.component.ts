import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'sim-share-item-modal',
  templateUrl: 'share-item-modal.component.html',
  styleUrls: ['share-item-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ShareItemModalComponent {
  public copySucceededRecently: boolean = false;

  @Input()
  public modalTitle: string = 'Share Simpi';

  @Input()
  public sharedUrl: string;

  constructor(public activeModal: NgbActiveModal, private clipboard: Clipboard) {
  }

  public copyLink(): void {
    if (this.clipboard.copy(this.sharedUrl)) {
      this.copySucceededRecently = true;
      window.setTimeout(() => this.copySucceededRecently = false, 3000);
    }
  }
}
