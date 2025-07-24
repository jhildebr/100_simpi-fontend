import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SimpisRoutingComponent } from './components/simpis-routing/simpis-routing.component';
import { simpisRoutes } from './simpis.routing';
import { ThumbnailOrColorModalComponent } from './components/thumbnail-or-color-modal/thumbnail-or-color-modal.component';
import { DeletedSimpiOverviewComponent } from './components/deleted-simpi-overview/deleted-simpi-overview.component';
import { DeletedSimpiOverviewPageComponent } from './container/deleted-simpi-overview-page/deleted-simpi-overview-page.component';
import { SimpiSettingsPageComponent } from './container/simpi-settings-page/simpi-settings-page.component';

@NgModule({
  declarations: [
    SimpisRoutingComponent,
    ThumbnailOrColorModalComponent,
    DeletedSimpiOverviewComponent,
    DeletedSimpiOverviewPageComponent,
    SimpiSettingsPageComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(simpisRoutes)
  ],
  entryComponents: []
})
export class SimpisModule {
}
