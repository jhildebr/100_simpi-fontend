import { Renderer } from './renderer';
import { InteractionHost } from '../interactionHost';
import { StickerService } from 'projects/simpi-frontend-common/src/lib/services/stickers/sticker.service';
import {
  BUBBLE_STICKER_ID, HIGHLIGHT_STICKER_ID,
  MORE_DOTS_STICKER_ID,
  WHITE_BUBBLE_STICKER_ID
} from 'projects/simpi-frontend-common/src/lib/services/stickers/simpi-sticker-collection';
import { Sticker, TRANSFORMATION_FLIP_HORIZONTALLY } from 'projects/simpi-frontend-common/src/lib/models/sticker';
import { StickerUtils } from '../common/stickerUtils';
import { Rect } from '../../models/rect';
import { StickerInfo } from '../../models/stickerInfo';
import {
  STICKERS,
  STICKER_TYPE_TOUCH,
  STICKER_TYPE_TURN_RIGHT,
  STICKER_INTERACTION_RADIUS,
  STICKER_WIDTH,
  STICKER_HEIGHT,
  STICKER_ANIMATION_DURATION,
  STICKER_CUSTOM_ANIMATION_ROTATE_LEFT,
  STICKER_CUSTOM_ANIMATION_ROTATE_RIGHT,
  STICKER_CUSTOM_ANIMATION_DELAY,
  STICKER_CUSTOM_ANIMATION_DURATION,
  STICKER_CUSTOM_ANIMATION_TRANSLATE_Y
} from '../common/stickerConfig';
import { RendererUtils } from './rendererUtils';
import { Vector2 } from '../../models/vector2';
import { EditorPanelType } from '../../../lib/models/editor-panel-type';

export class StickerRenderer implements Renderer {

  private stickerUtils: StickerUtils;
  private timeOffset: number;

  constructor(host: InteractionHost, private stickerService: StickerService) {
    this.stickerUtils = new StickerUtils(host, stickerService);
  }

  renderInScreenSpace(host: InteractionHost, context: CanvasRenderingContext2D, ...args: any[]): void {
  }

  public renderInImageSpace(host: InteractionHost, context: CanvasRenderingContext2D): void {
    if(host.visiblePanel !== EditorPanelType.STICKERS &&
       host.visiblePanel !== EditorPanelType.TEXT &&
       host.visiblePanel !== EditorPanelType.PORTRAIT_INDICATOR &&
       host.visiblePanel !== EditorPanelType.NONE) {
        return;
    }

    const stickers = host.getProperty(STICKERS) as StickerInfo[];

    stickers.forEach((sticker: StickerInfo): void => {
      if (sticker.appearanceDelayInMilliseconds > Date.now() - this.timeOffset) {
        if (!host.readonly) {
          context.globalAlpha = 0.3;
          sticker.time = STICKER_ANIMATION_DURATION;
        } else {
          return;
        }
      } else {
        if (!sticker.editorIsRendered) {
          sticker.time = 0;
          sticker.editorIsRendered = true;
        }
        context.globalAlpha = 1;
      }

      if (sticker.selected && !host.readonly) {
        if (!host.mobileApp) {
          this.renderSelection(host, context, sticker);
        }
        if (sticker.isInTrashArea) {
          context.globalAlpha = 0.6;
        }
      }

      if (sticker.type === STICKER_TYPE_TOUCH) {
        this.renderTouchSticker(context, sticker);
      } else if (sticker.type === STICKER_TYPE_TURN_RIGHT) {
        this.renderTurnRightSticker(context, sticker);
      } else if (sticker.type === HIGHLIGHT_STICKER_ID) {
        this.renderHighlightSticker(context, sticker);
      } else {
        this.renderSvgSticker(context, sticker);
      }

      context.globalAlpha = 1;
    });
  }

  initializeBeforePlaying(host: InteractionHost): void {
    this.timeOffset = Date.now();
    const stickers = host.getProperty(STICKERS) as StickerInfo[];

    stickers.forEach((sticker: StickerInfo) => {
      sticker.editorIsRendered = false;
    });
  }

