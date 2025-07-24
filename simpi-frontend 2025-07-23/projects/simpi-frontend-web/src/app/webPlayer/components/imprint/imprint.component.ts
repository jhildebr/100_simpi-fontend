import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'sim-imprint',
    templateUrl: 'imprint.component.html',
    styleUrls: ['imprint.component.scss']
})

export class ImprintComponent {

  @Output()
  public onClose: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  public close(): void {
    this.onClose.emit();
  }
}
