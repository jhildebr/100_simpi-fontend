import { Vector2 } from '../../models/vector2';
import { Rect } from '../../models/rect';

export interface AlignmentResult {
  position: Vector2;
  snapType: 'grid' | 'edge' | 'none';
  guidelines?: AlignmentGuideline[];
}

export interface AlignmentGuideline {
  type: 'horizontal' | 'vertical';
  position: number;
  start: Vector2;
  end: Vector2;
}

export class StickerAlignmentHelper {
  private static readonly GRID_SIZE = 24; // Grid spacing in pixels
  private static readonly SNAP_THRESHOLD = 15; // Snap distance in pixels
  private static readonly EDGE_MARGIN = 20; // Margin from canvas edges

  /**
   * Calculates the aligned position for a sticker based on grid and edge snapping
   */
  public static calculateAlignedPosition(
    originalPosition: Vector2,
    canvasBounds: Rect,
    enableAlignment: boolean = true
  ): AlignmentResult {
    if (!enableAlignment) {
      return {
        position: originalPosition,
        snapType: 'none'
      };
    }

    // Try grid snap first (higher priority)
    const gridResult = this.tryGridSnap(originalPosition, canvasBounds);
    if (gridResult.snapType === 'grid') {
      return gridResult;
    }

    // Try edge snap second
    const edgeResult = this.tryEdgeSnap(originalPosition, canvasBounds);
    if (edgeResult.snapType === 'edge') {
      return edgeResult;
    }

    // No snapping - return original position
    return {
      position: originalPosition,
      snapType: 'none'
    };
  }

  /**
   * Tries to snap to grid intersection points
   */
  private static tryGridSnap(position: Vector2, canvasBounds?: Rect): AlignmentResult {
    const gridX = Math.round(position.x / this.GRID_SIZE) * this.GRID_SIZE;
    const gridY = Math.round(position.y / this.GRID_SIZE) * this.GRID_SIZE;
    
    const gridPosition = new Vector2(gridX, gridY);
    const distance = position.distance(gridPosition);

    if (distance <= this.SNAP_THRESHOLD) {
      const guidelines: AlignmentGuideline[] = [];
      
      if (canvasBounds) {
        console.log('Canvas bounds:', canvasBounds);
        console.log('Grid position:', gridX, gridY);
        
        // Extend guidelines to full canvas edges with generous margins
        const margin = 2000; // Large margin to ensure lines extend beyond visible area
        const verticalGuideline = {
          type: 'vertical' as const,
          position: gridX,
          start: new Vector2(gridX, -margin),
          end: new Vector2(gridX, canvasBounds.height + margin)
        };
        const horizontalGuideline = {
          type: 'horizontal' as const,
          position: gridY,
          start: new Vector2(-margin, gridY),
          end: new Vector2(canvasBounds.width + margin, gridY)
        };
        
        console.log('Vertical guideline:', verticalGuideline);
        console.log('Horizontal guideline:', horizontalGuideline);
        
        guidelines.push(verticalGuideline);
        guidelines.push(horizontalGuideline);
      } else {
        // Fallback to shorter guidelines if no canvas bounds
        guidelines.push({
          type: 'vertical',
          position: gridX,
          start: new Vector2(gridX, gridY - 50),
          end: new Vector2(gridX, gridY + 50)
        });
        guidelines.push({
          type: 'horizontal',
          position: gridY,
          start: new Vector2(gridX - 50, gridY),
          end: new Vector2(gridX + 50, gridY)
        });
      }
      
      return {
        position: gridPosition,
        snapType: 'grid',
        guidelines
      };
    }

    return {
      position: position,
      snapType: 'none'
    };
  }

  /**
   * Tries to snap to canvas edges with margin
   */
  private static tryEdgeSnap(position: Vector2, canvasBounds: Rect): AlignmentResult {
    console.log('Edge snap - Canvas bounds:', canvasBounds);
    console.log('Edge snap - Position:', position);
    
    const guidelines: AlignmentGuideline[] = [];
    let snapped = false;
    let newX = position.x;
    let newY = position.y;

    // Left edge
    const leftEdge = canvasBounds.x + this.EDGE_MARGIN;
    if (Math.abs(position.x - leftEdge) <= this.SNAP_THRESHOLD) {
      newX = leftEdge;
      snapped = true;
      const margin = 2000;
      guidelines.push({
        type: 'vertical',
        position: leftEdge,
        start: new Vector2(leftEdge, -margin),
        end: new Vector2(leftEdge, canvasBounds.height + margin)
      });
    }

    // Right edge
    const rightEdge = canvasBounds.x + canvasBounds.width - this.EDGE_MARGIN;
    if (Math.abs(position.x - rightEdge) <= this.SNAP_THRESHOLD) {
      newX = rightEdge;
      snapped = true;
      const margin = 2000;
      guidelines.push({
        type: 'vertical',
        position: rightEdge,
        start: new Vector2(rightEdge, -margin),
        end: new Vector2(rightEdge, canvasBounds.height + margin)
      });
    }

    // Top edge
    const topEdge = canvasBounds.y + this.EDGE_MARGIN;
    if (Math.abs(position.y - topEdge) <= this.SNAP_THRESHOLD) {
      newY = topEdge;
      snapped = true;
      const margin = 2000;
      guidelines.push({
        type: 'horizontal',
        position: topEdge,
        start: new Vector2(-margin, topEdge),
        end: new Vector2(canvasBounds.width + margin, topEdge)
      });
    }

    // Bottom edge
    const bottomEdge = canvasBounds.y + canvasBounds.height - this.EDGE_MARGIN;
    if (Math.abs(position.y - bottomEdge) <= this.SNAP_THRESHOLD) {
      newY = bottomEdge;
      snapped = true;
      const margin = 2000;
      guidelines.push({
        type: 'horizontal',
        position: bottomEdge,
        start: new Vector2(-margin, bottomEdge),
        end: new Vector2(canvasBounds.width + margin, bottomEdge)
      });
    }

    if (snapped) {
      return {
        position: new Vector2(newX, newY),
        snapType: 'edge',
        guidelines
      };
    }

    return {
      position: position,
      snapType: 'none'
    };
  }

  /**
   * Gets the grid size for external use (e.g., visual grid display)
   */
  public static getGridSize(): number {
    return this.GRID_SIZE;
  }

  /**
   * Gets the snap threshold for external use
   */
  public static getSnapThreshold(): number {
    return this.SNAP_THRESHOLD;
  }
}