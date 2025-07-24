import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { RouterModule } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { SimpiSliderComponent } from './components/simpi-slider/simpi-slider.component';
import { ActionSheetComponent } from './components/action-sheet/action-sheet.component';
import { SimpiRowDisplayComponent } from './components/simpi-row-display/simpi-row-display.component';
import { AppRefresherComponent } from './components/app-refresher/app-refresher.component';
import { StepsSliderComponent } from './components/steps-slider/steps-slider.component';
import { faClone } from '@fortawesome/free-regular-svg-icons';
import {
    faCertificate, faFont, faCommentAlt, faBars, faPlus, faThList, faThLarge, faExclamationCircle, faTimes,
    faInfoCircle, faShareAlt
} from '@fortawesome/free-solid-svg-icons';
import { SimpiCommonsModule } from '../../../../simpi-frontend-common/src/lib/simpi-frontend-common.module';
import { environment } from '../../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LongPressDirective } from './directives/long-press.directive';
import { IonBottomSheetModule } from 'ion-bottom-sheet';
import { BottomSheetComponent } from './components/simpi-bottom-sheet/bottom-sheet.component';
import { IonicPullupModule } from 'ionic-pullup';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        IonicModule,
        FontAwesomeModule,
        IonBottomSheetModule,
        FormsModule,
        ReactiveFormsModule,
        SimpiCommonsModule.forRoot({
            baseUrl: environment.baseUrl,
            restUrl: environment.restUrl,
            userServiceUrl: environment.userServiceUrl,
            authStorageKey: environment.authStorageKey
        }),
        IonicPullupModule,
    ],
    exports: [
        FontAwesomeModule,
        SimpiSliderComponent,
        ActionSheetComponent,
        SimpiRowDisplayComponent,
        AppRefresherComponent,
        CommonModule,
        SimpiCommonsModule,
        DragDropModule,
        StepsSliderComponent,
        FormsModule,
        ReactiveFormsModule,
        LongPressDirective,
        BottomSheetComponent,
    ],
    declarations: [
        SimpiSliderComponent,
        ActionSheetComponent,
        SimpiRowDisplayComponent,
        AppRefresherComponent,
        StepsSliderComponent,
        LongPressDirective,
        BottomSheetComponent,
    ],
    providers: [],
})
export class SharedModule {
    constructor(private lib: FaIconLibrary) {
        this.lib.addIcons(faCertificate, faFont, faCommentAlt, faBars, faClone, faPlus, faThLarge, faThList, faTimes, faExclamationCircle,
            faInfoCircle, faShareAlt);
    }
}
