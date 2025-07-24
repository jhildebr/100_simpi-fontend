import { Route } from "@angular/router";
import { BrandingPageComponent } from "./container/branding-page/branding-page.component";

export const brandingRoutes: Route[] = [
    {
        path: '',
        component: BrandingPageComponent,
        children: []
    }
];