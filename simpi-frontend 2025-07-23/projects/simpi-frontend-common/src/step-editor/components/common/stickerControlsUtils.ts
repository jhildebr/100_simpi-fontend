import { Vector2 } from '../../models/vector2';
import { InteractionHost } from '../interactionHost';
import { StickerService } from 'projects/simpi-frontend-common/src/lib/services/stickers/sticker.service';
import { StickerUtils } from './stickerUtils';
import { StickerInfo } from '../../models/stickerInfo';
import { STICKER_WIDTH, STICKER_HEIGHT, STICKER_INTERACTION_RADIUS } from './stickerConfig';

const STICKER_CONTROL_RADIUS: number = 10;

export enum StickerControlPosition {
  BOTTOM_RIGHT,
  TOP_CENTER,
  TOP_RIGHT,
  MIDDLE_LEFT,
  TOP_LEFT,
}

export class StickerControlsUtils {

  private stickerUtils: StickerUtils;

  constructor(private host: InteractionHost, private stickerService: StickerService) {
    this.stickerUtils = new StickerUtils(host, stickerService);
  }


  getStickerControlCenterPoint(position: StickerControlPosition, sticker: StickerInfo): Vector2 {
    const stickerDependentScaleFactor: number = this.stickerUtils.getStickerScaleFactor(sticker);
    const stickerIndependentScaleFactor: number = this.stickerUtils.getStickerImageScaleFactor();
    const hasBubble: boolean = this.stickerService.getStickerById(sticker.type)?.hasBubble;
    switch (position) {
      case (StickerControlPosition.BOTTOM_RIGHT): {
        if (hasBubble) {
          const bubbleRect = this.stickerUtils.getBubbleBoundingBox(sticker);
          const x: number = bubbleRect.point2.x + 10 * stickerIndependentScaleFactor;
          const y: number = bubbleRect.point2.y + 10 * stickerIndependentScaleFactor;
          return new Vector2(x, y);
        } else {
          // if distance to blue, dashed interaction indicator should be constant use
          // const x: number = sticker.pos.x + Math.sin(Math.PI / 4) * STICKER_INTERACTION_RADIUS * stickerDependentScaleFactor
          //     + 15 * stickerIndependentScaleFactor;
          // const y: number = sticker.pos.y + Math.sin(Math.PI / 4) * STICKER_INTERACTION_RADIUS * stickerDependentScaleFactor
          //     + 15 * stickerIndependentScaleFactor;
          const x: number = sticker.pos.x + STICKER_INTERACTION_RADIUS * stickerDependentScaleFactor;
          const y: number = sticker.pos.y + STICKER_INTERACTION_RADIUS * stickerDependentScaleFactor;
          return new Vector2(x, y);
        }
      }

      case (StickerControlPosition.TOP_CENTER): {
        if (hasBubble) {
          const bubbleRect = this.stickerUtils.getBubbleBoundingBox(sticker);
          const x: number = sticker.pos.x;
          const y: number = bubbleRect.y - 25 * stickerIndependentScaleFactor;
          return new Vector2(x, y);
        } else {
          const x: number = sticker.pos.x;
          const y: number = sticker.pos.y - STICKER_INTERACTION_RADIUS * stickerDependentScaleFactor - 25 * stickerIndependentScaleFactor;
          return new Vector2(x, y);
        }
      }

      case (StickerControlPosition.TOP_RIGHT): {
        if (hasBubble) {
          const bubbleRect = this.stickerUtils.getBubbleBoundingBox(sticker);
          const x: number = bubbleRect.point2.x + 10 * stickerIndependentScaleFactor;
          const y: number = bubbleRect.point1.y - 10 * stickerIndependentScaleFactor;
          return new Vector2(x, y);
        } else {
          // if distance to blue, dashed interaction indicator should be constant use
          // const x: number = sticker.pos.x + Math.sin(Math.PI / 4) * STICKER_INTERACTION_RADIUS * stickerDependentScaleFactor
          //     + 15 * stickerIndependentScaleFactor;
          // const y: number = sticker.pos.y - Math.sin(Math.PI / 4) * STICKER_INTERACTION_RADIUS * stickerDependentScaleFactor
          //     - 15 * stickerIndependentScaleFactor;
          const x: number = sticker.pos.x + STICKER_INTERACTION_RADIUS * stickerDependentScaleFactor;
          const y: number = sticker.pos.y - STICKER_INTERACTION_RADIUS * stickerDependentScaleFactor;
          return new Vector2(x, y);
        }
      }

      case (StickerControlPosition.MIDDLE_LEFT): {
        const x: number = sticker.pos.x - STICKER_INTERACTION_RADIUS * stickerDependentScaleFactor - 20 * stickerIndependentScaleFactor;
        const y: number = sticker.pos.y;
        return new Vector2(x, y);
      }

      case (StickerControlPosition.TOP_LEFT): {
        if (hasBubble) {
          const bubbleRect = this.stickerUtils.getBubbleBoundingBox(sticker);
          const x: number = bubbleRect.point1.x - 10 * stickerIndependentScaleFactor;
          const y: number = bubbleRect.point1.y - 10 * stickerIndependentScaleFactor;
          return new Vector2(x, y);
        } else {
          // if distance to blue, dashed interaction indicator should be constant use
          // const x: number = sticker.pos.x - Math.sin(Math.PI / 4) * STICKER_INTERACTION_RADIUS * stickerDependentScaleFactor
          //     + 15 * stickerIndependentScaleFactor;
          // const y: number = sticker.pos.y - Math.sin(Math.PI / 4) * STICKER_INTERACTION_RADIUS * stickerDependentScaleFactor
          //     - 15 * stickerIndependentScaleFactor;
          const x: number = sticker.pos.x - STICKER_INTERACTION_RADIUS * stickerDependentScaleFactor;
          const y: number = sticker.pos.y - STICKER_INTERACTION_RADIUS * stickerDependentScaleFactor;
          return new Vector2(x, y);
        }
      }

      default: {
        throw new Error('Control position not supported.');
      }
    }
  }

