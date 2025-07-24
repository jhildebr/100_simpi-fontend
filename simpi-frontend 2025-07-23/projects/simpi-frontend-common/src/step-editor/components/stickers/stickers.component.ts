import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, NgZone } from '@angular/core';
import { StickerPalette } from 'projects/simpi-frontend-common/src/lib/models/sticker-palette';
import { StickerService } from 'projects/simpi-frontend-common/src/lib/services/stickers/sticker.service';
import { Sticker, TRANSFORMATION_FLIP_HORIZONTALLY } from 'projects/simpi-frontend-common/src/lib/models/sticker';
import { CdkDragStart } from '@angular/cdk/drag-drop';
import { fromEvent } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Vector2 } from '../../models/vector2';

@Component({
  selector: "sim-stickers",
  templateUrl: "./stickers.component.html",
  styleUrls: ["./stickers.component.scss"],
})
export class StickersComponent implements OnInit {
  private _dragging: boolean = false;
  private position: { x: number; y: number };
  private stickerId: number;
  public stickers: Sticker[] = [];

  @Input()
  public set stickerPalette(stickerPalette: StickerPalette) {
    this.stickers = stickerPalette.stickerIds.map((stickerId) => {
      const sticker = this.stickerService.getStickerById(stickerId);
      return {
        id: stickerId,
        filepath: sticker.filepath,
        hasBubble: sticker.hasBubble,
        realHand: sticker.realHand,
        opacity: sticker.opacity,
        defaultTransformations: sticker.defaultTransformations,
        isVideo: sticker.isVideo,
      };
    });
  }

  @Input()
  public mobileApp: boolean = false;

  @Output()
  public onStickerClicked: EventEmitter<Sticker> = new EventEmitter<Sticker>();

  public TRANSFORMATION_FLIP_HORIZONTALLY: string =
    TRANSFORMATION_FLIP_HORIZONTALLY;

  constructor(
    private stickerService: StickerService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
  }

  public onDragStarted(e: CdkDragStart): void {
    this.stickerId = e.source.data.stickerId;
    this._dragging = true;
    fromEvent(document, "mousemove")
      .pipe(takeWhile(() => this._dragging))
      .subscribe(({ x, y }: MouseEvent) => {
        this.position = { x, y };
      });
    fromEvent(document, "touchmove")
      .pipe(takeWhile(() => this._dragging))
      .subscribe(({targetTouches}: TouchEvent) => {
        var lastTouch = targetTouches[targetTouches.length-1];
        this.position = {x: lastTouch.screenX, y: lastTouch.screenY};
      });
  }

  public onDragReleased(): void {
    this._dragging = false;
    this.cdr.detectChanges();
    this.stickerService.droppedSticker({
      stickerId: this.stickerId,
      position: new Vector2(this.position.x, this.position.y),
    });
  }

  public onStickerClick(stickerId: number): void {
    // load clicked sticker again because the list of stickers (this.stickers) comprise only a subset of the sticker properties
    const sticker = this.stickerService.getStickerById(stickerId);
    this.stickerService.addStickerToStep(sticker);
    this.onStickerClicked.emit(sticker);
  }
}
