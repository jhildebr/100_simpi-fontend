import { NgModule } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PlatformModule } from "@angular/cdk/platform";
import { SharedModule } from "./shared/shared.module";
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrandingModule } from "./branding/branding.module";
import { BrandAliasResolverComponent } from "./BrandAliasResolverComponent";
import { APP_BASE_HREF } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { AuthInterceptorProvider } from "projects/simpi-frontend-common/src/lib/interceptors/authInterceptor";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [AppComponent, BrandAliasResolverComponent],
  imports: [
    PlatformModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DragDropModule,
    AppRoutingModule,
    SharedModule,
    BrandingModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    AuthInterceptorProvider,
    Title,
    { provide: APP_BASE_HREF, useValue: "/app" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
