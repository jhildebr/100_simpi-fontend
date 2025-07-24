import { NgModule } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';
import { RouterModule } from '@angular/router';
import { webPlayerRoutes } from './webPlayer.routing';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    RouterModule.forChild(webPlayerRoutes),
    PlatformModule,
    SharedModule,
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class WebPlayerModule {
}
