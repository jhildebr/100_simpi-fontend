import { Sticker } from './sticker';
import { StickerPalette } from './sticker-palette';

export interface StickerCollection {
    stickers: Sticker[];
    palettes: StickerPalette[];
}
