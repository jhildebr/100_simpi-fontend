import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { CreatorPage } from './container/creator-page/creator.page';
import { SanitizeImgPipe } from '../shared/pipes/sanitizeUrl.pipe';
import { SharedModule } from '../shared/shared.module';
import { CreationProgressComponent } from './components/creation-progress/creation-progress.component';
import { StickersComponent } from '../../../../simpi-frontend-common/src/step-editor/components/stickers/stickers.component';
import { StickerTabsComponent } from './components/sticker-tabs/sticker-tabs.component';
import { StepEditorCreatorPageComponent } from './container/step-editor-creator-page/step-editor-creator-page.component';
import { CreateSimpiModalComponent } from './components/create-simpi-modal/create-simpi-modal.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
        ScrollingModule,
        RouterModule.forChild([
            {
                path: '',
                component: CreatorPage
            },
            {
                path: 'step-editor',
                component: StepEditorCreatorPageComponent
            }
        ]),
        SharedModule
    ],
    declarations: [
        CreatorPage,
        SanitizeImgPipe,
        CreationProgressComponent,
        StickersComponent,
        StickerTabsComponent,
        StepEditorCreatorPageComponent,
        CreateSimpiModalComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
        ImagePicker
    ]
})
export class CreatorModule { }
