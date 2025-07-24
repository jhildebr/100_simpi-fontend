import { StickerRequest } from './stickerRequest';

export class StepChangeRequest {
  title: string;
  description?: string;
  thumbnailId: string;
  videoId?: string;
  mediaType: string;
  stickers: StickerRequest[];
  portraitIndicatorX1: number;
  portraitIndicatorY1: number;
  portraitIndicatorX2?: number;
  portraitIndicatorY2?: number;
  textBackgroundColor: string;
  textPositionY: number;
  voiceOverEnabled: boolean;
}
