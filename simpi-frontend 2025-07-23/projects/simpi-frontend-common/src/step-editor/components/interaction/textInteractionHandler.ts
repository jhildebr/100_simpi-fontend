import { InteractionHost } from '../interactionHost';
import { Vector2 } from '../../models/vector2';
import { InteractionHandler } from './interactionHandler';
import { Rect } from '../../models/rect';
import {
  SIMPI_DESCRIPTION_BOUNDING_BOX, SIMPI_DESCRIPTION_CONTENT, SIMPI_DESCRIPTION_DELETE_BUTTON_BOUNDING_BOX,
  SIMPI_DESCRIPTION_EDITING_IN_APP, SIMPI_DESCRIPTION_SELECTED,
  SIMPI_DESCRIPTION_VERTICAL_RELATIVE_POS,
  TEXT_TIMING
} from '../editorConstants';
import { EditorPanelType } from '../../../lib/models/editor-panel-type';

export class TextInteractionHandler implements InteractionHandler {

  priority: number = 30;
  private isDragging: boolean = false;

  public handleClick(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly || !host.editModeEnabled && host.visiblePanel !== EditorPanelType.TEXT) {
      return false
    }


    const editingInApp: boolean = host.getProperty(SIMPI_DESCRIPTION_EDITING_IN_APP, false);
    const textBoundingBox: Rect = TextInteractionHandler.getTextBoundingBox(host);
    if (!editingInApp) {
      if (textBoundingBox?.inflate(20).isPointWithin(pos)) {
        host.setProperty(SIMPI_DESCRIPTION_SELECTED, true);
        return true;
      } else if (TextInteractionHandler.getXBoundingBox(host)?.isPointWithin(pos)) {
        host.setProperty(SIMPI_DESCRIPTION_CONTENT, undefined);
        host.setProperty(SIMPI_DESCRIPTION_SELECTED, false);
        return true;
      } else {
        host.setProperty(SIMPI_DESCRIPTION_SELECTED, false);
      }
    } else {
      if (!textBoundingBox?.inflate(20).isPointWithin(pos)) {
        host.toggleTextEditMode(false);
        host.setProperty(SIMPI_DESCRIPTION_SELECTED, false);
        return true;
      }
      return false;
    }
  }

  public handleDoubleClick(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly || !host.editModeEnabled && host.visiblePanel !== EditorPanelType.TEXT) {
      return false
    }
    const textBoundingBox: Rect = TextInteractionHandler.getTextBoundingBox(host);
    if (!textBoundingBox) {
      return false;
    }

    if (textBoundingBox.inflate(40).isPointWithin(pos)) {
      window.setTimeout(() => {
        host.setProperty(SIMPI_DESCRIPTION_SELECTED, false);
        host.toggleTextEditMode(true);
      }, 200);
      return true;
    }

    return false;
  }

  public handlePinchMove(host: InteractionHost, scale: number): boolean {
    return false;
  }

  public handlePinchStart(host: InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handlePinchEnd(host: InteractionHost): boolean {
    return false;
  }

  public handlePointerDown(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly || !host.editModeEnabled && host.visiblePanel !== EditorPanelType.TEXT) {
      return false
    }
    let textBoundingBox = TextInteractionHandler.getTextBoundingBox(host);
    if (textBoundingBox?.isPointWithin(pos)) {
      this.isDragging = true;
      return true;
    }
    return false;
  }

  public handlePointerDrag(host: InteractionHost, pos: Vector2): boolean {
    if (!this.isDragging || host.readonly || !host.editModeEnabled || host.visiblePanel !== EditorPanelType.TEXT) {
      return false;
    }

    const projectedHeight: number = host.getBounds().point2.y / host.getImageToCanvasScaleFactor();
    const emptySpace: number = Math.max(projectedHeight - host.getImageDimensions().y, 0);
    let newRelativePos: number = (pos.y + (emptySpace / 2)) / projectedHeight;
    newRelativePos = Math.min(0.9, Math.max(newRelativePos, 0.1));
    host.setProperty(SIMPI_DESCRIPTION_VERTICAL_RELATIVE_POS, newRelativePos);
    return true;
  }

  public handlePointerHover(host: InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handlePointerUp(host: InteractionHost, pos: Vector2): boolean {
    if (host.readonly || !host.editModeEnabled && host.visiblePanel !== EditorPanelType.TEXT) {
      return false
    }

    if (this.isDragging) {
      this.isDragging = false;
      return true;
    }

    return false;
  }

  public handleRotationMove(host: InteractionHost, rotationDegreesDelta: number): boolean {
    return false;
  }

  public handleRotationStart(host: InteractionHost, pos: Vector2): boolean {
    return false;
  }

  public handleRotationEnd(host: InteractionHost): boolean {
    return false;
  }

  public handleTick(host: InteractionHost): void {
    host.setProperty(TEXT_TIMING, (host.getProperty(TEXT_TIMING) || 0) + 1);
  }

  public initialize(host: InteractionHost): void {
  }

  private static getTextBoundingBox(host: InteractionHost): Rect {
    return this.getProjectedBoundingBox(host, SIMPI_DESCRIPTION_BOUNDING_BOX);
  }

  private static getXBoundingBox(host: InteractionHost): Rect {
    return this.getProjectedBoundingBox(host, SIMPI_DESCRIPTION_DELETE_BUTTON_BOUNDING_BOX);
  }

  private static getProjectedBoundingBox(host: InteractionHost, propertyName: string): Rect {
    const textBoundingBox: Rect = host.getProperty(propertyName);
    if (textBoundingBox) {
      return new Rect(host.projectPoint(textBoundingBox.point1), host.projectPoint(textBoundingBox.point2));
    }
    return undefined;
  }

}
