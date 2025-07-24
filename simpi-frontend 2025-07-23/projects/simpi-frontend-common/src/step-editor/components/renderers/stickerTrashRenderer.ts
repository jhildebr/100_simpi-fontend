import { Renderer } from './renderer';
import { InteractionHost } from '../interactionHost';
import { Vector2 } from '../../models/vector2';
import { StickerService } from 'projects/simpi-frontend-common/src/lib/services/stickers/sticker.service';
import { StickerUtils } from '../common/stickerUtils';
import { StickerInfo } from '../../models/stickerInfo';
import { STICKERS } from '../common/stickerConfig';
import { RendererUtils } from './rendererUtils';
import { TRASH_STICKER_ID } from '../../../lib/services/stickers/simpi-sticker-collection';
import { EditorPanelType } from '../../../lib/models/editor-panel-type';

const STICKER_TRASH_DISTANCE: number = 50;
const TRASH_SIZE: number = 30;

export class StickerTrashRenderer implements Renderer {

  private stickerUtils: StickerUtils;

  constructor(host: InteractionHost, private stickerService: StickerService) {
    this.stickerUtils = new StickerUtils(host, stickerService);
  }

  public renderInImageSpace(host: InteractionHost, context: CanvasRenderingContext2D, ...args: any[]): void {
    {
      if (host.readonly || !host.editModeEnabled || !host.mobileApp || 
        (host.visiblePanel !== EditorPanelType.STICKERS && 
        host.visiblePanel !== EditorPanelType.TEXT &&
        host.visiblePanel !== EditorPanelType.NONE)) {
        return;
      }

      let trashScaleFactor: number = this.stickerUtils.getStickerImageScaleFactor();

      const trashPosition: Vector2 = new Vector2(host.getImageDimensions().x / 2, trashScaleFactor * TRASH_SIZE * 1.1);
      const hoveredStickers: StickerInfo[] = (host.getProperty(STICKERS) as StickerInfo[]).filter(sticker => sticker.hovered);

      let hoveredStickerInTrashArea: boolean = false;
      let time: number = 0;
      const stickerSelected: boolean = !!hoveredStickers?.length;
      hoveredStickers.forEach(sticker => {
        if (sticker.pos.distance(trashPosition) < STICKER_TRASH_DISTANCE * this.stickerUtils.getStickerImageScaleFactor()) {
          hoveredStickerInTrashArea = true;
          time = sticker.time;
          sticker.isInTrashArea = true;
        } else {
          sticker.isInTrashArea = false;
        }
      });

      if (stickerSelected) {
        let rotationAngleRadians: number = 0.2 * Math.sin(0.1 * time % 2 * Math.PI);
        if (hoveredStickerInTrashArea) {
          trashScaleFactor *= 2;
          RendererUtils.rotateCanvas(context, trashPosition, rotationAngleRadians);
        }

        context.globalAlpha = 1;
        const trashImageSize = TRASH_SIZE * trashScaleFactor;
        const trashImage = this.stickerService.getStickerImageById(TRASH_STICKER_ID, false);
        if (trashImage) {
          context.drawImage(trashImage,
            Math.floor(trashPosition.x - (trashImageSize / 2)),
            Math.floor(trashPosition.y - (trashImageSize / 2)),
            trashImageSize, trashImageSize);
        }

        if (hoveredStickerInTrashArea) {
          RendererUtils.resetCanvasRotation(context, trashPosition, rotationAngleRadians);
        }
      }
      context.globalAlpha = 1;
    }

  }

  public renderInScreenSpace(host: InteractionHost, context: CanvasRenderingContext2D, ...args: any[]): void {}
}
