import { NgModule, ModuleWithProviders } from "@angular/core";
import { StepEditorComponent } from "../step-editor/components/step-editor.component";
import { CommonModule } from "@angular/common";
import { COMMON_CONFIG, SimpiCommonConfig } from "./simpi-common-config";
import { ResourcePreviewComponent } from "../step-editor/components/resource-preview/resource-preview.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ColorHueModule } from "ngx-color/hue";
import { OverlayComponent } from "../overlay/overlay.component";
import { ResourceComponent } from "../resource/resource.component";
import { NotAvailableComponent } from "./components/not-available/not-available.component";
import { SimpiTextInputComponent } from "./components/simpi-text-input/simpi-text-input.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LastSlideComponent } from "./components/last-slide/last-slide.component";
import { ProductSettingsComponent } from "./components/product-settings/product-settings.component";
import { SimpiSettingsComponent } from "./components/simpi-settings/simpi-settings.component";
import { AssetSettingsComponent } from "./components/asset-settings/asset-settings.component";
import { TypeAheadComponent } from './components/type-ahead/type-ahead.component';
import { LanguageInputComponent } from './components/language-input/language-input.component';
import { TranslationPanelComponent } from './components/simpi-settings/translation-panel/translation-panel.component';
import { SimSwitchComponent } from "../../../simpi-frontend-web/src/app/shared/components/sim-switch/sim-switch.component"
import { StickerSettingsComponent } from '../step-editor/components/sticker-settings/sticker-settings.component';
import { SimpiCheckboxInputComponent } from './components/simpi-checkbox-input/simpi-checkbox-input.component';

const sharedComponents = [
  StepEditorComponent,
  ResourcePreviewComponent,
  NotAvailableComponent,
  OverlayComponent,
  ResourceComponent,
  SimpiTextInputComponent,
  SimpiCheckboxInputComponent,
  LastSlideComponent,
  ProductSettingsComponent,
  SimpiSettingsComponent,
  AssetSettingsComponent,
  TypeAheadComponent,
  LanguageInputComponent,
  TranslationPanelComponent,
  SimSwitchComponent,
  StickerSettingsComponent,
];

@NgModule({
  declarations: [...sharedComponents],
    imports: [
        CommonModule,
        FontAwesomeModule,
        ColorHueModule,
        ReactiveFormsModule,
        FormsModule
    ],
  exports: [CommonModule, ...sharedComponents],
})
export class SimpiCommonsModule {
  static forRoot(
    conf?: SimpiCommonConfig
  ): ModuleWithProviders<SimpiCommonsModule> {
    return {
      ngModule: SimpiCommonsModule,
      providers: [
        {
          provide: COMMON_CONFIG,
          useValue: conf,
        },
      ],
    };
  }
}