  private renderSelection(host: InteractionHost, context: CanvasRenderingContext2D, stickerInfo: StickerInfo): void {
    if(host.visiblePanel !== EditorPanelType.STICKERS) {
         return;
     }
    const sticker: Sticker = this.stickerService.getStickerById(stickerInfo.type);
    if (!sticker) {
      // if no sticker exists with the id the hover indicator should not be displayed
      // this can happen if stickers are deleted from a collection
      return;
    }
    context.strokeStyle = '#fff';
    const stickerImageScaleFactor = this.stickerUtils.getStickerImageScaleFactor();
    context.lineWidth = 8 * stickerImageScaleFactor;
    context.setLineDash([4, 4].map(value => value * stickerImageScaleFactor));
    context.beginPath();
    if (sticker.hasBubble) {
      RendererUtils.rotateCanvas(context, stickerInfo.pos, stickerInfo.rotationAngle);
      // draw rectangular hover indicator for stickers with bubble (e.g. gesture stickers)
      const bubbleRect: Rect = this.stickerUtils.getBubbleBoundingBox(stickerInfo);
      context.rect(bubbleRect.x, bubbleRect.y, bubbleRect.width, bubbleRect.height);
      RendererUtils.resetCanvasRotation(context, stickerInfo.pos, stickerInfo.rotationAngle);
    } else {
      // and round hover indicator for stickers without bubble (e.g. fun stickers)
      const stickerScaleFactor = this.stickerUtils.getStickerScaleFactor(stickerInfo);
      context.arc(stickerInfo.pos.x, stickerInfo.pos.y, STICKER_INTERACTION_RADIUS * stickerScaleFactor, 0, 2 * Math.PI);
    }
    context.stroke();
  }

  private renderTouchSticker(context: CanvasRenderingContext2D, sticker: StickerInfo): void {
    const time = sticker.time % 140;

    context.beginPath();
    context.arc(sticker.pos.x, sticker.pos.y, 8 * (Math.cos(sticker.time * 0.09) + 1), 0, 2 * Math.PI, false);
    context.fillStyle = '#eeeeff';
    context.globalAlpha = 0.7;
    context.fill();

    context.beginPath();
    context.arc(sticker.pos.x, sticker.pos.y, time * 0.5, 0, 2 * Math.PI, false);
    context.fillStyle = '#eeeeff';
    context.globalAlpha = Math.max(0, 0.5 - time * 0.005);
    context.fill();

    context.globalAlpha = 1;
  }

