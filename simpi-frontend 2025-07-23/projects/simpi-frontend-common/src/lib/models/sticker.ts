import { Vector2 } from '../../step-editor/models/vector2';

export interface Sticker {
  id: number;
  filepath?: string;
  hasBubble: boolean;
  actionId?: string;
  actionType?: 'resource';
  previewImageId?: string;
  realHand?: boolean;
  supportedAnimations?: string[];
  opacity?: number;
  relativeRotationCenter?: Vector2; // relative to sticker image, (0,0) is top left, (1,1) is bottom right, and (0.5, 0.5) is sticker center
  defaultTransformations?: string[];
  defaultAnimations?: any;
  isVideo?: boolean;
  preloadStickerInPlayer?: boolean;
}

export const ANIMATION_ROTATE: string = 'rotate';
export const ANIMATION_TRANSLATE: string = 'translate';

export const TRANSFORMATION_FLIP_HORIZONTALLY: string = 'flip_horizontally';
