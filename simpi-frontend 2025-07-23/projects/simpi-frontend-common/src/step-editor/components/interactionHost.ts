import { Vector2 } from '../models/vector2';
import { Rect } from '../models/rect';
import {StickerActionPopup} from '../models/stickerActionPopup';
import { EditorPanelType } from '../../lib/models/editor-panel-type';
import { SimpiContextService } from '../../lib/services/simpi-context/simpi-context.service';
import { StickerInfo } from '../models/stickerInfo';

export interface InteractionHost {

    readonly: boolean;

    isDebugMode: boolean;

    editModeEnabled: boolean;

    mobileApp: boolean;

    visiblePanel: EditorPanelType;

    relativeToImage(vec: Vector2): Vector2;

    getBounds(): Rect;

    getSimpiContext(): SimpiContextService;

    getImageDimensions(): Vector2;

    getUnprojectedImageDimensions(): Vector2;

    projectPoint(v: Vector2): Vector2;

    projectDimensions(v: Vector2): Vector2;

    getImageToCanvasScaleFactor(): number;

    setCursor(cssCursor: string): void;

    setProperty(key: string, value: any): void;

    getProperty(key: string, defaultValue?: any): any;

    playMedia(): void;

    showStickerActionPopup(stickerActionPopup: StickerActionPopup): void;

    showStickerSettingsPopup(stickerInfo: StickerInfo, settingsControlCenterPoint: Vector2): void;

    toggleStickerEditMode(active: boolean): void;

    toggleTextEditMode(enable: boolean): void;
}
