import { InteractionHost } from '../interactionHost';
import { StickerService } from 'projects/simpi-frontend-common/src/lib/services/stickers/sticker.service';
import { Rect } from '../../models/rect';
import { StickerInfo } from '../../models/stickerInfo';
import { STICKER_WIDTH, STICKER_HEIGHT } from './stickerConfig';

const STICKER_RATIO: number = 0.1 / 60;

export class StickerUtils {

    constructor(private host: InteractionHost, private stickerService: StickerService) { }

    getBubbleBoundingBox(stickerInfo: StickerInfo): Rect {
        const stickerScaleFactor = this.getStickerScaleFactor(stickerInfo);

        return Rect.create(
            Math.floor(stickerInfo.pos.x - (STICKER_WIDTH * stickerScaleFactor / 2) - (15 * stickerScaleFactor)),
            Math.floor(stickerInfo.pos.y - (STICKER_HEIGHT * stickerScaleFactor / 2) - (30 * stickerScaleFactor)),
            STICKER_WIDTH * stickerScaleFactor + (30 * stickerScaleFactor),
            STICKER_HEIGHT * stickerScaleFactor + (40 * stickerScaleFactor)
        );
    }

    /**
     * Like `getStickerImageScaleFactor` but additionally considers the sticker's scale factor (set by the user).
     * @param sticker Sticker that has the `scaleFactor` property (scale factor `1` will be used if not set).
     */
    getStickerScaleFactor(sticker: StickerInfo): number {
        return this.getStickerImageScaleFactor() * (sticker?.scaleFactor || 1);
    }

    /**
     * The number of logical canvas pixels depends on the image resolution (i.e., if an image of size
     * 100px x 100px is drawn on the canvas, the canvas has much fewer pixels than if an image of
     * size 1920px x 1080px is drawn on the canvas, for the same css width and height of the canvas).
     * Therefore, if a shape (e.g., a sticker) should cover a certain area of the image, the
     * spape must be scaled. The scale factor returned by this function should be used for that.
     */
    getStickerImageScaleFactor(): number {
        return STICKER_RATIO * Math.max(this.host.getImageDimensions().x, this.host.getImageDimensions().y);
    }
}
