import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ResourceResponse } from "../../../../../../simpi-frontend-common/src/public-api";
import { ContextMenuEntry } from "../../../shared/components/context-menu/model/context-menu-entry";

@Component({
  selector: "sim-assets-grid",
  templateUrl: "assets-grid.component.html",
  styleUrls: ["assets-grid.component.scss"],
})
export class AssetsGridComponent implements OnInit {
  @Input()
  public assets: ResourceResponse[];

  @Output()
  public showAssetSettings: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public deleteAsset: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public restoreAsset: EventEmitter<string> = new EventEmitter<string>();

  public contextMenuEntries: ContextMenuEntry<ResourceResponse>[] = [
    {
      text: "Edit",
      clickHandler: (asset) => this.showAssetSettings.emit(asset.alias),
      iconUrl: "assets/svg/edit.svg",
    },
    {
      text: "Delete",
      clickHandler: (asset) => this.deleteAsset.emit(asset.resourceId),
      iconUrl: "assets/svg/delete.svg",
    },
  ];
  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    const isDeleteView = this.route.snapshot.url.length > 0;
    if (isDeleteView) {
      this.contextMenuEntries.length = 1;
      this.contextMenuEntries.push({
        text: "Restore",
        clickHandler: (asset) => this.restoreAsset.emit(asset.resourceId),
        iconUrl: "assets/svg/restore.svg",
      });
    }
  }
}
