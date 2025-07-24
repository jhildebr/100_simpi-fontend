export interface StickerRequest {
  x: number;
  y: number;
  type: number;
  collectionId: string;
  rotationAngle: number;
  scaleFactor: number;
  actionId: string;
  actionType: 'resource' | undefined;
  actionTargetUrl: string;
  customAnimations: Map<string, string>;
  appearanceDelayInMilliseconds: number;
  showPopUpEffect: boolean;
}
