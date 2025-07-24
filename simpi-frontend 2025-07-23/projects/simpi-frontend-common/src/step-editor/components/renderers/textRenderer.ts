import { Renderer } from './renderer';
import { InteractionHost } from '../interactionHost';
import { Vector2 } from '../../models/vector2';
import { Rect } from '../../models/rect';
import { RendererUtils } from './rendererUtils';
import {
  SIMPI_DESCRIPTION_BACKGROUND_COLOR,
  SIMPI_DESCRIPTION_BOUNDING_BOX,
  SIMPI_DESCRIPTION_CONTENT, SIMPI_DESCRIPTION_DELETE_BUTTON_BOUNDING_BOX,
  SIMPI_DESCRIPTION_EDITING_IN_APP, SIMPI_DESCRIPTION_SELECTED,
  SIMPI_DESCRIPTION_VERTICAL_RELATIVE_POS,
  TEXT_TIMING
} from '../editorConstants';
import { EditorPanelType } from '../../../lib/models/editor-panel-type';

export class TextRenderer implements Renderer {

  private cachedTextLines: string[];
  private cachedText: string;
  private cachedCanvasWidth: number;

  renderInImageSpace(host: InteractionHost, context: CanvasRenderingContext2D, ...args: any[]): void {
  }

  renderInScreenSpace(host: InteractionHost, context: CanvasRenderingContext2D, ...args: any[]): void {
    const simpiDescription: string = host.getProperty(SIMPI_DESCRIPTION_CONTENT, '');
    const editingInApp: boolean = host.getProperty(SIMPI_DESCRIPTION_EDITING_IN_APP, false) || false;

    if (!simpiDescription && !editingInApp ||
        (host.visiblePanel !== EditorPanelType.TEXT &&
        host.visiblePanel !== EditorPanelType.STICKERS &&
        host.visiblePanel !== EditorPanelType.PORTRAIT_INDICATOR &&
        host.visiblePanel !== EditorPanelType.NONE)) {
      return;
    }

    const backgroundColor: string = host.getProperty(SIMPI_DESCRIPTION_BACKGROUND_COLOR, '') || '#d96635';
    let verticalRelativePos: number = host.getProperty(SIMPI_DESCRIPTION_VERTICAL_RELATIVE_POS, 0) || 0.8;
    const canvasWidth = host.getBounds().width;
    const canvasHeight = host.getBounds().height;

    if (host.mobileApp && editingInApp) {
      verticalRelativePos = 0.4;
    }

    const fontSize = 22; // px
    context.font = `${fontSize}px "Roboto", sans-serif`;

    const textColor = RendererUtils.invertColor(backgroundColor, true);

    let lines: string[];
    if (this.cachedText === simpiDescription && this.cachedCanvasWidth === canvasWidth) {
      lines = this.cachedTextLines;
    } else {
      lines = TextRenderer.splitTextIntoLines(simpiDescription, context, canvasWidth);
      this.cachedText = simpiDescription;
      this.cachedCanvasWidth = canvasWidth;
      this.cachedTextLines = lines;
    }

    const lineHeight = fontSize;

    const verticalTextOffset: number = canvasHeight * verticalRelativePos;

    let leftmostTextPosition: number = canvasWidth / 2;
    let rightmostTextPosition: number = canvasWidth / 2;
    let topmostTextPosition: number = canvasHeight;
    let bottommostTextPosition: number = 0;

    let verticalLinePosition: number = verticalTextOffset;

    const textDrawings: TextDrawing[] = [];

    lines.forEach((line, index) => {
      const measuredText = context.measureText(line);
      const textPosition: Vector2 = new Vector2(canvasWidth / 2 - measuredText.width / 2, verticalLinePosition);
      const backgroundX: number = textPosition.x - measuredText.actualBoundingBoxLeft;
      const backgroundY: number = textPosition.y - measuredText.actualBoundingBoxAscent;
      const lastLineEditingInApp: boolean = (index === lines.length - 1) && editingInApp;
      leftmostTextPosition = Math.min(leftmostTextPosition, backgroundX);
      rightmostTextPosition = Math.max(rightmostTextPosition, textPosition.x + measuredText.width);
      const spaceForCursor = lastLineEditingInApp ? 5 : 0;
      topmostTextPosition = Math.min(topmostTextPosition, backgroundY);
      bottommostTextPosition = Math.max(bottommostTextPosition, textPosition.y + measuredText.actualBoundingBoxDescent);
      verticalLinePosition = verticalLinePosition + lineHeight;

      // draw background
      context.fillStyle = backgroundColor;
      RendererUtils.fillRoundedRect(context, backgroundX - 6, backgroundY - 5, measuredText.width + 9 + spaceForCursor, lineHeight + 7, 3);

      // can only draw text after all backgrounds were drawn, otherwise background might overlap text
      textDrawings.push(new TextDrawing(line, textPosition));

      if (lastLineEditingInApp) {
        // draw cursor
        const time = host.getProperty(TEXT_TIMING);
        if (time && (time % 200 < 100)) {
            context.strokeStyle = textColor;
            context.beginPath();
            context.moveTo(backgroundX - 6 + measuredText.width + 9, backgroundY - 2);
            context.lineTo(backgroundX - 6 + measuredText.width + 9, backgroundY - 5 + lineHeight + 2);
            context.stroke();
        }
      }

    });

    // draw text
    textDrawings.forEach(textDrawing => {
      context.fillStyle = textColor;
      context.fillText(textDrawing.content, textDrawing.position.x, textDrawing.position.y);
    });

    const boundingBox = new Rect(
      new Vector2(leftmostTextPosition - 10, topmostTextPosition - 10),
      new Vector2(rightmostTextPosition + 10, bottommostTextPosition + 10));

    // draw bounding box if text is selected
    const textSelected: boolean = host.getProperty(SIMPI_DESCRIPTION_SELECTED);
    if (textSelected && !editingInApp) {
      context.strokeStyle = '#fff';
      context.lineWidth = 4;
      context.setLineDash([4, 4]);
      context.beginPath();
      context.rect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);
      context.stroke();

      TextRenderer.renderDeleteButton(new Vector2(boundingBox.point2.x + 20, boundingBox.y - 20), context, host);
    }

