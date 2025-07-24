import { CdkDragStart } from "@angular/cdk/drag-drop";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy,
} from "@angular/core";
import {
  ResourceResponse,
  SimpiResponse,
} from "projects/simpi-frontend-common/src/lib/models";
import { ResourceService } from "projects/simpi-frontend-common/src/lib/services/resources/resource.service";
import { RESOURCE_STICKER_ID } from "projects/simpi-frontend-common/src/lib/services/stickers/simpi-sticker-collection";
import { StickerService } from "projects/simpi-frontend-common/src/lib/services/stickers/sticker.service";
import { fromEvent, Observable } from "rxjs";
import { map, takeWhile } from "rxjs/operators";
import { Vector2 } from "../../../../../../simpi-frontend-common/src/step-editor/models/vector2";

@Component({
  selector: "sim-resource-stickers",
  templateUrl: "./resource-stickers.component.html",
  styleUrls: ["./resource-stickers.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceStickersComponent implements OnInit, OnDestroy {
  private _dragging: boolean = false;
  private _active: boolean;
  private _position: { x: number; y: number };
  private _stickerId: string;
  private _thumbnailId: string;
  public resources$: Observable<ResourceResponse[]>;

  @Input()
  public simpi: SimpiResponse;

  constructor(
    private resourcesService: ResourceService,
    private stickerService: StickerService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this._active = true;
    this.resources$ = this.resourcesService.resources$.pipe(map(res => res && res.filter(r => !r.deleted)));
    this.resourcesService.getResources().pipe(takeWhile(() => this._active)).subscribe();
  }

  public ngOnDestroy(): void {
    this._active = false;
  }

  public onDragStarted(e: CdkDragStart): void {
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

  public onDragReleased(): void {
    this._dragging = false;
    this.cdr.detectChanges();

    if (!this.simpi.resourceIds.includes(this._stickerId)) {
        this.assignResourceToSimpi(this._stickerId);
      }
    this.stickerService.droppedSticker({
        stickerId: RESOURCE_STICKER_ID,
        position: new Vector2(this._position.x, this._position.y),
        actionId: this._stickerId,
        previewImageId: this._thumbnailId
      });
    }

    private assignResourceToSimpi(resourceId: string): void {
      this.resourcesService
        .assignResourceToSimpi(resourceId, this.simpi.simpiId)
        .subscribe();
    }
}
