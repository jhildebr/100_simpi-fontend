import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CdkTableModule } from "@angular/cdk/table";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CustomFaModule } from "./customFa.module";

import { TabNavComponent } from "./components/tab-nav/tab-nav.component";
import { StatusBadgesComponent } from "./components/status-badges/status-badges.component";
import { DragDropFileUploadDirective } from "./directives/drag-drop.directive";
import { DragAndDropFileUploadComponent } from "./components/drag-drop-file-upload/drag-drop-file-upload.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { ColorPickerComponent } from "./components/color-picker/color-picker.component";
import { SimpiCommonsModule } from "../../../../simpi-frontend-common/src/public-api";
import { SimpiTableComponent } from "./components/sim-table/sim-table.component";
import { CancelCdkDrag } from "./directives/sim-cancel-cdk-drag.directive";
import { environment } from "../../environments/environment";
import { CdkDropListScrolldivDirective } from "./directives/drag-drop-autoscroll.directive";
import { SimTableAutoscroll } from "./directives/sim-table-autoscroll.directive";
import { ShareItemModalComponent } from "./components/modals/share-item-modal/share-item-modal.component";
import { CardComponent } from "./components/card/card.component";
// import { ResourcesOverviewPageComponent } from '../resources/container/resources-overview-page/resources-overview-page.component';
// import { ResourceDetailSidebarComponent } from "../resources/components/resource-detail-sidebar/resource-detail-sidebar.component";
// import { ResourcesOverviewComponent } from '../resources/components/resources-overview/resources-overview.component';
import { WebPlayerPageComponent } from "../webPlayer/container/webPlayer-page/webPlayer-page.component";
import { WebplayerComponent } from "../webPlayer/components/webplayer/webplayer.component";
import { PortalModule } from "@angular/cdk/portal";
import { OverlayModule } from "@angular/cdk/overlay";
import { UploadImgModalComponent } from "./components/upload-img-modal/upload-img-modal.component";
import { UploadTranslationModalComponent } from "./components/upload-translation-modal/upload-translation-modal.component";
import { BatchStepUploadModalComponent } from "./components/batch-step-upload-modal/batch-step-upload-modal.component";
import { ResourceTypeTextPipe } from "./pipes/resourceTypeText.pipe";
import { LoginPageComponent } from "./components/login/login-page/login-page.component";
import { AuthGuard } from "./auth.guard";
import { BrandLogoSrcPipe } from "./pipes/brandLogoSrc.pipe";
import { PropertiesComponent } from "../webPlayer/components/properties/properties.component";
import { ImprintComponent } from "../webPlayer/components/imprint/imprint.component";
import { DataProtection } from "../webPlayer/components/data-protection/dataProtection.component";
import { TeleportDirective } from "./directives/teleport.directive";
import { SimContextMenu } from "./components/context-menu/sim-context-menu.component";
import { DeploymentStateIconComponent } from "./components/deployment-state-icon/sim-deployment-state-icon.component";
import { NavigationMenuComponent } from "./components/navigation-menu/navigation-menu.component";
import { DelayDragDirective } from "./directives/delay-drag.directive";
import { PrivacyModalComponent } from './components/modals/privacy-modal/privacy-modal.component';
import { StepSlideComponent } from "../webPlayer/components/step-slide/stepSlide.component";
import { UploadMetadataTranslationModalComponent } from "./components/upload-metadata-translation-modal/upload-metadata-translation-modal.component";


const SHARED_COMPONENTS = [
  TabNavComponent,
  StatusBadgesComponent,
  DragDropFileUploadDirective,
  CdkDropListScrolldivDirective,
  DragAndDropFileUploadComponent,
  LoadingSpinnerComponent,
  LoginPageComponent,
  ColorPickerComponent,
  SimpiTableComponent,
  ShareItemModalComponent,
  PrivacyModalComponent,
  CardComponent,
  // ResourcesOverviewPageComponent,
  // ResourceDetailSidebarComponent,
  // ResourcesOverviewComponent,
  WebPlayerPageComponent,
  WebplayerComponent,
  StepSlideComponent,
  PropertiesComponent,
  ImprintComponent,
  DataProtection,
  UploadImgModalComponent,
  UploadTranslationModalComponent,
  UploadMetadataTranslationModalComponent,
  BatchStepUploadModalComponent,
  ResourceTypeTextPipe,
  BrandLogoSrcPipe,
  TeleportDirective,
  SimContextMenu,
  DeploymentStateIconComponent,
  NavigationMenuComponent,
  DelayDragDirective,
];

@NgModule({
    declarations: [SHARED_COMPONENTS, CancelCdkDrag, SimTableAutoscroll],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CustomFaModule,
        CdkTableModule,
        DragDropModule,
        PortalModule,
        OverlayModule,

        SimpiCommonsModule.forRoot({
            baseUrl: environment.baseUrl,
            restUrl: environment.restUrl,
            userServiceUrl: environment.userServiceUrl,
            authStorageKey: environment.authStorageKey,
        }),
    ],
    exports: [
        CommonModule,
        NgbModule,
        CustomFaModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        DragDropModule,
        CdkTableModule,
        CancelCdkDrag,
        PortalModule,
        OverlayModule,
        SimpiCommonsModule,
        SHARED_COMPONENTS,
    ],
    providers: [
        AuthGuard,
    ]
})
export class SharedModule {}
