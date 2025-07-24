import { Route } from "@angular/router";
import { AnalyticsOverviewPageComponent } from "./container/analytics-overview-page/analytics-overview-page.component";
import { ProductSettingsPageComponent } from "../products/container/product-settings-page/product-settings-page.component";

export const analyticsRoutes: Route[] = [
  {
    path: "",
    component: AnalyticsOverviewPageComponent,
  },
  {
    path: "**",
    redirectTo: "/",
  },
  {
    path: ':productAlias/settings',
    pathMatch: 'full',
    component: ProductSettingsPageComponent
  },
];