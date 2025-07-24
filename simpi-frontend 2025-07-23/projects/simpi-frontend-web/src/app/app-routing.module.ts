import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./shared/components/login/login-page/login-page.component";
import { AuthGuard } from "./shared/auth.guard";
import { BrandAliasResolverComponent } from "./BrandAliasResolverComponent";

const routes: Routes = [
  {
    path: "",
    component: BrandAliasResolverComponent,
    pathMatch: "full",
  },
  {
    path: "at/:customer",
    component: LoginPageComponent,
  },
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: ":brandAlias",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./cockpit/cockpit.module").then((m) => m.CockpitModule),
  },
  {
    path: "player",
    loadChildren: () =>
      import("./webPlayer/webPlayer.module").then((m) => m.WebPlayerModule),
  },
  {
    path: ":brandAlias/product",
    loadChildren: () =>
      import("./products/products.module").then((m) => m.ProductsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: "enabled" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
