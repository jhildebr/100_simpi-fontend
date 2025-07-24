import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepsRoutingComponent } from './components/steps-routing/steps-routing.component';
import { StepsOverviewComponent } from './components/steps-overview/steps-overview.component';
import { StepsOverviewPageComponent } from './container/steps-overview-page/steps-overview-page.component';
import { SharedModule } from '../shared/shared.module';
import { stepsRoutes } from './steps.routing';
import { DeletedStepsOverviewComponent } from './components/deleted-steps-overview/deleted-steps-orverview.component';
import { DeletedStepsOverviewPageComponent } from './container/deleted-steps-overview-page/deleted-steps-overview-page.component';
import { SelectColorModalComponent } from './components/select-color-modal/select-color-modal.component';
import { StickersComponent } from '../../../../simpi-frontend-common/src/step-editor/components/stickers/stickers.component';
import { StickerPanelComponent } from './components/sticker-panel/sticker-panel.component';
import { ResourceStickersComponent } from './components/resource-stickers/resource-stickers.component';
import { CustomStickersComponent } from './components/custom-stickers/custom-stickers.component';
import { StepPropertiesSidebarComponent } from './components/step-properties-sidebar/step-properties-sidebar.component';
import { StepDetailsComponent } from './components/step-details/step-details.component';
import { DragulaModule } from 'ng2-dragula';
import { StepTextSidebarComponent } from './components/step-text-sidebar/step-text-sidebar.component';
import { ColorHueModule } from 'ngx-color/hue';
import { StepStickerSidebarComponent } from './components/step-sticker-sidebar/step-sticker-sidebar.component';
import { StepVoiceOverSidebarComponent } from './components/step-voice-over-sidebar/step-voice-over-sidebar.component';
import { StepTranslationSidebarComponent } from './components/step-translation-sidebar/step-translation-sidebar.component';
import { StepMediaSidebarComponent } from './components/step-media-sidebar/step-media-sidebar.component';

@NgModule({
  declarations: [
    StepsRoutingComponent,
    StepsOverviewComponent,
    StepsOverviewPageComponent,
    DeletedStepsOverviewComponent,
    DeletedStepsOverviewPageComponent,
    SelectColorModalComponent,
    StickersComponent,
    StickerPanelComponent,
    ResourceStickersComponent,
    CustomStickersComponent,
    StepPropertiesSidebarComponent,
    StepDetailsComponent,
    StepMediaSidebarComponent,
    StepTextSidebarComponent,
    StepTranslationSidebarComponent,
    StepStickerSidebarComponent,
    StepVoiceOverSidebarComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(stepsRoutes),
    DragulaModule,
    ColorHueModule,
  ],
  entryComponents: [
  ]
})
export class StepsModule {
}
