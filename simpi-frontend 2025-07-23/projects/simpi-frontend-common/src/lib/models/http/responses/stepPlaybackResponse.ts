import { StickerResponse } from './stickerResponse';
import { PortraitIndicatorResponse } from './portraitIndicatorResponse';
import { MediaResponse } from './mediaResponse';

export interface StepPlaybackResponse {
  stepId: string;
  title: string;
  description: string;
  thumbnail: string;
  voiceOverEnabled: boolean;

  media: MediaResponse[];

  stickers: StickerResponse[];
  portraitIndicator: PortraitIndicatorResponse;
  textBackgroundColor: string;
  textPositionY: number;
  groupName?: string;
}
