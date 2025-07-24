import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'sim-info-message-modal',
  templateUrl: 'info-message-modal.component.html',
  styleUrls: ['info-message-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class InfoModalComponent {
  @Input()
  public modalTitle: string = 'Info';

  @Input()
  public infoText: string;

  constructor(public activeModal: NgbActiveModal, private clipboard: Clipboard) {
  }
}
