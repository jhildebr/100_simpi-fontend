import { Renderer } from './renderer';
import { InteractionHost } from '../interactionHost';
import { AlignmentGuideline } from '../interaction/stickerAlignmentHelper';

export class AlignmentRenderer implements Renderer {
  private currentGuidelines: AlignmentGuideline[] = [];

  /**
   * Sets the current alignment guidelines to render
   */
  public setGuidelines(guidelines: AlignmentGuideline[]): void {
    this.currentGuidelines = guidelines || [];
  }

  /**
   * Clears all guidelines
   */
  public clearGuidelines(): void {
    this.currentGuidelines = [];
  }

  public renderInImageSpace(host: InteractionHost, context: CanvasRenderingContext2D): void {
    if (!this.currentGuidelines || this.currentGuidelines.length === 0) {
      return;
    }

    console.log('Rendering alignment guidelines:', this.currentGuidelines.length);

    // Save context state
    context.save();

    // Set guideline style
    context.strokeStyle = '#ff0000'; // Red color for better visibility
    context.lineWidth = 3;
    context.setLineDash([]); // Solid line for testing
    context.globalAlpha = 1.0;

    // Draw each guideline
    this.currentGuidelines.forEach((guideline, index) => {
      console.log(`Drawing guideline ${index}:`, 
        `from (${guideline.start.x}, ${guideline.start.y})`, 
        `to (${guideline.end.x}, ${guideline.end.y})`);
      
      context.beginPath();
      context.moveTo(guideline.start.x, guideline.start.y);
      context.lineTo(guideline.end.x, guideline.end.y);
      context.stroke();
    });

    // Restore context state
    context.restore();
  }

  public renderInScreenSpace(host: InteractionHost, context: CanvasRenderingContext2D): void {
    // Guidelines are rendered in image space, not screen space
  }
}