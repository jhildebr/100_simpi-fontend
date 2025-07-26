import { InteractionHandler } from './interactionHandler';
import { InteractionHost } from '../interactionHost';
import { Vector2 } from '../../models/vector2';
import { StickerControlPosition, StickerControlsUtils } from '../common/stickerControlsUtils';
import { StickerService } from 'projects/simpi-frontend-common/src/lib/services/stickers/sticker.service';
import { StickerInfo } from '../../models/stickerInfo';
import {
  MIN_STICKER_SCALE_FACTOR,
  STICKER_ANIMATION_DURATION,
  STICKER_CUSTOM_ANIMATION_DELAY,
  STICKER_CUSTOM_ANIMATION_DURATION,
  STICKER_CUSTOM_ANIMATION_ROTATE_LEFT,
  STICKER_CUSTOM_ANIMATION_ROTATE_RIGHT,
  STICKER_CUSTOM_ANIMATION_TRANSLATE_Y,
  STICKERS
} from '../common/stickerConfig';
import { ANIMATION_ROTATE, ANIMATION_TRANSLATE } from '../../../lib/models/sticker';
import { EditorPanelType } from '../../../lib/models/editor-panel-type';

export class StickerControlsInteractionHandler implements InteractionHandler {

  private utils: StickerControlsUtils;
  private rotating: boolean = false;
  private scaling: boolean = false;
  private rotateOrScaleStickerIndex: number = -1;

  public priority: number = 25;

  constructor(host: InteractionHost, stickerService: StickerService) {
    this.utils = new StickerControlsUtils(host, stickerService);
  }

  public initialize(host: InteractionHost): void {
  }

  public handlePointerDown(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly || host.mobileApp ||
      (host.visiblePanel !== EditorPanelType.STICKERS &&
        host.visiblePanel !== EditorPanelType.NONE)) {
      return false;
    }

    const stickers: StickerInfo[] = host.getProperty(STICKERS) as StickerInfo[];
    const selectedStickerIndex: number = stickers.findIndex(sticker => sticker.selected);
    if (selectedStickerIndex === -1) {
      return false;
    }

    const radius: number = this.utils.getStickerControlInteractionRadius();
    const sticker: StickerInfo = stickers[selectedStickerIndex];
    const rotateControlCenter = this.utils.getTranslatedStickerControlCenterPoint(StickerControlPosition.TOP_CENTER, sticker);
    const scaleControlCenter = this.utils.getTranslatedStickerControlCenterPoint(StickerControlPosition.BOTTOM_RIGHT, sticker);
    if (rotateControlCenter.distance(pos) < radius) {
      this.rotating = true;
      this.rotateOrScaleStickerIndex = selectedStickerIndex;
      
      // Show sticker info popup for rotation
      const canvasPos = (host as any).absoluteOnPage?.(pos) || pos;
      (host as any).showStickerInfoPopup?.(canvasPos, sticker.pos, sticker.scaleFactor || 1.0, sticker.rotationAngle || 0);
      
      return true;
    } else if (scaleControlCenter.distance(pos) < radius) {
      this.scaling = true;
      this.rotateOrScaleStickerIndex = selectedStickerIndex;
      
      // Show sticker info popup for scaling
      const canvasPos = (host as any).absoluteOnPage?.(pos) || pos;
      (host as any).showStickerInfoPopup?.(canvasPos, sticker.pos, sticker.scaleFactor || 1.0, sticker.rotationAngle || 0);
      
      return true;
    }

