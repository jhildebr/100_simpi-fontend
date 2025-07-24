import { CdkDragStart } from "@angular/cdk/drag-drop";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { CustomStickerResponse, SimpiResponse } from "projects/simpi-frontend-common/src/lib/models";
import { CustomStickerService } from "projects/simpi-frontend-common/src/lib/services/custom-stickers/custom-sticker.service";
import { CUSTOM_STICKER_ID } from "projects/simpi-frontend-common/src/lib/services/stickers/simpi-sticker-collection";
import { StickerService } from "projects/simpi-frontend-common/src/lib/services/stickers/sticker.service";
import { Vector2 } from "projects/simpi-frontend-common/src/step-editor/models/vector2";
import { fromEvent, Observable } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { ContextMenuEntry } from "../../../shared/components/context-menu/model/context-menu-entry";


@Component({
    selector: "sim-custom-stickers",
    templateUrl: "./custom-stickers.component.html",
    styleUrls: ["./custom-stickers.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomStickersComponent implements OnInit, OnDestroy {

    public customStickers$: Observable<CustomStickerResponse[]>;
    private _active: boolean;
    private _position: { x: number; y: number };
    private _stickerId: string;
    private _thumbnailId: string;
    private _dragging: boolean;

    @Input()
    public simpi: SimpiResponse;

    public contextMenuEntries: ContextMenuEntry<CustomStickerResponse>[] = [
        // { text: 'Settings', clickHandler: sticker => this.editSticker(sticker), iconUrl: 'assets/svg/edit.svg' },
        { text: 'Delete', clickHandler: sticker => this.deleteSticker(sticker), iconUrl: 'assets/svg/delete.svg' },
    ];

    constructor(
        private customStickerService: CustomStickerService,
        private stickerService: StickerService,
        private cdr: ChangeDetectorRef
    )
    {}

    public ngOnInit(): void {
        this._active = true;
        this.customStickers$ = this.customStickerService.customStickers$;
        this.customStickerService.getCustomStickers().pipe(takeWhile(() => this._active)).subscribe();
    }
    public ngOnDestroy(): void {
        this._active = false;
    }

    public onDragStarted(e: CdkDragStart): void 
    {
        const {stickerId, thumbnailId } = e.source.data;
        this._stickerId = stickerId;
        this._thumbnailId = thumbnailId;
        this._dragging = true;
        fromEvent(document, "mousemove")
        .pipe(takeWhile(() => this._dragging))
        .subscribe(({ x, y }: MouseEvent) => {
            this._position = { x, y };
        });
    }

    public onDragReleased(): void
    {
        this._dragging = false;
        this.cdr.detectChanges();

        if (!this.simpi.resourceIds.includes(this._stickerId)) {
            this.assignStickerToSimpi(this._stickerId);
        }

        this.stickerService.droppedSticker({
            stickerId: CUSTOM_STICKER_ID,
            position: new Vector2(this._position.x, this._position.y),
            actionId: this._stickerId,
            previewImageId: this._thumbnailId
        });
    }

    private deleteSticker(sticker: CustomStickerResponse): void {
        if (sticker)
        {
            this.customStickerService.deleteSticker(sticker.id).pipe(
                takeWhile(() => this._active)
            ).subscribe();
        }
    }

    private editSticker(sticker: CustomStickerResponse): void {
        console.log("edit sticker")
    }

    private assignStickerToSimpi(stickerId: string): void {
      this.customStickerService
        .assignStickerToSimpi(stickerId, this.simpi.simpiId)
        .subscribe();
    }
}