  private renderTurnRightSticker(context: CanvasRenderingContext2D, sticker: StickerInfo): void {
    const ease = (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const time = sticker.time % 180;
    const timeTurnEnd = ease(time / 180.0) * 12.0;
    const timeTurnStart = timeTurnEnd / 2.0;
    const timeAlpha = time / 150.0;
    const timeWidth = time / 30.0;
    const radius = 40.0;

    context.setLineDash([]);
    context.beginPath();
    context.arc(sticker.pos.x, sticker.pos.y, radius, Math.PI + timeTurnStart, Math.PI + timeTurnEnd);
    context.strokeStyle = '#eeeeff';
    context.globalAlpha = Math.max(0.8 - timeAlpha, 0);
    context.lineWidth = 16 + timeWidth;
    context.stroke();

    context.beginPath();
    const arrowHeadPos = RendererUtils.getArrowHeadPos(sticker.pos, radius, Math.PI + timeTurnEnd);
    context.fillStyle = '#eee';
    context.save();
    context.translate(arrowHeadPos.x, arrowHeadPos.y);
    context.rotate(Math.PI + timeTurnEnd);
    context.translate(-arrowHeadPos.x, -arrowHeadPos.y);
    context.moveTo(arrowHeadPos.x - 18, arrowHeadPos.y);
    context.lineTo(arrowHeadPos.x, arrowHeadPos.y + 15);
    context.lineTo(arrowHeadPos.x + 18, arrowHeadPos.y);
    context.restore();
    context.fill();

    context.globalAlpha = 1;
  }

  private renderHighlightSticker(context: CanvasRenderingContext2D, stickerInfo: StickerInfo): void {
    const radius: number = 10;
    const stickerImageScaleFactor = this.stickerUtils.getStickerImageScaleFactor();
    context.lineWidth = 2 * stickerImageScaleFactor;
    context.strokeStyle = '#000';
    context.setLineDash([]);
    context.beginPath();
    context.arc(stickerInfo.pos.x, stickerInfo.pos.y, radius * this.stickerUtils.getStickerScaleFactor(stickerInfo), 0, 2 * Math.PI);
    context.stroke();

    const speed: number = 50;
    const time = stickerInfo.time % (Math.PI * speed);
    const ease = Math.sin;

    const borderWidth: number = 15 * (1 - ease(time / speed));
    const oldAlpha = context.globalAlpha;
    context.globalAlpha = 0.8  * ease(time / speed) * ease(time / speed);
    context.lineWidth = borderWidth * this.stickerUtils.getStickerScaleFactor(stickerInfo);
    context.strokeStyle = '#fff';
    context.beginPath();
    context.arc(stickerInfo.pos.x, stickerInfo.pos.y, (radius + (borderWidth / 2)) * this.stickerUtils.getStickerScaleFactor(stickerInfo), 0, 2 * Math.PI);
    context.stroke();
    context.globalAlpha = oldAlpha;
  }

  private renderSvgSticker(context: CanvasRenderingContext2D, stickerInfo: StickerInfo) {
    const ease: (x: number) => number = stickerInfo.showPopUpEffect ? RendererUtils.easeOutBack : (_) => 1;
    const sticker = this.stickerService.getStickerById(stickerInfo.type);
    const stickerImage = this.stickerService.getStickerImage(stickerInfo);
    if (sticker && stickerImage) {
      const time: number = Math.max(0, Math.min(stickerInfo.time, STICKER_ANIMATION_DURATION));
      const stickerScaleFactor = this.stickerUtils.getStickerScaleFactor(stickerInfo) * ease(time / STICKER_ANIMATION_DURATION);
      const imageSize = this.calculateImageWidthAndHeight(stickerImage, stickerScaleFactor);
      const additionalScaling = this.calculateAdditionalScaling(stickerInfo, sticker);
      const imageWidth = imageSize[0] * additionalScaling;
      const imageHeight = imageSize[1] * additionalScaling;
      if (sticker.hasBubble) {
        const bubbleImage = this.stickerService.getStickerImageById(stickerInfo.actionType === 'resource' ? WHITE_BUBBLE_STICKER_ID : BUBBLE_STICKER_ID, sticker.isVideo);
        if (bubbleImage) {
          // bubble stickers only rotate the bubble but not the sticker
          RendererUtils.rotateCanvas(context, stickerInfo.pos, stickerInfo.rotationAngle);

          const bubbleWidth = Math.floor(STICKER_WIDTH * stickerScaleFactor);
          const bubbleHeight = Math.floor(STICKER_HEIGHT * stickerScaleFactor);

          context.drawImage(bubbleImage,
            Math.floor(stickerInfo.pos.x - (bubbleWidth / 2) - (10 * stickerScaleFactor)),
            Math.floor(stickerInfo.pos.y - (bubbleHeight / 2) - (24 * stickerScaleFactor)),
            bubbleWidth + (20 * stickerScaleFactor), bubbleHeight + (30 * stickerScaleFactor));

          RendererUtils.resetCanvasRotation(context, stickerInfo.pos, stickerInfo.rotationAngle);
        }
        context.drawImage(stickerImage,
          Math.floor(stickerInfo.pos.x - (imageWidth / 2)),
          Math.floor(stickerInfo.pos.y - (imageHeight / 2)),
          imageWidth, imageHeight);
        if (stickerInfo.actionType === 'resource') {
          /// render dots (...)
          const dotsImage = this.stickerService.getStickerImageById(MORE_DOTS_STICKER_ID, sticker.isVideo);
          if (dotsImage) {
            context.drawImage(dotsImage,
              stickerInfo.pos.x + imageWidth / 2 - 14 * stickerScaleFactor,
              stickerInfo.pos.y + imageHeight / 2 - 14 * stickerScaleFactor,
              12 * stickerScaleFactor,
              12 * stickerScaleFactor);
          }
        }
      } else {
        // stickers without a bubble rotate the sticker

        RendererUtils.rotateCanvas(context, stickerInfo.pos, stickerInfo.rotationAngle);

        let animationRotation: number;
        let customRotationCenterPoint;
        let animationTranslationY: number;

        if (stickerInfo.customAnimations) {
          animationRotation = this.calculateAnimationRotation(stickerInfo);
          if (animationRotation) {
            customRotationCenterPoint = this.getCustomRotationCenterPoint(sticker, stickerInfo, imageWidth, imageHeight);
            RendererUtils.rotateCanvas(context, customRotationCenterPoint, animationRotation);
          }

          animationTranslationY = this.calculateAnimationTranslation(stickerInfo, imageHeight);

          context.translate(0, animationTranslationY);
        }

        const oldAlpha = context.globalAlpha;
        if (sticker.opacity) {
          context.globalAlpha = sticker.opacity;
        }

        let scaleX: number = 1;
        if (sticker.defaultTransformations?.includes(TRANSFORMATION_FLIP_HORIZONTALLY)) {
          scaleX = -1;
          context.scale(scaleX, 1);
        }

        context.drawImage(stickerImage,
          Math.floor(scaleX * stickerInfo.pos.x - (imageWidth / 2)),
          Math.floor(stickerInfo.pos.y - (imageHeight / 2)),
          imageWidth, imageHeight);

        context.scale(scaleX, 1);

        if (sticker.opacity) {
          context.globalAlpha = oldAlpha;
        }

        context.translate(0, -animationTranslationY);

        if (animationRotation) {
          RendererUtils.resetCanvasRotation(context, customRotationCenterPoint, animationRotation);
        }

        RendererUtils.resetCanvasRotation(context, stickerInfo.pos, stickerInfo.rotationAngle);
      }
    }
  }

  private getCustomRotationCenterPoint(sticker: Sticker, stickerInfo: StickerInfo, imageWidth: number, imageHeight: number): Vector2 {
    if (sticker.relativeRotationCenter) {
      const stickerCenterInStickerCoordinates = new Vector2(Math.floor(imageWidth / 2), Math.floor(imageHeight / 2));
      const stickerTopLeft = stickerInfo.pos.add(stickerCenterInStickerCoordinates.inv());
      const translation = sticker.relativeRotationCenter.scaleXY(imageWidth, imageHeight);
      return stickerTopLeft.add(translation);
    }
    return stickerInfo.pos;
  }

  private calculateAdditionalScaling(stickerInfo: StickerInfo, sticker: Sticker): number {
    const rotationNotAligned = (Math.abs(stickerInfo.rotationAngle) + 0.1) % (Math.PI / 2) > 0.2;
    if (stickerInfo.actionType === 'resource' && rotationNotAligned) {
      return 0.8;
    } else if (sticker.realHand) {
      return 0.7;
    } else {
      return 1;
    }
  }

  private calculateAnimationRotation(stickerInfo: StickerInfo): number {
    const { easing, animationStartTime, time } = this.getCustomAnimationParameters(stickerInfo);
    if (stickerInfo.customAnimations[STICKER_CUSTOM_ANIMATION_ROTATE_LEFT]) {
      // unary plus converts string to number, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus
      const rotationRadians = RendererUtils.radiansFromDegree(+stickerInfo.customAnimations[STICKER_CUSTOM_ANIMATION_ROTATE_LEFT]);
      return rotationRadians - rotationRadians * easing((time - animationStartTime) / STICKER_CUSTOM_ANIMATION_DURATION);
    } else if (stickerInfo.customAnimations[STICKER_CUSTOM_ANIMATION_ROTATE_RIGHT]) {
      const rotationRadians = RendererUtils.radiansFromDegree(+stickerInfo.customAnimations[STICKER_CUSTOM_ANIMATION_ROTATE_RIGHT]);
      return -(rotationRadians - rotationRadians * easing((time - animationStartTime) / STICKER_CUSTOM_ANIMATION_DURATION));
    }
    return 0;
  }

  private calculateAnimationTranslation(stickerInfo: StickerInfo, stickerImageHeight: number): number {
    const { easing, animationStartTime, time } = this.getCustomAnimationParameters(stickerInfo);
    if (stickerInfo.customAnimations[STICKER_CUSTOM_ANIMATION_TRANSLATE_Y]) {
      const translation = +stickerInfo.customAnimations[STICKER_CUSTOM_ANIMATION_TRANSLATE_Y] * stickerImageHeight / 100;
      return translation - translation * easing((time - animationStartTime) / STICKER_CUSTOM_ANIMATION_DURATION);
    }
    return 0;
  }

  private getCustomAnimationParameters(stickerInfo: StickerInfo) {
    const easing: (x: number) => number = RendererUtils.easeInOutQuad;
    const animationStartTime: number = STICKER_ANIMATION_DURATION + STICKER_CUSTOM_ANIMATION_DELAY;
    const animationEndTime: number = animationStartTime + STICKER_CUSTOM_ANIMATION_DURATION;
    const time = Math.max(animationStartTime, Math.min(stickerInfo.time, animationEndTime));
    return { easing, animationStartTime, time };
  }

  private calculateImageWidthAndHeight(stickerImage: HTMLImageElement | HTMLVideoElement, stickerScaleFactor: number): [number, number] {
    const naturalWidth = stickerImage instanceof HTMLImageElement ? stickerImage.naturalWidth : stickerImage.width;
    const naturalHeight = stickerImage instanceof HTMLImageElement ? stickerImage.naturalHeight : stickerImage.height;

    if (naturalWidth === naturalHeight) {
      return [Math.floor(STICKER_WIDTH * stickerScaleFactor), Math.floor(STICKER_HEIGHT * stickerScaleFactor)];
    }

    const landscape: boolean = naturalWidth > naturalHeight;
    const imageScaleFactor = naturalWidth / naturalHeight;

    const width = landscape ? Math.floor(STICKER_WIDTH * stickerScaleFactor)
      : Math.floor(STICKER_WIDTH * stickerScaleFactor * imageScaleFactor);
    const height = landscape ? Math.floor(STICKER_HEIGHT * stickerScaleFactor / imageScaleFactor)
      : Math.floor(STICKER_HEIGHT * stickerScaleFactor);
    return [width, height];
  }

}
