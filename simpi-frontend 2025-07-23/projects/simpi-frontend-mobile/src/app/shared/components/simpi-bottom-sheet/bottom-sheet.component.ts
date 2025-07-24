import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonPullUpFooterState } from 'ionic-pullup';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'sim-bottom-sheet',
  templateUrl: 'bottom-sheet.component.html',
  styleUrls: ['bottom-sheet.component.scss']
})

/**
 * Place content of the bottom sheet between the <sim-bottom-sheet> and </sim-bottom-sheet> tags.
 *
 * This should include an <ion-content> area. Everything before the <ion-content> will always be visible.
 * From within <ion-content> and </ion-content> as mus as specified by [minBottomVisiblePx] will be visible.
 *
 * Example:
 * ```
 * <sim-bottom-sheet>
 *   <div>I am always visible, even when collapsed.<div>
 *     <ion-content>
 *       <div>
 *         When collapsed, only [minBottomVisiblePx] of me are visible.
 *         And I am scrollable.
 *       </div>
 *     </ion-content>
 * </sim-bottom-sheet>
 * ```
 *
 */
export class BottomSheetComponent implements ViewWillEnter {

  @Input()
  public footerState: IonPullUpFooterState;

  @Output()
  public footerStateChange: EventEmitter<IonPullUpFooterState> = new EventEmitter<IonPullUpFooterState>();

  @Input()
  public topMarginPx: number = 50;

  @Input()
  public minBottomVisiblePx: number = 20;

  public ionViewWillEnter(): void {
    this.footerState = IonPullUpFooterState.Collapsed;
    this.footerStateChange.emit(this.footerState);
  }

  public footerCollapsed(): void {
    this.footerState = IonPullUpFooterState.Collapsed;
    this.footerStateChange.emit(this.footerState);
  }

  public footerExpanded(): void {
    this.footerState = IonPullUpFooterState.Expanded;
    this.footerStateChange.emit(this.footerState);
  }

  public toggleFooter(): void {
    this.footerState = this.footerState === IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
    this.footerStateChange.emit(this.footerState);
  }

  public dragged(): void {
    this.toggleFooter();
  }

  public footerStateChanged(state: IonPullUpFooterState): void {
    this.footerState = state;
    this.footerStateChange.emit(this.footerState);
  }
}