  getTranslatedStickerControlCenterPoint(position: StickerControlPosition, sticker: StickerInfo, offset: Vector2 = Vector2.zero()): Vector2 {
    const nonTranslatedStickerControlCenterPoint = this.getStickerControlCenterPoint(position, sticker).add(offset);

    if (!sticker.rotationAngle) {
      return nonTranslatedStickerControlCenterPoint;
    }
    return nonTranslatedStickerControlCenterPoint.rotate(sticker.pos, sticker.rotationAngle);
  }

  getAnimationRotateLeftControlCenterPoint(sticker: StickerInfo): Vector2 {
    const scaleFactor = this.stickerUtils.getStickerImageScaleFactor();
    return this.getStickerControlCenterPoint(StickerControlPosition.MIDDLE_LEFT, sticker).add(new Vector2(0, -15).scale(scaleFactor));
  }

  getTranslatedAnimationRotateLeftControlCenterPoint(sticker: StickerInfo): Vector2 {
    const scaleFactor = this.stickerUtils.getStickerImageScaleFactor();
    return this.getTranslatedStickerControlCenterPoint(StickerControlPosition.MIDDLE_LEFT, sticker, new Vector2(0, -15).scale(scaleFactor));
  }

  getAnimationRotateRightControlCenterPoint(sticker: StickerInfo): Vector2 {
    const scaleFactor = this.stickerUtils.getStickerImageScaleFactor();
    return this.getStickerControlCenterPoint(StickerControlPosition.MIDDLE_LEFT, sticker).add( new Vector2(0, +15).scale(scaleFactor));
  }

  getTranslatedAnimationRotateRightControlCenterPoint(sticker: StickerInfo): Vector2 {
    const scaleFactor = this.stickerUtils.getStickerImageScaleFactor();
    return this.getTranslatedStickerControlCenterPoint(StickerControlPosition.MIDDLE_LEFT, sticker, new Vector2(0, +15).scale(scaleFactor));
  }

  getStickerControlRadius(): number {
    const scaleFactor: number = this.stickerUtils.getStickerImageScaleFactor();
    return STICKER_CONTROL_RADIUS * scaleFactor;
  }

  getStickerControlInteractionRadius(): number {
    // make interaction radius slightly bigger than control to improve UX
    return this.getStickerControlRadius() * 1.2;
  }
}
