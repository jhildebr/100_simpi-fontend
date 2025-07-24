import { StickerCollection } from '../../models/sticker-collection';
import { ANIMATION_ROTATE, ANIMATION_TRANSLATE, Sticker, TRANSFORMATION_FLIP_HORIZONTALLY } from '../../models/sticker';
import { StickerPalette } from '../../models/sticker-palette';
import { Vector2 } from '../../../step-editor/models/vector2';
import {
  STICKER_CUSTOM_ANIMATION_ROTATE_LEFT,
  STICKER_CUSTOM_ANIMATION_ROTATE_RIGHT, STICKER_CUSTOM_ANIMATION_TRANSLATE_Y
} from '../../../step-editor/components/common/stickerConfig';

export const WHITE_BUBBLE_STICKER_ID: number = 99;
export const BUBBLE_STICKER_ID: number = 100;
export const MORE_DOTS_STICKER_ID: number = 101;
export const TRASH_STICKER_ID: number = 102;
export const RESOURCE_STICKER_ID: number = 300;
export const MISSING_RESOURCE_STICKER_ID: number = 301;
export const CUSTOM_STICKER_ID: number = 302;
export const HIGHLIGHT_STICKER_ID: number = 8004;

export class SimpiStickerCollection implements StickerCollection {

  stickers: Sticker[] = [
    { id: 1, filepath: 'assets/stickers/fun/01.svg', hasBubble: false },
    { id: 2, filepath: 'assets/stickers/fun/02.svg', hasBubble: false },
    { id: 3, filepath: 'assets/stickers/fun/03.svg', hasBubble: false },
    { id: 4, filepath: 'assets/stickers/fun/04.svg', hasBubble: false },
    { id: 5, filepath: 'assets/stickers/fun/05.svg', hasBubble: false },
    { id: 6, filepath: 'assets/stickers/fun/06.svg', hasBubble: false },
    { id: 7, filepath: 'assets/stickers/fun/07.svg', hasBubble: false },
    { id: 8, filepath: 'assets/stickers/fun/08.svg', hasBubble: false },
    { id: 9, filepath: 'assets/stickers/fun/09.svg', hasBubble: false },
    { id: 10, filepath: 'assets/stickers/fun/10.svg', hasBubble: false },
    { id: 11, filepath: 'assets/stickers/fun/11.svg', hasBubble: false },
    { id: 12, filepath: 'assets/stickers/fun/12.svg', hasBubble: false },
    { id: 13, filepath: 'assets/stickers/fun/13.svg', hasBubble: false },
    { id: 14, filepath: 'assets/stickers/fun/14.svg', hasBubble: false },
    { id: 15, filepath: 'assets/stickers/fun/15.svg', hasBubble: false },
    { id: 16, filepath: 'assets/stickers/fun/16.svg', hasBubble: false },
    { id: 17, filepath: 'assets/stickers/fun/17.svg', hasBubble: false },
    { id: 18, filepath: 'assets/stickers/fun/18.svg', hasBubble: false },
    { id: 19, filepath: 'assets/stickers/fun/19.svg', hasBubble: false },
    { id: 20, filepath: 'assets/stickers/fun/20.svg', hasBubble: false },
    { id: 21, filepath: 'assets/stickers/fun/21.svg', hasBubble: false },
    { id: 22, filepath: 'assets/stickers/fun/22.svg', hasBubble: false },
    { id: 23, filepath: 'assets/stickers/fun/23.svg', hasBubble: false },
    { id: 24, filepath: 'assets/stickers/fun/24.svg', hasBubble: false },
    { id: 25, filepath: 'assets/stickers/fun/25.svg', hasBubble: false },
    { id: 26, filepath: 'assets/stickers/fun/26.svg', hasBubble: false },
    { id: 27, filepath: 'assets/stickers/fun/27.svg', hasBubble: false },
    { id: 28, filepath: 'assets/stickers/fun/28.svg', hasBubble: false },
    { id: WHITE_BUBBLE_STICKER_ID, filepath: 'assets/stickers/bubble_white.svg', hasBubble: false },
    { id: BUBBLE_STICKER_ID, filepath: 'assets/stickers/bubble.svg', hasBubble: false },
    { id: MORE_DOTS_STICKER_ID, filepath: 'assets/stickers/more.svg', hasBubble: false },
    { id: TRASH_STICKER_ID, filepath: 'assets/stickers/trash-outline.svg', hasBubble: false },
    { id: RESOURCE_STICKER_ID, hasBubble: true },
    { id: CUSTOM_STICKER_ID, hasBubble: false },
    { id: MISSING_RESOURCE_STICKER_ID, filepath: 'assets/stickers/missing_resource_info.svg', hasBubble: true },
    { id: 3433, filepath: 'assets/stickers/gestures/3433 - Hand Click I_blank.svg', hasBubble: true },
    { id: 3435, filepath: 'assets/stickers/gestures/3435 - Like_blank.svg', hasBubble: true },
    { id: 3437, filepath: 'assets/stickers/gestures/3437 - Horizontal Scroll_blank.svg', hasBubble: true },
    { id: 3439, filepath: 'assets/stickers/gestures/3439 - Vertical Scroll_blank.svg', hasBubble: true },
    { id: 3443, filepath: 'assets/stickers/gestures/3443 - Swipe Left_blank.svg', hasBubble: true },
    { id: 3444, filepath: 'assets/stickers/gestures/3444 - Swipe Right_blank.svg', hasBubble: true },
    { id: 3447, filepath: 'assets/stickers/gestures/3447 - Tap_blank.svg', hasBubble: true },
    { id: 3454, filepath: 'assets/stickers/gestures/3454 - Tap and Move_blank.svg', hasBubble: true },
    { id: 3459, filepath: 'assets/stickers/gestures/3459 - Password Lock_blank.svg', hasBubble: true },
    { id: 3460, filepath: 'assets/stickers/gestures/3460 - Drag_blank.svg', hasBubble: true },
    { id: 3479, filepath: 'assets/stickers/gestures/3479 - Tilted Hand_blank.svg', hasBubble: true },
    {
      id: 5001,
      filepath: 'assets/stickers/gestures/real-hand/point-1.png',
      hasBubble: false,
      realHand: true,
      supportedAnimations: [ANIMATION_TRANSLATE],
    },
    {
      id: 5002,
      filepath: 'assets/stickers/gestures/real-hand/point-2.png',
      hasBubble: false,
      realHand: true,
      supportedAnimations: [ANIMATION_TRANSLATE],
      opacity: .5,
    },
    {
      id: 5003,
      filepath: 'assets/stickers/gestures/real-hand/point-3.png',
      hasBubble: false,
      realHand: true,
      supportedAnimations: [ANIMATION_TRANSLATE],
      opacity: .8,
    },
    {
      id: 5004,
      filepath: 'assets/stickers/gestures/real-hand/rotate-1.png',
      hasBubble: false,
      realHand: true,
      supportedAnimations: [ANIMATION_ROTATE],
      relativeRotationCenter: new Vector2(0.8, 0.08),
    },
    {
      id: 5005,
      filepath: 'assets/stickers/gestures/real-hand/rotate-2.png',
      hasBubble: false,
      realHand: true,
      supportedAnimations: [ANIMATION_ROTATE],
      opacity: .5,
      relativeRotationCenter: new Vector2(0.8, 0.08),
    },
    {
      id: 5006,
      filepath: 'assets/stickers/gestures/real-hand/rotate-3.png',
      hasBubble: false,
      realHand: true,
      supportedAnimations: [ANIMATION_ROTATE],
      opacity: .8,
      relativeRotationCenter: new Vector2(0.8, 0.08),
    },
    {
      id: 8001,
      filepath: 'assets/stickers/arrows/arrow-circle-right.svg',
      hasBubble: false,
      realHand: false,
      supportedAnimations: [ANIMATION_ROTATE],
      defaultTransformations: [TRANSFORMATION_FLIP_HORIZONTALLY],
      defaultAnimations: { [STICKER_CUSTOM_ANIMATION_ROTATE_LEFT]: '30' },
      relativeRotationCenter: new Vector2(0.3, 0.7)
    },
    {
      id: 8002,
      filepath: 'assets/stickers/arrows/arrow-circle-right.svg',
      hasBubble: false,
      realHand: false,
      supportedAnimations: [ANIMATION_ROTATE],
      defaultAnimations: { [STICKER_CUSTOM_ANIMATION_ROTATE_RIGHT]: '30' },
      relativeRotationCenter: new Vector2(0.7, 0.7)
    },
    {
      id: 8003,
      filepath: 'assets/stickers/arrows/straight.svg',
      hasBubble: false,
      realHand: false,
      supportedAnimations: [ANIMATION_TRANSLATE],
      defaultAnimations: { [STICKER_CUSTOM_ANIMATION_TRANSLATE_Y]: '50' }
    },
    {
      id: HIGHLIGHT_STICKER_ID,
      filepath: 'assets/stickers/arrows/highlight.svg',
      hasBubble: false,
      realHand: false,
    },
    { id: 10200, filepath: 'assets/stickers/02_arrows/webm/arrow iso 1 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10201, filepath: 'assets/stickers/02_arrows/webm/arrow iso 2 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10202, filepath: 'assets/stickers/02_arrows/webm/arrow iso 3 alpha.gif.webm', hasBubble: false, isVideo: true },
    { id: 10203, filepath: 'assets/stickers/02_arrows/webm/arrow iso 4 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10204, filepath: 'assets/stickers/02_arrows/webm/arrow iso 5 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10205, filepath: 'assets/stickers/02_arrows/webm/arrow iso 6 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10206, filepath: 'assets/stickers/02_arrows/webm/arrow iso 7 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10300, filepath: 'assets/stickers/03_callouts/webm/click 1 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10301, filepath: 'assets/stickers/03_callouts/webm/click 2 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10302, filepath: 'assets/stickers/03_callouts/webm/click 3 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10303, filepath: 'assets/stickers/03_callouts/webm/ouch 1 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10304, filepath: 'assets/stickers/03_callouts/webm/ouch 3 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10305, filepath: 'assets/stickers/03_callouts/webm/ouch2 _.webm', hasBubble: false, isVideo: true },
    { id: 10306, filepath: 'assets/stickers/03_callouts/webm/pull _.webm', hasBubble: false, isVideo: true },
    { id: 10307, filepath: 'assets/stickers/03_callouts/webm/push _.webm', hasBubble: false, isVideo: true },
    { id: 10308, filepath: 'assets/stickers/03_callouts/webm/snap1 _.webm', hasBubble: false, isVideo: true },
    { id: 10309, filepath: 'assets/stickers/03_callouts/webm/snap2 _.webm', hasBubble: false, isVideo: true },
    { id: 10400, filepath: 'assets/stickers/04_hands/webm/HAND attention alpha.webm', hasBubble: false, isVideo: true },
    { id: 10401, filepath: 'assets/stickers/04_hands/webm/HAND click 1 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10402, filepath: 'assets/stickers/04_hands/webm/HAND point alpha.webm', hasBubble: false, isVideo: true },
    { id: 10403, filepath: 'assets/stickers/04_hands/webm/HAND ready.webm', hasBubble: false, isVideo: true },
    { id: 10404, filepath: 'assets/stickers/04_hands/webm/HAND side to side alpha.webm', hasBubble: false, isVideo: true },
    { id: 10405, filepath: 'assets/stickers/04_hands/webm/HAND sponge alpha.webm', hasBubble: false, isVideo: true },
    { id: 10406, filepath: 'assets/stickers/04_hands/webm/HAND swipe alpha.webm', hasBubble: false, isVideo: true },
    { id: 10407, filepath: 'assets/stickers/04_hands/webm/HAND take.webm', hasBubble: false, isVideo: true },
    { id: 10408, filepath: 'assets/stickers/04_hands/webm/HAND thumbs up 1 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10409, filepath: 'assets/stickers/04_hands/webm/HAND thumbs up 2 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10410, filepath: 'assets/stickers/04_hands/webm/HAND thumbs up 3 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10411, filepath: 'assets/stickers/04_hands/webm/HAND turn alpha.webm', hasBubble: false, isVideo: true },
    { id: 10412, filepath: 'assets/stickers/04_hands/webm/HAND up alpha.webm', hasBubble: false, isVideo: true },
    { id: 10500, filepath: 'assets/stickers/05_signs/webm/Bottle alpha.webm', hasBubble: false, isVideo: true },
    { id: 10501, filepath: 'assets/stickers/05_signs/webm/Drop crossed alpha.webm', hasBubble: false, isVideo: true },
    { id: 10502, filepath: 'assets/stickers/05_signs/webm/Drops alpha.webm', hasBubble: false, isVideo: true },
    { id: 10503, filepath: 'assets/stickers/05_signs/webm/Shine alpha.webm', hasBubble: false, isVideo: true },
    { id: 10504, filepath: 'assets/stickers/05_signs/webm/Spoons alpha.webm', hasBubble: false, isVideo: true },
    { id: 10505, filepath: 'assets/stickers/05_signs/webm/Spray alpha.webm', hasBubble: false, isVideo: true },
    { id: 10506, filepath: 'assets/stickers/05_signs/webm/Target alpha.gif.webm', hasBubble: false, isVideo: true },
    { id: 10507, filepath: 'assets/stickers/05_signs/webm/Temperatire alpha.webm', hasBubble: false, isVideo: true },
    { id: 10600, filepath: 'assets/stickers/06_stopwatches/webm/clocks1 _.webm', hasBubble: false, isVideo: true },
    { id: 10601, filepath: 'assets/stickers/06_stopwatches/webm/clocks2 _.webm', hasBubble: false, isVideo: true },
    { id: 10602, filepath: 'assets/stickers/06_stopwatches/webm/s-w 1 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10603, filepath: 'assets/stickers/06_stopwatches/webm/s-w 2 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10604, filepath: 'assets/stickers/06_stopwatches/webm/s-w 3 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10605, filepath: 'assets/stickers/06_stopwatches/webm/s-w 4 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10606, filepath: 'assets/stickers/06_stopwatches/webm/s-w 5 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10607, filepath: 'assets/stickers/06_stopwatches/webm/s-w 6 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10608, filepath: 'assets/stickers/06_stopwatches/webm/s-w 7 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10609, filepath: 'assets/stickers/06_stopwatches/webm/s-w 8 alpha.webm', hasBubble: false, isVideo: true },
    { id: 10610, filepath: 'assets/stickers/06_stopwatches/webm/s-w 9 alpha.webm', hasBubble: false, isVideo: true },
  ];

  palettes: StickerPalette[] = [
    {
      displayName: 'Gestures',
      stickerIds: [3433, 3435, 3437, 3439, 3443, 3444, 3447, 3454, 3459, 3460, 3479, 5002, 5003, 5005, 5006]
    },
    {
      displayName: 'Arrows',
      stickerIds: [8001, 8002, 8003, HIGHLIGHT_STICKER_ID, 10200, 10201, 10202, 10203, 10204, 10205, 10206]
    },
    {
      displayName: 'Callouts',
      stickerIds: [10300, 10301, 10302, 10303, 10304, 10305, 10306, 10307, 10308, 10309]
    },
    {
      displayName: 'Hands',
      stickerIds: [10400, 10401, 10402, 10403, 10404, 10405, 10406, 10407, 10408, 10409, 10410, 10411, 10412]
    },
    {
      displayName: 'Signs',
      stickerIds: [10500, 10501, 10502, 10503, 10504, 10505, 10506, 10507]
    },
    {
      displayName: 'Stopwatches',
      stickerIds: [10600, 10601, 10602, 10603, 10604, 10605, 10606, 10607, 10608, 10609, 10610]
    },
  ];

  constructor() {
  }

}
