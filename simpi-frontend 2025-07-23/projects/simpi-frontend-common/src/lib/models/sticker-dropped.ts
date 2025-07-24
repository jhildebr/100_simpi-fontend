import { Vector2 } from "../../step-editor/models/vector2";

export interface StickerDropped {
    stickerId: number;
    position: Vector2;
    previewImageId?: string;
    actionId?: string;
}