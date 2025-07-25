import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CockpitPageComponent } from './container/cockpit-page/cockpit-page.component';
import { cockpitRoutes } from './cockpit.routing';
import { SharedModule } from '../shared/shared.module';
import { SettingsDropdownComponent } from './components/settings-dropdown/settings-dropdown.component';

@NgModule({
  declarations: [
    CockpitPageComponent,
    SettingsDropdownComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(cockpitRoutes)
  ]
})
export class CockpitModule {
}
