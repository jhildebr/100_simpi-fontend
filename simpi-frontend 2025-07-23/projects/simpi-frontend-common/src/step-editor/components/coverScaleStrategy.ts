import { ScaleStrategy } from './scaleStrategy';
import { Vector2 } from '../models/vector2';

export class CoverScaleStrategy implements ScaleStrategy {
    public calculateScaleFactor(canvasDims: Vector2, imageDims: Vector2): number {
        return Math.max(canvasDims.x / imageDims.x, canvasDims.y / imageDims.y);
    }

    public calculateOffset(canvasDims: Vector2, imageDims: Vector2): Vector2 {
        const scale = this.calculateScaleFactor(canvasDims, imageDims);
        const x = (canvasDims.x / 2) - (imageDims.x / 2) * scale;
        const y = (canvasDims.y / 2) - (imageDims.y / 2) * scale;
        return new Vector2(x, y);
    }
}
