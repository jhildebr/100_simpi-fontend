
export class StickerSettings {

  constructor(appearanceDelayInMilliseconds: number, showPopUpEffect: boolean, actionTargetUrl: string) {
    this.appearanceDelayInMilliseconds = appearanceDelayInMilliseconds;
    this.showPopUpEffect = showPopUpEffect;
    this.actionTargetUrl = actionTargetUrl;
  }

  appearanceDelayInMilliseconds: number;
  showPopUpEffect: boolean;
  actionTargetUrl: string;
}
