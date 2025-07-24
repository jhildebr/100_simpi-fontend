import { Component, Input } from '@angular/core';

@Component({
  selector: 'sim-status-badges',
  template: `
    <div class='badge w-50' [ngClass]='{
        "sim-badge-private": status === 1,
        "sim-badge-private-group": status === 2,
        "sim-badge-public": status === 3,
        "sim-badge-deleted": status === 4
    }'>
      <span *ngIf="status === 1">private</span>
      <span *ngIf="status === 2">private group</span>
      <span *ngIf="status === 3">public</span>
      <span *ngIf="status === 4">deleted</span>
    </div>
  `,
  styleUrls: ['status-badges.component.scss']
})

export class StatusBadgesComponent {
  @Input()
  public status: number;

  @Input()
  public statusFor: string;
}
