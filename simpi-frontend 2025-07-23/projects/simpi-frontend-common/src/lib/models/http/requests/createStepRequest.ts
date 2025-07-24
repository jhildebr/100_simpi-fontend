import { PortraitIndicatorRequest } from './portraitIndicatorRequest';
import { StickerRequest } from './stickerRequest';

export interface CreateStepRequest {
    stepId?: string;

    simpiId: string;

    title: string;

    description: string;

    thumbnailId: string;

    videoId?: string;

    mediaType: string;

    stickers: StickerRequest[];

    portraitIndicator: PortraitIndicatorRequest;

    textBackgroundColor: string;

    textPositionY: number;

    voiceOverEnabled: boolean;

    insertStepAfterStepId: string | undefined;
}
