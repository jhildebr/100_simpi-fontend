import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'sim-data-protection',
    templateUrl: 'dataProtection.component.html',
    styleUrls: ['dataProtection.component.scss']
})

export class DataProtection {

  @Output()
  public onClose: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  public close(): void {
    this.onClose.emit();
  }
}
