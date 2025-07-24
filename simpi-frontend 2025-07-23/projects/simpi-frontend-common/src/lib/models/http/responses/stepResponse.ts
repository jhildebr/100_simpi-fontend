import { StickerResponse } from './stickerResponse';
import { PortraitIndicatorResponse } from './portraitIndicatorResponse';

export interface StepResponse {
  stepId: string;

  simpiId: string;

  title: string;

  description: string;

  thumbnailId: string;

  positionIndex: number;

  deleted: boolean;

  thumbnailUrl?: string;

  mediaType: string;

  stickers: StickerResponse[];

  schemaVersion: number;

  portraitIndicator: PortraitIndicatorResponse;

  textBackgroundColor: string;

  textPositionY: number;

  voiceOverEnabled: boolean;

  videoId?: string;

  videoUrl?: string;

  audioUrl?: string;
}
