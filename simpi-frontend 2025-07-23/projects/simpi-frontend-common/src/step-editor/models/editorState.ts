import { Rect } from './rect';
import { Vector2 } from './vector2';
import { StepPlaybackResponse, StepResponse, StickerResponse } from '../../lib/models';
import { StickerRequest } from '../../lib/models/http/requests/stickerRequest';

export interface StickerState {
  position: Vector2;
  type: number;
  rotationAngle: number;
  scaleFactor: number;
  actionId: string;
  actionType: 'resource' | undefined;
  actionTargetUrl: string;
  previewImageId: string;
  customAnimations: Map<string, string>;
  appearanceDelayInMilliseconds: number;
  showPopUpEffect: boolean;
}

export interface EditorState {
  portraitIndicator?: Rect;
  portraitIndicatorCenter?: Vector2;
  stickers?: StickerState[];
  textPositionY?: number;
  textBackgroundColor?: string;
  textContent?: string;
}

export function editorStateFromStepResponse(stepResponse: StepResponse | StepPlaybackResponse): EditorState {
  if (!stepResponse) {
    return;
  }
  const stickers: StickerState[] = stepResponse.stickers.map(s => {
    return {
      position: new Vector2(s.x, s.y),
      type: s.type,
      rotationAngle: s.rotationAngle,
      scaleFactor: s.scaleFactor,
      actionId: s.actionId,
      actionType: s.actionType,
      actionTargetUrl: s.actionTargetUrl,
      previewImageId: s.previewImageId,
      customAnimations: s.customAnimations,
      appearanceDelayInMilliseconds: s.appearanceDelayInMilliseconds,
      showPopUpEffect: s.showPopUpEffect,
    };
  });

  let editorState: EditorState;

  if (stepResponse.portraitIndicator) {
    if (stepResponse.portraitIndicator.x2 && stepResponse.portraitIndicator.x2 !== 0
      && stepResponse.portraitIndicator.y2 && stepResponse.portraitIndicator.y2 !== 0) {
      const p1 = new Vector2(stepResponse.portraitIndicator.x1, stepResponse.portraitIndicator.y1);
      const p2 = new Vector2(stepResponse.portraitIndicator.x2, stepResponse.portraitIndicator.y2);
      const portraitIndicator = new Rect(p1, p2);
      editorState = {
        portraitIndicator,
        stickers
      };
    } else {
      const portraitIndicatorCenter = new Vector2(stepResponse.portraitIndicator.x1, stepResponse.portraitIndicator.y1);
      editorState = {
        portraitIndicatorCenter,
        stickers
      };
    }
  } else {
    editorState = {
      portraitIndicatorCenter: new Vector2(0.5, 0.5),
      stickers
    }
  }

  editorState.textPositionY = stepResponse.textPositionY;
  editorState.textBackgroundColor = stepResponse.textBackgroundColor;
  editorState.textContent = stepResponse.title;

  return editorState;
}

export function stickerStateToStickerRequest(sticker: StickerState): StickerRequest {
  return {
    actionId: sticker.actionId,
    actionType: sticker.actionType,
    actionTargetUrl: sticker.actionTargetUrl,
    appearanceDelayInMilliseconds: sticker.appearanceDelayInMilliseconds,
    collectionId: '00000000-0000-0000-0000-000000000000',
    customAnimations: sticker.customAnimations,
    rotationAngle: sticker.rotationAngle,
    scaleFactor: sticker.scaleFactor,
    showPopUpEffect: sticker.showPopUpEffect,
    type: sticker.type,
    x: sticker.position.x,
    y: sticker.position.y,
  };
}

export function stickerStateToStickerResponse(sticker: StickerState): StickerResponse {
  return {
    actionId: sticker.actionId,
    actionType: sticker.actionType,
    actionTargetUrl: sticker.actionTargetUrl,
    appearanceDelayInMilliseconds: sticker.appearanceDelayInMilliseconds,
    collectionId: '00000000-0000-0000-0000-000000000000',
    customAnimations: sticker.customAnimations,
    previewImageId: sticker.previewImageId,
    rotationAngle: sticker.rotationAngle,
    scaleFactor: sticker.scaleFactor,
    showPopUpEffect: sticker.showPopUpEffect,
    type: sticker.type,
    x: sticker.position.x,
    y: sticker.position.y,
  };
}


export function copyEditorStateToStepResponse(editorState: EditorState, step: StepResponse): void {
  step.stickers = editorState.stickers.map((sticker: StickerState) => stickerStateToStickerResponse(sticker));

  step.portraitIndicator = {
    x1: editorState.portraitIndicatorCenter.x,
    y1: editorState.portraitIndicatorCenter.y
  };

  step.textBackgroundColor = editorState.textBackgroundColor;
  step.textPositionY = editorState.textPositionY;
  step.title = editorState.textContent;

}
