import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AnalyticsOverviewPageComponent } from "./container/analytics-overview-page/analytics-overview-page.component";
import { AnalyticsOverviewComponent } from "./components/analytics-overview/analytics-overview.component";
import { analyticsRoutes } from "./analytics.routing";
import { AnalyticsTableComponent } from "./components/analytics-table/analytics-table.component";

@NgModule({
  declarations: [
    AnalyticsOverviewComponent,
    AnalyticsOverviewPageComponent,
    AnalyticsTableComponent,

  ],
  imports: [
    SharedModule,
    RouterModule.forChild(analyticsRoutes),
  ],
  entryComponents: [],
})
export class AnalyticsModule {}
