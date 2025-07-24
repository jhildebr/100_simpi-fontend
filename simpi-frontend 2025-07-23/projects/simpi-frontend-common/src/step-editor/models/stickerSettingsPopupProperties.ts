import { StickerInfo } from './stickerInfo';
import { Vector2 } from './vector2';

export class StickerSettingsPopupProperties {

  constructor(stickerInfo: StickerInfo, popupPositionTopLeft: Vector2, popupSize: Vector2) {
    this.stickerInfo = stickerInfo;
    this.stickerSettingsPopupVisible = true;
    this.popupPositionTopLeft = popupPositionTopLeft;
    this.popupSize = popupSize;
  }

  stickerInfo: StickerInfo;
  stickerSettingsPopupVisible: boolean;
  popupPositionTopLeft: Vector2;
  popupSize: Vector2;

}
