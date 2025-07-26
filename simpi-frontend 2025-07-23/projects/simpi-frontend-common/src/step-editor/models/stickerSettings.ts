
export class StickerSettings {

  constructor(appearanceDelayInMilliseconds: number, showPopUpEffect: boolean, actionTargetUrl: string, scaleFactor?: number) {
    this.appearanceDelayInMilliseconds = appearanceDelayInMilliseconds;
    this.showPopUpEffect = showPopUpEffect;
    this.actionTargetUrl = actionTargetUrl;
    this.scaleFactor = scaleFactor ?? 1.0;
  }

  appearanceDelayInMilliseconds: number;
  showPopUpEffect: boolean;
  actionTargetUrl: string;
  scaleFactor: number;
}
