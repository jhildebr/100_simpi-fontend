import { InteractionHandler } from './interactionHandler';
import { InteractionHost } from '../interactionHost';
import { Vector2 } from '../../models/vector2';
import { StickerService } from 'projects/simpi-frontend-common/src/lib/services/stickers/sticker.service';
import { StickerUtils } from '../common/stickerUtils';
import { StickerInfo } from '../../models/stickerInfo';
import { StickerAlignmentHelper } from './stickerAlignmentHelper';
import {
  MIN_STICKER_SCALE_FACTOR,
  PINCH_START_SCALE_FACTOR,
  PINCH_START_STICKER,
  PROP_CREATE_STICKER,
  PROP_CREATE_STICKER_TYPE,
  ROTATION_START_ROTATION_ANGLE_RADIANS,
  ROTATION_START_STICKER,
  STICKER_INTERACTION_RADIUS,
  STICKERS,
} from '../common/stickerConfig';
import { StickerActionPopup } from '../../models/stickerActionPopup';
import { EditorPanelType } from '../../../lib/models/editor-panel-type';

export class StickerInteractionHandler implements InteractionHandler {

  private dragPosRelativeToSticker: Vector2 = undefined;
  private isDragging: boolean = false;
  private draggingIndex: number = -1;
  private stickerUtils: StickerUtils;
  
  // Store current alignment guidelines for rendering
  public currentAlignmentGuidelines: import('./stickerAlignmentHelper').AlignmentGuideline[] = [];

  constructor(host: InteractionHost, private stickerService: StickerService) {
    host.setProperty(STICKERS, [] as StickerInfo[]);
    this.stickerUtils = new StickerUtils(host, stickerService);
  }

  public get priority(): number {
    return 20;
  }

  public initialize(host: InteractionHost): void {
    const stickers = host.getProperty(STICKERS) as StickerInfo[];
    for (const sticker of stickers) {
      sticker.time = 0;
    }
  }

  public handlePointerDown(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly ||
      (host.visiblePanel !== EditorPanelType.STICKERS &&
        host.visiblePanel !== EditorPanelType.NONE)) {
      return false;
    }

    const stickers: StickerInfo[] = host.getProperty(STICKERS) as StickerInfo[];

    const createSticker: boolean = host.getProperty(PROP_CREATE_STICKER) as boolean;

    if (createSticker) {
      const createStickerType: number = host.getProperty(PROP_CREATE_STICKER_TYPE) as number;

      const stickerInfo = new StickerInfo();
      stickerInfo.pos = pos;
      stickerInfo.time = 0;
      stickerInfo.type = createStickerType;
      stickers.push(stickerInfo);
      host.setProperty(PROP_CREATE_STICKER, false);
      return true;
    } else {
      for (let index = 0; index < stickers.length; index++) {
        let sticker = stickers[index];
        if (this.isPosWithinStickerBounds(sticker, pos)) {
          // Deselect all stickers first to ensure only one is selected
          stickers.forEach(s => s.selected = false);
          
          // Move the sticker to the end of the array (top of rendering order)
          const stickerToMove = stickers.splice(index, 1)[0];
          stickers.push(stickerToMove);
          
          this.isDragging = true;
          host.toggleStickerEditMode(true);
          this.draggingIndex = stickers.length - 1; // Update index to new position
          this.dragPosRelativeToSticker = pos.add(stickerToMove.pos.inv());
          if (host.mobileApp) {
            stickerToMove.hovered = this.stickerHovered(host, stickers, this.draggingIndex);
          }
          
          // Show sticker info popup
          const canvasPos = (host as any).absoluteOnPage?.(pos) || pos;
          (host as any).showStickerInfoPopup?.(canvasPos, stickerToMove.pos, stickerToMove.scaleFactor || 1.0, stickerToMove.rotationAngle || 0);
          
          // Update the stickers array in the host
          host.setProperty(STICKERS, stickers);
          
          return true;
        }
      }
    }

