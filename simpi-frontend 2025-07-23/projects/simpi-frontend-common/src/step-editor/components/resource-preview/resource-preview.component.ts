import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from "@angular/core";
import { StickerActionPopup } from "../../models/stickerActionPopup";
import {
  ResourceResponse,
  ResourceTypeResponse,
} from '../../../lib/models';
import { ResourceService } from "../../../lib/services/resources/resource.service";
import { Subscription } from "rxjs";

@Component({
  selector: "sim-resource-preview",
  templateUrl: "./resource-preview.component.html",
  styleUrls: ["./resource-preview.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcePreviewComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  private resources: ResourceResponse[];
  private resourceId: string;
  private stickerActionPopupProperties: StickerActionPopup

  public resource: ResourceResponse;
  public resourceTypeEnum = ResourceTypeResponse;

  public clickActionTargetUrl: string = undefined;

  @Input()
  public mobileApp: boolean;

  @Input()
  public set stickerAction(stickerActionPopup: StickerActionPopup) {
    if (stickerActionPopup.actionType === "resource") {
      this.stickerActionPopupProperties = stickerActionPopup;
      this.resourceId = stickerActionPopup.actionId;
      this.resource = this.resources?.find(
        (resource) => resource.resourceId === stickerActionPopup.actionId
      );
      if (this.resource && !this.resource.thumbnailUrl) {
        this.resource.thumbnailUrl = this.resourcesService.getResourceImageUrl(
          stickerActionPopup.previewImageId
        );
      }
      this.setStickerActionTargetUrl();
      this.cdr.markForCheck();
    }
  }

  @Input()
  public set simpiId(simpiId: string) {
    this.subscriptions.push(
      this.resourcesService
        .getResourcesBySimpiId(simpiId)
        .subscribe((resources) => {
          this.resources = resources;
          this.resource = resources?.find(
            (resource) => resource?.resourceId === this.resourceId
          );
          this.setStickerActionTargetUrl();
          this.cdr.markForCheck();
        })
    );
  }

  @Output()
  public onClose: EventEmitter<null> = new EventEmitter<null>();

  @Output()
  public openShoppingLink: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private resourcesService: ResourceService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public close(): void {
    this.onClose.emit();
  }

  private setStickerActionTargetUrl(): void {
    this.clickActionTargetUrl = this.stickerActionPopupProperties?.actionTargetUrl || this.resource?.shoppingLink;

    if (this.clickActionTargetUrl && !this.clickActionTargetUrl.startsWith('http')) {
      // if no protocol is specified, prepend https://
      this.clickActionTargetUrl = 'https://' + this.clickActionTargetUrl;
    }
  }
}