    host.setProperty(SIMPI_DESCRIPTION_BOUNDING_BOX, boundingBox); // required for interaction handler (to move text vertically)
  }

  private static splitTextIntoLines(text: string, context: CanvasRenderingContext2D, canvasWidth: number): string[] {
    const result: string[] = []; // will contain the words that can be displayed in each line (one array entry per line)
    let currentLine: string[];
    let remainderStack: string[]; // words in reversed order than original text
    currentLine = text.split(' ');
    remainderStack = [];
    while (currentLine.length > 0) {
      while (context.measureText(currentLine.join(' ')).width > .8 * canvasWidth) {
        remainderStack.push(...currentLine.splice(-1, 1));
      }
      result.push(currentLine.join(' '));
      currentLine = remainderStack.reverse();
      remainderStack = [];
    }
    return result;
  }

  private static renderDeleteButton(centerPoint: Vector2, context: CanvasRenderingContext2D, host: InteractionHost) {
    // background
    context.fillStyle = '#000';
    context.beginPath();
    const radius: number = 15;
    context.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI);
    context.fill();

    // X
    context.strokeStyle = '#fff';
    context.setLineDash([]);
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(centerPoint.x - 0.4 * radius, centerPoint.y - 0.4 * radius);
    context.lineTo(centerPoint.x + 0.4 * radius, centerPoint.y + 0.4 * radius);
    context.moveTo(centerPoint.x + 0.4 * radius, centerPoint.y - 0.4 * radius);
    context.lineTo(centerPoint.x - 0.4 * radius, centerPoint.y + 0.4 * radius);
    context.stroke();

    host.setProperty(SIMPI_DESCRIPTION_DELETE_BUTTON_BOUNDING_BOX, Rect.create(centerPoint.x - radius, centerPoint.y - radius, 2 * radius, 2 * radius));
  }
}

class TextDrawing {
  constructor(public content: string, public position: Vector2) {
  }
}
