import { Renderer } from './renderer';
import { InteractionHost } from '../interactionHost';
import { StickerControlPosition, StickerControlsUtils } from '../common/stickerControlsUtils';
import { Vector2 } from '../../models/vector2';
import { StickerService } from 'projects/simpi-frontend-common/src/lib/services/stickers/sticker.service';
import { StickerUtils } from '../common/stickerUtils';
import { StickerInfo } from '../../models/stickerInfo';
import {
  STICKER_CUSTOM_ANIMATION_ROTATE_LEFT,
  STICKER_CUSTOM_ANIMATION_ROTATE_RIGHT,
  STICKER_CUSTOM_ANIMATION_TRANSLATE_Y,
  STICKERS
} from '../common/stickerConfig';
import { RendererUtils } from './rendererUtils';
import { ANIMATION_ROTATE, ANIMATION_TRANSLATE } from '../../../lib/models/sticker';
import { EditorPanelType } from '../../../lib/models/editor-panel-type';

export class StickerControlsRenderer implements Renderer {

  private controlsUtils: StickerControlsUtils;
  private stickerUtils: StickerUtils;

  constructor(host: InteractionHost, stickerService: StickerService) {
    this.controlsUtils = new StickerControlsUtils(host, stickerService);
    this.stickerUtils = new StickerUtils(host, stickerService);
  }

  public renderInImageSpace(host: InteractionHost, context: CanvasRenderingContext2D, ...args: any[]): void {
    if (host.readonly || !host.editModeEnabled || host.mobileApp ||
      (host.visiblePanel !== EditorPanelType.STICKERS &&
        host.visiblePanel !== EditorPanelType.NONE)) {
      return;
    }

    const selectedSticker: StickerInfo = (host.getProperty(STICKERS) as StickerInfo[]).find(sticker => sticker.selected);
    if (!selectedSticker) {
      return;
    }
    const scaleFactor: number = this.stickerUtils.getStickerImageScaleFactor();

    context.globalAlpha = 0.6;

    RendererUtils.rotateCanvas(context, selectedSticker.pos, selectedSticker.rotationAngle);
    this.renderDeleteButton(selectedSticker, context, host, scaleFactor);
    this.renderSettingsButton(selectedSticker, context, host, scaleFactor);
    this.renderRotateIndicator(selectedSticker, context, host, scaleFactor);
    this.renderScaleIndicator(selectedSticker, context, host, scaleFactor);
    this.renderAnimationRotateLeftIndicator(selectedSticker, context, host, scaleFactor);
    this.renderAnimationRotateRightIndicator(selectedSticker, context, host, scaleFactor);
    this.renderAnimationTranslateIndicator(selectedSticker, context, host, scaleFactor);
    RendererUtils.resetCanvasRotation(context, selectedSticker.pos, selectedSticker.rotationAngle);

    context.globalAlpha = 1;
  }

  private renderDeleteButton(sticker: StickerInfo, context: CanvasRenderingContext2D, host: InteractionHost, scaleFactor: number) {
    // background
    context.fillStyle = '#000';
    context.beginPath();
    const centerPoint: Vector2 = this.controlsUtils.getStickerControlCenterPoint(StickerControlPosition.TOP_RIGHT, sticker);
    const radius: number = this.controlsUtils.getStickerControlRadius();
    context.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI);
    context.fill();

