import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StickerPalette } from '../../../../../../simpi-frontend-common/src/lib/models/sticker-palette';
import { StickerService } from '../../../../../../simpi-frontend-common/src/lib/services/stickers/sticker.service';
import { Sticker } from '../../../../../../simpi-frontend-common/src/lib/models/sticker';
import { IonPullUpFooterState } from 'ionic-pullup';

@Component({
  selector: 'sim-sticker-tabs',
  templateUrl: './sticker-tabs.component.html',
  styleUrls: ['./sticker-tabs.component.scss']
})
export class StickerTabsComponent {

  public stickerPalettes: StickerPalette[];
  public selectedStickerPaletteIndex: number = 0;

  @Input()
  public bottomSheetState: IonPullUpFooterState;

  @Output()
  public bottomSheetStateChange: EventEmitter<IonPullUpFooterState> = new EventEmitter<IonPullUpFooterState>();

  constructor(private stickerService: StickerService) {
    this.stickerPalettes = this.stickerService.palettes;
  }

  public onTapTab(index: number): void {
    this.selectedStickerPaletteIndex = index;
    this.showPullup();
  }

  public onStickerClicked(sticker: Sticker): void {
    this.collapsePullup();
  }

  public collapsePullup(): void {
    this.bottomSheetState = IonPullUpFooterState.Collapsed;
    this.bottomSheetStateChange.emit(this.bottomSheetState);
  }

  public showPullup(): void {
    this.bottomSheetState = IonPullUpFooterState.Expanded;
    this.bottomSheetStateChange.emit(this.bottomSheetState);
  }

  public onFooterStateChange($event: IonPullUpFooterState): void {
    this.bottomSheetState = $event;
    this.bottomSheetStateChange.emit(this.bottomSheetState);
  }
}
