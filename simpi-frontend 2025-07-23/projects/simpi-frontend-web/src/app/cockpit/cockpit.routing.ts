import { Route } from "@angular/router";
import { CockpitPageComponent } from "./container/cockpit-page/cockpit-page.component";
//import { DashboardComponent } from './components/dashboard/dashboard.component';

export const cockpitRoutes: Route[] = [
  {
    path: "",
    redirectTo: "cockpit",
    pathMatch: "full",
  },
  {
    path: "cockpit",
    component: CockpitPageComponent,
    children: [
      { path: "", redirectTo: "products", pathMatch: "full" },
      // {
      //     path: 'dashboard',
      //     component: DashboardComponent
      // },
      {
        path: "assets",
        loadChildren: () =>
          import("../resources/resources.module").then(
            (m) => m.ResourcesModule
          ),
      },
      {
        path: "products",
        loadChildren: () =>
          import("../products/products.module").then((m) => m.ProductsModule),
      },
      {
        path: "analytics",
        loadChildren: () =>
          import("../analytics/analytics.module").then((m) => m.AnalyticsModule),
      },
      {
        path: "users",
        loadChildren: () =>
          import("../users/users.module").then((m) => m.UsersModule),
      },
      {
        path: "settings",
        loadChildren: () =>
          import("../branding/branding.module").then((m) => m.BrandingModule),
      },
    ],
  },
];
