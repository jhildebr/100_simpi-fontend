import { Component, Input } from '@angular/core';
import { NotAvailableReasonType } from '../../models/notAvailableReasonType';

@Component({
  selector: 'sim-not-available',
  templateUrl: './not-available.component.html',
  styleUrls: ['./not-available.component.scss']
})
export class NotAvailableComponent {
  public notAvailableReasonTypes: typeof NotAvailableReasonType = NotAvailableReasonType

  @Input()
  public reason: NotAvailableReasonType;

}
