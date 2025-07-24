import { Vector2 } from './vector2';

export class StickerInfo {
  pos: Vector2;
  time: number;
  type: number;
  hovered: boolean;
  selected: boolean = false;
  rotationAngle: number;
  scaleFactor: number;
  actionId: string;
  actionType: 'resource';
  actionTargetUrl: string;
  previewImageId: string;
  customAnimations: any;
  realHand: boolean;
  supportedAnimations: string[];
  isInTrashArea?: boolean = false;
  isVideo?: boolean = false;
  appearanceDelayInMilliseconds: number;
  showPopUpEffect: boolean;
  editorIsRendered: boolean = false;

  public static areStickerPropertiesEqual(first: StickerInfo, second: StickerInfo): boolean {
    return first.pos.x === second.pos.x &&
      first.pos.y === second.pos.y &&
      first.type === second.type &&
      first.rotationAngle === second.rotationAngle &&
      first.scaleFactor === second.scaleFactor &&
      first.actionId === second.actionId &&
      first.actionType === second.actionType &&
      first.actionTargetUrl === second.actionTargetUrl &&
      first.previewImageId === second.previewImageId &&
      first.realHand === second.realHand &&
      first.isVideo === second.isVideo &&
      first.appearanceDelayInMilliseconds === second.appearanceDelayInMilliseconds &&
      first.showPopUpEffect === second.showPopUpEffect;
  }
}
