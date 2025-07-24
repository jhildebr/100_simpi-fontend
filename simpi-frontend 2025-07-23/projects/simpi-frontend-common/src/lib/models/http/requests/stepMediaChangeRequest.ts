import { StepMedia } from '../../step-media/StepMedia';

export class StepMediaChangeRequest {
  mediaType: string;
  thumbnailId: string;
  videoId?: string;

  static fromStepMedia(stepMedia: StepMedia): StepMediaChangeRequest {
    return {
      mediaType: stepMedia.mediaType,
      thumbnailId: stepMedia.thumbnailId,
      videoId: stepMedia.videoId,
    };
  }
}
