import { InteractionHandler } from './interactionHandler';
import { Vector2 } from '../../models/vector2';
import { InteractionHost } from '../interactionHost';
import { Rect } from '../../models/rect';
import { spanOuter } from './portraitIndicatorUtils';
import { EditorPanelType } from '../../../lib/models/editor-panel-type';

export const PORTRAIT_INDICATOR_CENTER = 'portrait-indicator-center';

export class PortraitIndicatorHandler implements InteractionHandler {
  private dragPosRelativeToIndicatorCenter: Vector2 = undefined;

  private isDragging: boolean = false;

  constructor(host: InteractionHost) {
    host.setProperty(PORTRAIT_INDICATOR_CENTER, Vector2.zero());
  }

  public get priority(): number {
    return 10;
  }

  public initialize(host: InteractionHost): void {

  }

  public handlePointerDown(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly || host.mobileApp || host.visiblePanel !== EditorPanelType.PORTRAIT_INDICATOR) {
      return false;
    }

    const portraitIndicatorCenter = host.getProperty(PORTRAIT_INDICATOR_CENTER, undefined) as Vector2;
    if (!portraitIndicatorCenter) {
      return false;
    }

    const rect = spanOuter(host, portraitIndicatorCenter);
    if (!rect.contains(pos)) {
      return false;
    }

    this.isDragging = true;
    this.dragPosRelativeToIndicatorCenter = pos.add(portraitIndicatorCenter.inv());
    host.toggleStickerEditMode(true);

    return true;
  }

  public handlePointerUp(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly || host.mobileApp || 
        (host.visiblePanel !== EditorPanelType.PORTRAIT_INDICATOR &&
        host.visiblePanel !== EditorPanelType.NONE)) {
      return false;
    }

    if (this.isDragging) {
      this.isDragging = false;
      host.toggleStickerEditMode(false);
      return true;
    }

    return false;
  }

  public handlePointerHover(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly || host.mobileApp || host.visiblePanel !== EditorPanelType.PORTRAIT_INDICATOR) {
      return false;
    }

    const portraitIndicatorCenter = host.getProperty(PORTRAIT_INDICATOR_CENTER, undefined) as Vector2;
    if (!portraitIndicatorCenter) {
      return false;
    }

    const portraitIndicatorRect = spanOuter(host, portraitIndicatorCenter);
    if (portraitIndicatorRect.contains(pos)) {
      host.setCursor('move');
      return true;
    }

    return false;
  }

  public handlePointerDrag(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly || host.mobileApp || host.visiblePanel !== EditorPanelType.PORTRAIT_INDICATOR) {
      return false;
    }

    if (!this.isDragging) {
      return false;
    }

    const portraitIndicatorCenter = host.getProperty(PORTRAIT_INDICATOR_CENTER, undefined) as Vector2;
    if (!portraitIndicatorCenter) {
      return false;
    }

    const portraitIndicatorRect = spanOuter(host, portraitIndicatorCenter);
    if (!portraitIndicatorRect.contains(pos)) {
      return false;
    }

    const bounds = new Rect(Vector2.zero(), host.getImageDimensions());
    const newPos = pos.add(this.dragPosRelativeToIndicatorCenter.inv()).constraintIn(bounds);
    // Only allow horizontal movement - keep the original Y position
    const currentCenter = host.getProperty(PORTRAIT_INDICATOR_CENTER) as Vector2;
    host.setProperty(PORTRAIT_INDICATOR_CENTER, new Vector2(newPos.x, currentCenter.y));

    return true;
  }

  public handleClick(host: InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handleDoubleClick(host: InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handleTick(host: InteractionHost): void {
  }

  public handlePinchStart(host:InteractionHost, pos: Vector2): boolean {
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
