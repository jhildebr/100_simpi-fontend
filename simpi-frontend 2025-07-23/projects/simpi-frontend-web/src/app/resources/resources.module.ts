import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AssetAddModalComponent } from "./components/asset-add-modal/asset-add-modal.component";
import { CustomStickerAddModalComponent } from "./components/custom-sticker-add-modal/custom-sticker-add-modal.component";
import { AssetsGridComponent } from "./components/assets-grid/assets-grid.component";
import { AssetsTableComponent } from "./components/assets-table/assets-table.component";
import { ResourceDetailSidebarComponent } from "./components/resource-detail-sidebar/resource-detail-sidebar.component";
import { ResourcesOverviewComponent } from "./components/resources-overview/resources-overview.component";
import { AssetSettingsPageComponent } from "./container/asset-settings-page/asset-settings-page.component";
import { ResourcesOverviewPageComponent } from "./container/resources-overview-page/resources-overview-page.component";
import { ResourcesRoutingComponent } from "./container/resources-routing/resources-routing.component";
import { resourcesRoutes } from "./resources.routing";

@NgModule({
  imports: [SharedModule, RouterModule.forChild(resourcesRoutes)],
  exports: [],
  declarations: [
    ResourcesRoutingComponent,
    ResourcesOverviewPageComponent,
    ResourcesOverviewComponent,
    ResourceDetailSidebarComponent,
    AssetsGridComponent,
    AssetsTableComponent,
    AssetSettingsPageComponent,
    AssetAddModalComponent,
    CustomStickerAddModalComponent,
  ],
  providers: [],
})
export class ResourcesModule {}