    // X
    context.strokeStyle = '#fff';
    context.setLineDash([]);
    context.lineWidth = 1.5 * scaleFactor;
    context.beginPath();
    context.moveTo(centerPoint.x - 0.4 * radius, centerPoint.y - 0.4 * radius);
    context.lineTo(centerPoint.x + 0.4 * radius, centerPoint.y + 0.4 * radius);
    context.moveTo(centerPoint.x + 0.4 * radius, centerPoint.y - 0.4 * radius);
    context.lineTo(centerPoint.x - 0.4 * radius, centerPoint.y + 0.4 * radius);
    context.stroke();
  }

  private renderSettingsButton(sticker: StickerInfo, context: CanvasRenderingContext2D, host: InteractionHost, scaleFactor: number) {
    // background
    context.fillStyle = '#000';
    context.beginPath();
    const centerPoint: Vector2 = this.controlsUtils.getStickerControlCenterPoint(StickerControlPosition.TOP_LEFT, sticker);
    const radius: number = this.controlsUtils.getStickerControlRadius();
    context.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI);
    context.fill();

    // gear icon
    context.strokeStyle = '#fff';
    context.setLineDash([]);
    context.lineWidth = 1.5 * scaleFactor;

    const gearRadius: number = 0.4 * radius;

    // Draw the circle for the gear body
    context.beginPath();
    context.arc(centerPoint.x, centerPoint.y, gearRadius - context.lineWidth, 0, Math.PI * 2);
    context.stroke();

    // Draw gear teeth around the edge
    context.lineWidth = scaleFactor;
    context.beginPath();
    const numTeeth: number = 8;
    for (let i = 0; i < numTeeth; i++) {
      // Calculate angles for each tooth
      let angle = i * (2 * Math.PI / numTeeth);
      let nextAngle = (i + 1) * (2 * Math.PI / numTeeth);

      // Calculate outer points of tooth
      let outerPoint = {
        x: centerPoint.x + gearRadius * Math.cos(angle),
        y: centerPoint.y + gearRadius * Math.sin(angle)
      };
      let nextOuterPoint = {
        x: centerPoint.x + gearRadius * Math.cos(nextAngle),
        y: centerPoint.y + gearRadius * Math.sin(nextAngle)
      };

      // Calculate inner points of tooth
      let innerPoint = {
        x: centerPoint.x + (gearRadius * 0.8) * Math.cos(angle),
        y: centerPoint.y + (gearRadius * 0.8) * Math.sin(angle)
      };

      // Draw tooth
      context.moveTo(outerPoint.x, outerPoint.y);
      context.lineTo(innerPoint.x, innerPoint.y);
      context.lineTo(nextOuterPoint.x, nextOuterPoint.y);
    }

    context.stroke();
  }

  private renderRotateIndicator(sticker: StickerInfo, context: CanvasRenderingContext2D, host: InteractionHost, scaleFactor: number) {
    // background
    context.fillStyle = '#000';
    context.beginPath();
    const centerPoint: Vector2 = this.controlsUtils.getStickerControlCenterPoint(StickerControlPosition.TOP_CENTER, sticker);
    const radius: number = this.controlsUtils.getStickerControlRadius();
    context.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI);
    context.fill();

    this.drawRotateSymbol(context, scaleFactor, centerPoint, radius, true);
  }

  private renderScaleIndicator(sticker: StickerInfo, context: CanvasRenderingContext2D, host: InteractionHost, scaleFactor: number) {
    // background
    context.fillStyle = '#000';
    context.beginPath();
    const centerPoint: Vector2 = this.controlsUtils.getStickerControlCenterPoint(StickerControlPosition.BOTTOM_RIGHT, sticker);
    const radius: number = this.controlsUtils.getStickerControlRadius();
    context.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI);
    context.fill();

    // <->
    context.strokeStyle = '#fff';
    context.setLineDash([]);
    context.lineWidth = 1.5 * scaleFactor;
    context.beginPath();

    // line
    context.moveTo(centerPoint.x - 0.4 * radius, centerPoint.y - 0.4 * radius);
    context.lineTo(centerPoint.x + 0.4 * radius, centerPoint.y + 0.4 * radius);

    // end arrow
    context.moveTo(centerPoint.x + 0.4 * radius, centerPoint.y);
    context.lineTo(centerPoint.x + 0.4 * radius, centerPoint.y + 0.4 * radius);
    context.lineTo(centerPoint.x, centerPoint.y + 0.4 * radius);

    // start arrow
    context.moveTo(centerPoint.x, centerPoint.y - 0.4 * radius);
    context.lineTo(centerPoint.x - 0.4 * radius, centerPoint.y - 0.4 * radius);
    context.lineTo(centerPoint.x - 0.4 * radius, centerPoint.y);
    context.stroke();
  }

  private renderAnimationRotateLeftIndicator(sticker: StickerInfo, context: CanvasRenderingContext2D, host: InteractionHost, scaleFactor: number) {
    // sticker supports rotate animations in general
    if (!(sticker.supportedAnimations && sticker.supportedAnimations.indexOf(ANIMATION_ROTATE) > -1)) {
      return;
    }

    if (sticker.customAnimations[STICKER_CUSTOM_ANIMATION_ROTATE_LEFT]) {
      // specific rotate animation is turned on
      context.fillStyle = '#2ac2d6';
    } else {
      context.fillStyle = '#000';
    }
    // background
    context.beginPath();
    const centerPoint: Vector2 = this.controlsUtils.getAnimationRotateLeftControlCenterPoint(sticker);
    const radius: number = this.controlsUtils.getStickerControlRadius();
    context.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI);
    context.fill();

    // Rotate symbol
    this.drawRotateSymbol(context, scaleFactor, centerPoint, radius, false);
  }

  private renderAnimationRotateRightIndicator(sticker: StickerInfo, context: CanvasRenderingContext2D, host: InteractionHost, scaleFactor: number) {
    // sticker supports rotate animations in general
    if (!(sticker.supportedAnimations && sticker.supportedAnimations.indexOf(ANIMATION_ROTATE) > -1)) {
      return;
    }

    if (sticker.customAnimations[STICKER_CUSTOM_ANIMATION_ROTATE_RIGHT]) {
      // specific rotate animation is turned on
      context.fillStyle = '#2ac2d6';
    } else {
      context.fillStyle = '#000';
    }
    // background
    context.beginPath();
    const centerPoint: Vector2 = this.controlsUtils.getAnimationRotateRightControlCenterPoint(sticker);
    const radius: number = this.controlsUtils.getStickerControlRadius();
    context.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI);
    context.fill();

    // Rotate symbol
    this.drawRotateSymbol(context, scaleFactor, centerPoint, radius, true);
  }

  private renderAnimationTranslateIndicator(sticker: StickerInfo, context: CanvasRenderingContext2D, host: InteractionHost, scaleFactor: number) {
    // sticker supports rotate animations in general
    if (!(sticker.supportedAnimations && sticker.supportedAnimations.indexOf(ANIMATION_TRANSLATE) > -1)) {
      return;
    }

    if (sticker.customAnimations[STICKER_CUSTOM_ANIMATION_TRANSLATE_Y]) {
      // specific rotate animation is turned on
      context.fillStyle = '#2ac2d6';
    } else {
      context.fillStyle = '#000';
    }
    // background
    context.beginPath();
    const centerPoint: Vector2 = this.controlsUtils.getStickerControlCenterPoint(StickerControlPosition.MIDDLE_LEFT, sticker);
    const radius: number = this.controlsUtils.getStickerControlRadius();
    context.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI);
    context.fill();

    // Translate symbol
    //  ^
    //  |

    context.strokeStyle = '#fff';
    context.setLineDash([]);
    context.lineWidth = 1.5 * scaleFactor;
    context.beginPath();

    // line
    context.moveTo(centerPoint.x, centerPoint.y + 0.4 * radius);
    context.lineTo(centerPoint.x, centerPoint.y - 0.4 * radius);

    // end arrow
    context.moveTo(centerPoint.x + 0.4 * radius, centerPoint.y);
    context.lineTo(centerPoint.x, centerPoint.y - 0.4 * radius);
    context.lineTo(centerPoint.x - 0.4 * radius, centerPoint.y);

    context.stroke();
  }


  private drawRotateSymbol(context: CanvasRenderingContext2D, scaleFactor: number, centerPoint: Vector2, radius: number, clockwise: boolean) {
    context.strokeStyle = '#fff';
    context.setLineDash([]);
    context.lineWidth = 1.5 * scaleFactor;
    context.beginPath();
    const startAngle = clockwise ? Math.PI - 1 : 1;
    const endAngle = clockwise ? 1 : Math.PI - 1;
    context.arc(centerPoint.x, centerPoint.y, 0.5 * radius, startAngle, endAngle, !clockwise);
    const arcEnd: Vector2 = RendererUtils.getArrowHeadPos(centerPoint, 0.5 * radius, endAngle);
    const multiplier = clockwise ? 1 : -1;
    context.moveTo(arcEnd.x + 1 * multiplier * scaleFactor, arcEnd.y - 5 * scaleFactor);
    context.lineTo(arcEnd.x, arcEnd.y);
    context.lineTo(arcEnd.x + 5 * multiplier * scaleFactor, arcEnd.y - 2 * scaleFactor);
    context.stroke();
  }

  public renderInScreenSpace(host: InteractionHost, context: CanvasRenderingContext2D, ...args: any[]): void {
  }

}
