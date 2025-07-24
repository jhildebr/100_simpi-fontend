import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'sim-properties',
    templateUrl: 'properties.component.html',
    styleUrls: ['properties.component.scss'],
})

export class PropertiesComponent {

  public imprintVisible: boolean = false;
  public dataProtectionVisible: boolean = false;

  @Input()
  public width: number;

  @Output()
  public onClose: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  public close(): void {
    this.onClose.emit();
  }

  public openImprint(): void {
    this.imprintVisible = true;
  }

  public closeImprint(): void {
    this.imprintVisible = false;
  }

  public openDataProtection(): void {
    this.dataProtectionVisible = true;
  }

  public closeDataProtection(): void {
    this.dataProtectionVisible = false;
  }
}
