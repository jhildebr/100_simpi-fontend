import { Route } from "@angular/router";
import { AssetSettingsPageComponent } from "./container/asset-settings-page/asset-settings-page.component";
import { ResourcesOverviewPageComponent } from "./container/resources-overview-page/resources-overview-page.component";
import { ResourcesRoutingComponent } from "./container/resources-routing/resources-routing.component";
// import { SimpisRoutingComponent } from './components/simpis-routing/simpis-routing.component';
// import { DeletedSimpiOverviewPageComponent } from './container/deleted-simpi-overview-page/deleted-simpi-overview-page.component';
// import { SimpiSettingsPageComponent } from './container/simpi-settings-page/simpi-settings-page.component';

export const resourcesRoutes: Route[] = [
  {
    path: "",
    component: ResourcesRoutingComponent,
    children: [
      {
        path: "",
        component: ResourcesOverviewPageComponent,
      },
      {
        path: "deleted",
        component: ResourcesOverviewPageComponent,
      },
    ],
  },
  {
    path: ":assetAlias",
    children: [
      {
        path: "",
        redirectTo: "settings",
        pathMatch: "full",
      },
      {
        path: "settings",
        component: AssetSettingsPageComponent,
      },
    ],
  },
];
