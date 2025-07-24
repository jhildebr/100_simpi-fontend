import { NgModule } from "@angular/core";
import { BrandingPageComponent } from "./container/branding-page/branding-page.component";
import { RouterModule } from "@angular/router";
import { brandingRoutes } from "./branding.routing";
import { SharedModule } from "../shared/shared.module";
import { CorporateColorsComponent } from "./components/corporate-colors/corporate-colors.component";
import { CorporateLogoComponent } from "./components/corporate-logo/corporate-logo.component";
import { SettingsOverviewComponent } from "./components/settings-overview/settings-overview.component";
import { CorporateLanguagesComponent } from "./components/corporate-languages/corporate-languages.component";

@NgModule({
  imports: [RouterModule.forChild(brandingRoutes), SharedModule],
  exports: [],
  declarations: [
    BrandingPageComponent,
    CorporateLogoComponent,
    CorporateLanguagesComponent,
    CorporateColorsComponent,
    SettingsOverviewComponent,
  ],
  entryComponents: [],
  providers: [],
})
export class BrandingModule {}
