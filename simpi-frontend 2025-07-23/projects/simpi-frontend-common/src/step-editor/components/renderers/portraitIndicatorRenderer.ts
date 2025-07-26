import { Renderer } from './renderer';
import { InteractionHost } from '../interactionHost';
import { PORTRAIT_INDICATOR_CENTER } from '../interaction/portraitIndicatorHandler';
import { Vector2 } from '../../models/vector2';
import { spanOuter, spanInner } from '../interaction/portraitIndicatorUtils';
import { EditorPanelType } from '../../../lib/models/editor-panel-type';

export class PortraitIndicatorRenderer implements Renderer {

  renderInScreenSpace(host: InteractionHost, context: CanvasRenderingContext2D, ...args: any[]): void {
  }

  public renderInImageSpace(host: InteractionHost, context: CanvasRenderingContext2D): void {
    if(host.visiblePanel !== EditorPanelType.PORTRAIT_INDICATOR && host.visiblePanel !== EditorPanelType.NONE) {
        return;
    }
    
    if (!host.readonly && !host.mobileApp) {
      let pos = host.getProperty(PORTRAIT_INDICATOR_CENTER, undefined) as Vector2;
      if (!pos) {
        return;
      }

      const rect = spanOuter(host, pos);//.scale(host.getImageToCanvasScaleFactor());
      const rectInner = spanInner(host, pos);//.scale(host.getImageToCanvasScaleFactor());

      context.globalAlpha = 0.2;
      context.fillStyle = '#fff';
      context.lineWidth = 3;
      context.setLineDash([4, 4]);
      context.fillRect(rectInner.x, rectInner.y, rectInner.width, rectInner.height);


      context.fillStyle = '#fff';
      context.lineWidth = 3;
      context.setLineDash([4, 4]);
      context.fillRect(rect.x, rect.y, rect.width, rect.height);

      // Draw red lines on left and right edges for better visibility
      context.globalAlpha = 1;
      context.strokeStyle = '#ff0000'; // Red color
      context.lineWidth = 2;
      context.setLineDash([]); // Solid line
      
      // Left edge line
      context.beginPath();
      context.moveTo(rectInner.x, rectInner.y);
      context.lineTo(rectInner.x, rectInner.y + rectInner.height);
      context.stroke();
      
      // Right edge line
      context.beginPath();
      context.moveTo(rectInner.x + rectInner.width, rectInner.y);
      context.lineTo(rectInner.x + rectInner.width, rectInner.y + rectInner.height);
      context.stroke();

      if (host.isDebugMode) {
        context.fillStyle = '#ff00ff';
        context.globalAlpha = 1;
        context.beginPath();
        context.arc(pos.x, pos.y, host.projectDimensions(new Vector2(5, 5)).x, 0, 2 * Math.PI);
        context.fill();
      }

      context.globalAlpha = 1;
    }
  }
}
