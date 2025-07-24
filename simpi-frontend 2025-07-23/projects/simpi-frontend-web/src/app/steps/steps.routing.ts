import { Route } from "@angular/router";
import { StepsRoutingComponent } from "./components/steps-routing/steps-routing.component";
import { StepsOverviewPageComponent } from "./container/steps-overview-page/steps-overview-page.component";
import { DeletedStepsOverviewPageComponent } from "./container/deleted-steps-overview-page/deleted-steps-overview-page.component";
// import { ResourcesOverviewPageComponent } from '../resources/container/resources-overview-page/resources-overview-page.component';

export const stepsRoutes: Route[] = [
  {
    path: "",
    component: StepsRoutingComponent,
    children: [
      {
        path: "",
        redirectTo: "steps",
        pathMatch: "full",
      },
      {
        path: "steps",
        component: StepsOverviewPageComponent,
      },
      {
        path: "deleted",
        component: DeletedStepsOverviewPageComponent,
      },
      // {
      //     path: 'resources',
      //     component: ResourcesOverviewPageComponent
      // }
    ],
  },
];
