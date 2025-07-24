import { Vector2 } from '../models/vector2';

export interface ScaleStrategy {
    calculateScaleFactor(canvasDimensions: Vector2, imageDimensions: Vector2): number;

    calculateOffset(canvasDimensions: Vector2, imageDimensions: Vector2): Vector2;
}