    return false;
  }

  public handlePointerUp(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly ||
      (host.visiblePanel !== EditorPanelType.STICKERS &&
        host.visiblePanel !== EditorPanelType.NONE)) {
      return false;
    }

    if (this.isDragging) {
      const stickers = host.getProperty(STICKERS) as StickerInfo[];
      const draggedIndex = this.draggingIndex;
      
      this.isDragging = false;
      this.draggingIndex = -1;
      
      // Clear alignment guidelines when drag ends
      this.currentAlignmentGuidelines = [];
      
      // Hide sticker info popup
      (host as any).hideStickerInfoPopup?.();
      
      // Handle mobile trash area and cleanup
      stickers.forEach((sticker, index) => {
        if (sticker.hovered && sticker.isInTrashArea && host.mobileApp) {
          stickers.splice(index, 1);
          host.setProperty(STICKERS, stickers);
        }
        if (host.mobileApp) {
          sticker.hovered = false;
        }
      });
      
      // After drag: select the dragged sticker and show helper buttons
      if (draggedIndex >= 0 && draggedIndex < stickers.length) {
        // Deselect all stickers first
        stickers.forEach(sticker => sticker.selected = false);
        // Select the dragged sticker
        stickers[draggedIndex].selected = true;
        // Keep edit mode enabled to show helper buttons
        host.toggleStickerEditMode(true);
        host.setProperty(STICKERS, stickers);
      } else {
        // If dragged sticker was deleted, turn off edit mode
        host.toggleStickerEditMode(false);
      }
      
      return true;
    }

    return false;
  }

  public handlePointerHover(host: InteractionHost, pos: Vector2): boolean {
    const stickers = host.getProperty(STICKERS) as StickerInfo[];
    let interactionHandled = false;
    for (let index = 0; index < stickers.length; index++) {
      const sticker = stickers[index];
      if (this.isPosWithinStickerBounds(sticker, pos)) {
        interactionHandled = this.stickerHovered(host, stickers, index);
      } else {
        stickers[index].hovered = false;
      }
    }

    return interactionHandled;
  }

  private stickerHovered(host: InteractionHost, stickers: StickerInfo[], index: number) {
    if (host.visiblePanel !== EditorPanelType.STICKERS) {
      return false;
    }
    if (host.readonly && stickers[index].actionType === 'resource') {
      host.setCursor('pointer');
    } else if (!host.readonly && stickers[index].selected) {
      host.setCursor('move');
      stickers[index].hovered = true;
    }
    return true;
  }

  public handlePointerDrag(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly ||
      (host.visiblePanel !== EditorPanelType.STICKERS &&
        host.visiblePanel !== EditorPanelType.NONE)) {
      return false;
    }

    const stickers = host.getProperty(STICKERS) as StickerInfo[];

    if (this.draggingIndex > -1) {
      const originalPosition = pos.add(this.dragPosRelativeToSticker.inv());
      
      // Apply alignment (grid snap + edge alignment)
      const canvasBounds = host.getBounds();
      const alignmentEnabled = (host as any).alignmentEnabled !== undefined ? (host as any).alignmentEnabled : true;
      const alignmentResult = StickerAlignmentHelper.calculateAlignedPosition(
        originalPosition,
        canvasBounds,
        alignmentEnabled
      );
      
      // Store guidelines for rendering
      this.currentAlignmentGuidelines = alignmentResult.guidelines || [];
      
      // Debug: Log when guidelines are active
      if (this.currentAlignmentGuidelines.length > 0) {
        console.log('Alignment guidelines active:', alignmentResult.snapType, this.currentAlignmentGuidelines);
      }
      
      stickers[this.draggingIndex].pos = alignmentResult.position;

      // Update sticker info popup during drag
      const canvasPos = (host as any).absoluteOnPage?.(pos) || pos;
      (host as any).updateStickerInfoPopup?.(canvasPos, alignmentResult.position, stickers[this.draggingIndex].scaleFactor || 1.0, stickers[this.draggingIndex].rotationAngle || 0);

      host.setProperty(STICKERS, stickers);
      return true;
    }

    return false;
  }

  public handleClick(host: InteractionHost, pos: Vector2): boolean {
    const stickers: StickerInfo[] = host.getProperty(STICKERS) as StickerInfo[];

    if (host.editModeEnabled) {
      // in edit mode, click is for selecting a sticker
      if (host.visiblePanel !== EditorPanelType.STICKERS || host.readonly) {
        return false;
      }
      let anyStickerSelected: boolean = false;
      let selectedIndex: number = -1;
      
      // First pass: find the clicked sticker and deselect all
      for (let index = 0; index < stickers.length; index++) {
        const sticker = stickers[index];
        if (this.isPosWithinStickerBounds(sticker, pos) && !anyStickerSelected) {
          selectedIndex = index;
          anyStickerSelected = true;
        }
        stickers[index].selected = false;
      }
      
      // If a sticker was clicked, move it to top and select it
      if (selectedIndex >= 0) {
        const stickerToMove = stickers.splice(selectedIndex, 1)[0];
        stickers.push(stickerToMove);
        stickerToMove.selected = true;
        host.toggleStickerEditMode(true);
        host.setProperty(STICKERS, stickers);
      }
      if (!anyStickerSelected) {
        host.toggleStickerEditMode(false);
      }
      return true;
    } else {
      // if not in edit mode, click is for opening resource sticker popup
      for (const sticker of stickers.filter(s => s.actionType === 'resource')) {
        if (sticker.pos.distance(pos) < STICKER_INTERACTION_RADIUS * this.stickerUtils.getStickerScaleFactor(sticker) && sticker.actionType === 'resource') {
          const popupProperty: StickerActionPopup = {
            actionId: sticker.actionId,
            actionType: sticker.actionType,
            actionTargetUrl: sticker.actionTargetUrl,
            previewImageId: sticker.previewImageId,
            open: true
          };
          host.showStickerActionPopup(popupProperty);
          return true;
        }
      }
      return false;
    }
  }

  public handleDoubleClick(host: InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handleTick(host: InteractionHost): void {
    const stickers = host.getProperty(STICKERS) as StickerInfo[];
    for (const sticker of stickers) {
      if (sticker.editorIsRendered) {
        sticker.time += 0.4;
      }
    }
  }

  public handlePinchStart(host: InteractionHost, pos: Vector2): boolean {
    const stickers: StickerInfo[] = host.getProperty(STICKERS) as StickerInfo[];
    for (let sticker of stickers) {
      if (this.isPosWithinStickerBounds(sticker, pos)) {
        host.toggleStickerEditMode(true);
        host.setProperty(PINCH_START_STICKER, sticker);
        host.setProperty(PINCH_START_SCALE_FACTOR, sticker.scaleFactor || 1);
        return true;
      }
    }

    return false;
  }

  public handlePinchMove(host: InteractionHost, scale: number): boolean {
    const selectedSticker: StickerInfo = host.getProperty(PINCH_START_STICKER);
    if (selectedSticker) {
      const initialScaleFactor: number = host.getProperty(PINCH_START_SCALE_FACTOR, selectedSticker.scaleFactor || 1);
      selectedSticker.scaleFactor = Math.max(initialScaleFactor * scale, MIN_STICKER_SCALE_FACTOR);
      return true;
    } else {
      return false;
    }
  }

  public handlePinchEnd(host: InteractionHost): boolean {
    if (host.getProperty(PINCH_START_STICKER)) {
      host.setProperty(PINCH_START_STICKER, undefined);
      host.toggleStickerEditMode(false);
      return true;
    }
    return false;
  }

  public handleRotationStart(host: InteractionHost, pos: Vector2): boolean {
    const stickers: StickerInfo[] = host.getProperty(STICKERS) as StickerInfo[];
    for (let sticker of stickers) {
      if (this.isPosWithinStickerBounds(sticker, pos)) {
        host.toggleStickerEditMode(true);
        host.setProperty(ROTATION_START_STICKER, sticker);
        host.setProperty(ROTATION_START_ROTATION_ANGLE_RADIANS, sticker.rotationAngle || 0);
        return true;
      }
    }
    return false;
  }

  public handleRotationMove(host: InteractionHost, rotationDegreesDelta: number): boolean {
    const selectedSticker = host.getProperty(ROTATION_START_STICKER);
    if (selectedSticker) {
      const initialRotationRadians: number = host.getProperty(ROTATION_START_ROTATION_ANGLE_RADIANS, selectedSticker.rotationAngle || 0);
      selectedSticker.rotationAngle = (initialRotationRadians + (rotationDegreesDelta * Math.PI / 180));
      return true;
    } else {
      return false;
    }
  }

  public handleRotationEnd(host: InteractionHost): boolean {
    if (host.getProperty(ROTATION_START_STICKER)) {
      host.toggleStickerEditMode(false);
      host.setProperty(ROTATION_START_STICKER, undefined);
      return true;
    }
    return false;
  }

  private isPosWithinStickerBounds(sticker: StickerInfo, pos: Vector2): boolean {
    let interactingWithSticker: boolean = false;
    if (this.stickerService.getStickerById(sticker.type)?.hasBubble) {
      const bounds = this.stickerUtils.getBubbleBoundingBox(sticker);
      if (bounds.isPointWithin(pos)) {
        interactingWithSticker = true;
      }
    } else {
      const stickerScaleFactor = this.stickerUtils.getStickerScaleFactor(sticker);
      if (sticker.pos.distance(pos) < STICKER_INTERACTION_RADIUS * stickerScaleFactor) {
        interactingWithSticker = true;
      }
    }
    return interactingWithSticker;
  }


}