    return false;
  }

  public handlePointerUp(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly || host.mobileApp ||
      (host.visiblePanel !== EditorPanelType.STICKERS &&
        host.visiblePanel !== EditorPanelType.TEXT &&
        host.visiblePanel !== EditorPanelType.NONE)) {
      return false;
    }

    if (this.rotating) {
      this.rotateOrScaleStickerIndex = -1;
      this.rotating = false;
      
      // Hide sticker info popup when rotation ends
      (host as any).hideStickerInfoPopup?.();
      
      return true;
    }

    if (this.scaling) {
      this.rotateOrScaleStickerIndex = -1;
      this.scaling = false;
      
      // Hide sticker info popup when scaling ends
      (host as any).hideStickerInfoPopup?.();
      
      return true;
    }

    return false;
  }

  public handlePointerDrag(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly || host.mobileApp ||
      (host.visiblePanel !== EditorPanelType.STICKERS &&
        host.visiblePanel !== EditorPanelType.NONE)) {
      return false;
    }

    const stickers: StickerInfo[] = host.getProperty(STICKERS) as StickerInfo[];

    if (this.rotateOrScaleStickerIndex > -1) {
      if (this.rotating) {
        const sticker: StickerInfo = stickers[this.rotateOrScaleStickerIndex];
        const stickerPos: Vector2 = sticker.pos;
        const distance = pos.add(stickerPos.inv());
        const newRotation = Math.atan2(distance.y, distance.x) + 0.5 * Math.PI;
        stickers[this.rotateOrScaleStickerIndex].rotationAngle = newRotation;
        
        // Update sticker info popup during rotation
        const canvasPos = (host as any).absoluteOnPage?.(pos) || pos;
        (host as any).updateStickerInfoPopup?.(canvasPos, sticker.pos, sticker.scaleFactor || 1.0, newRotation);
        
        host.setProperty(STICKERS, stickers);
        return true;
      }
      if (this.scaling) {
        const sticker: StickerInfo = stickers[this.rotateOrScaleStickerIndex];
        sticker.scaleFactor = 1;
        const initialPos = this.utils.getStickerControlCenterPoint(StickerControlPosition.BOTTOM_RIGHT, sticker);
        const initialDistance: number = sticker.pos.distance(initialPos);
        const draggedDistance: number = sticker.pos.distance(pos);
        const newScaleFactor: number = Math.max(draggedDistance / initialDistance, MIN_STICKER_SCALE_FACTOR);
        stickers[this.rotateOrScaleStickerIndex].scaleFactor = newScaleFactor;
        
        // Update sticker info popup during scaling
        const canvasPos = (host as any).absoluteOnPage?.(pos) || pos;
        (host as any).updateStickerInfoPopup?.(canvasPos, sticker.pos, newScaleFactor, sticker.rotationAngle || 0);
        
        host.setProperty(STICKERS, stickers);
        return true;
      }
    }

    return false;
  }

  public handlePointerHover(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly || host.mobileApp ||
      (host.visiblePanel !== EditorPanelType.STICKERS &&
        host.visiblePanel !== EditorPanelType.NONE)) {
      return false;
    }

    const stickers: StickerInfo[] = host.getProperty(STICKERS) as StickerInfo[];
    let interactionHandled = false;

    if (this.scaling || this.rotating) {
      this.scaling ? host.setCursor('nwse-resize') : host.setCursor('move');
      stickers[this.rotateOrScaleStickerIndex].hovered = true;
      host.toggleStickerEditMode(true);
      return true;
    }

    const selectedStickerIndex: number = stickers.findIndex(sticker => sticker.selected);
    if (selectedStickerIndex === -1) {
      return false;
    }

    const sticker: StickerInfo = stickers[selectedStickerIndex];

    const deleteControlCenter = this.utils.getTranslatedStickerControlCenterPoint(StickerControlPosition.TOP_RIGHT, sticker);
    const settingsControlCenter = this.utils.getTranslatedStickerControlCenterPoint(StickerControlPosition.TOP_LEFT, sticker);
    const rotateControlCenter = this.utils.getTranslatedStickerControlCenterPoint(StickerControlPosition.TOP_CENTER, sticker);
    const scaleControlCenter = this.utils.getTranslatedStickerControlCenterPoint(StickerControlPosition.BOTTOM_RIGHT, sticker);
    const radius: number = this.utils.getStickerControlInteractionRadius();

    if (deleteControlCenter.distance(pos) < radius
      || settingsControlCenter.distance(pos) < radius
      || this.rotateAnimationControlsHovered(sticker, pos, radius)
      || this.translateAnimationControlsHovered(sticker, pos, radius)
    ) {
      host.setCursor('pointer');
      stickers[selectedStickerIndex].hovered = true;
      host.toggleStickerEditMode(true);
      interactionHandled = true;
    } else if (rotateControlCenter.distance(pos) < radius) {
      host.setCursor('move');
      stickers[selectedStickerIndex].hovered = true;
      host.toggleStickerEditMode(true);
      interactionHandled = true;
    } else if (scaleControlCenter.distance(pos) < radius) {
      host.setCursor('nwse-resize');
      stickers[selectedStickerIndex].hovered = true;
      host.toggleStickerEditMode(true);
      interactionHandled = true;
    } else {
      stickers[selectedStickerIndex].hovered = false;
      host.toggleStickerEditMode(false);
    }

    return interactionHandled;
  }

  private rotateAnimationControlsHovered(sticker: StickerInfo, pos: Vector2, radius: number): boolean {
    if (!(sticker.supportedAnimations && sticker.supportedAnimations.indexOf(ANIMATION_ROTATE) > -1)) {
      return false;
    }
    const animationRotateRightCenter = this.utils.getTranslatedAnimationRotateRightControlCenterPoint(sticker);
    const animationRotateLeftCenter = this.utils.getTranslatedAnimationRotateLeftControlCenterPoint(sticker);
    return animationRotateRightCenter.distance(pos) < radius || animationRotateLeftCenter.distance(pos) < radius;
  }

  private translateAnimationControlsHovered(sticker: StickerInfo, pos: Vector2, radius: number): boolean {
    if (!(sticker.supportedAnimations && sticker.supportedAnimations.indexOf(ANIMATION_TRANSLATE) > -1)) {
      return false;
    }
    const animationTranslateCenter = this.utils.getTranslatedStickerControlCenterPoint(StickerControlPosition.MIDDLE_LEFT, sticker);
    return animationTranslateCenter.distance(pos) < radius;
  }

  public handleClick(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly || !host.editModeEnabled || host.mobileApp ||
      (host.visiblePanel !== EditorPanelType.STICKERS &&
        host.visiblePanel !== EditorPanelType.NONE)) {
      return false;
    }

    const stickers: StickerInfo[] = host.getProperty(STICKERS) as StickerInfo[];
    const selectedStickerIndex: number = stickers.findIndex(sticker => sticker.selected);
    if (selectedStickerIndex === -1) {
      return false;
    }

    const radius: number = this.utils.getStickerControlInteractionRadius();
    const sticker: StickerInfo = stickers[selectedStickerIndex];
    // delete control (X)
    const deleteControlCenter = this.utils.getTranslatedStickerControlCenterPoint(StickerControlPosition.TOP_RIGHT, sticker);
    if (deleteControlCenter.distance(pos) < radius) {
      stickers.splice(selectedStickerIndex, 1);
      host.setProperty(STICKERS, stickers);
      return true;
    }
    const settingsControlCenter = this.utils.getTranslatedStickerControlCenterPoint(StickerControlPosition.TOP_LEFT, sticker);
    if (settingsControlCenter.distance(pos) < radius) {
      host.showStickerSettingsPopup(sticker, settingsControlCenter);
      return true;
    }
    if (!sticker.customAnimations) {
      sticker.customAnimations = new Map<string, string>();
    }
    if (sticker.supportedAnimations) {
      const stickerIndex = (host.getProperty(STICKERS) as StickerInfo[]).filter(s => s.customAnimations).indexOf(sticker);
      const animationStartTime: number = STICKER_ANIMATION_DURATION + STICKER_CUSTOM_ANIMATION_DELAY + STICKER_CUSTOM_ANIMATION_DURATION * stickerIndex;

      if (sticker.supportedAnimations.indexOf(ANIMATION_ROTATE) > -1) {
        const animationRotateRightCenter = this.utils.getTranslatedAnimationRotateRightControlCenterPoint(sticker);
        if (animationRotateRightCenter.distance(pos) < radius) {
          sticker.customAnimations[STICKER_CUSTOM_ANIMATION_ROTATE_LEFT] = '';

          if (sticker.customAnimations[STICKER_CUSTOM_ANIMATION_ROTATE_RIGHT]) {
            sticker.customAnimations[STICKER_CUSTOM_ANIMATION_ROTATE_RIGHT] = '';
          } else {
            sticker.customAnimations[STICKER_CUSTOM_ANIMATION_ROTATE_RIGHT] = '30';
          }

          sticker.time = animationStartTime;

          host.setProperty(STICKERS, stickers);
          return true;
        }
        const animationRotateLeftCenter = this.utils.getTranslatedAnimationRotateLeftControlCenterPoint(sticker);
        if (animationRotateLeftCenter.distance(pos) < radius) {

          if (sticker.customAnimations[STICKER_CUSTOM_ANIMATION_ROTATE_LEFT]) {
            sticker.customAnimations[STICKER_CUSTOM_ANIMATION_ROTATE_LEFT] = '';
          } else {
            sticker.customAnimations[STICKER_CUSTOM_ANIMATION_ROTATE_LEFT] = '30';
          }

          sticker.customAnimations[STICKER_CUSTOM_ANIMATION_ROTATE_RIGHT] = '';

          sticker.time = animationStartTime;

          host.setProperty(STICKERS, stickers);
          return true;
        }
      }
      if (this.translateAnimationControlsHovered(sticker, pos, radius)) {
        if (sticker.customAnimations[STICKER_CUSTOM_ANIMATION_TRANSLATE_Y]) {
          sticker.customAnimations[STICKER_CUSTOM_ANIMATION_TRANSLATE_Y] = '';
        } else {
          sticker.customAnimations[STICKER_CUSTOM_ANIMATION_TRANSLATE_Y] = '40';
        }
        sticker.time = animationStartTime;
        host.setProperty(STICKERS, stickers);
        return true;
      }
    }

    return false;
  }

  public handleDoubleClick(host: InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handleTick(host: InteractionHost): void {
  }

  public handlePinchStart(host: InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handlePinchMove(host: InteractionHost, scale: number): boolean {
    return false;
  }

  public handlePinchEnd(host: InteractionHost): boolean {
    return false;
  }

  public handleRotationStart(host: InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handleRotationMove(host: InteractionHost, rotationDegreesDelta: number): boolean {
    return false;
  }

  public handleRotationEnd(host: InteractionHost): boolean {
    return false;
  }

}
