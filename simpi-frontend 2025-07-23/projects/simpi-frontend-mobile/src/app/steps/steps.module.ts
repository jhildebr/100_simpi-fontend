import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { stepsRoutes } from './steps.routing';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { StepsPageComponent } from './container/steps-page/steps-page.component';
import { IonicPullupModule } from "ionic-pullup";
import { SimpiCommonsModule } from '../../../../simpi-frontend-common/src/public-api';
@NgModule({
    imports: [
        IonicModule,
        SharedModule,
        RouterModule.forChild(stepsRoutes),
        IonicPullupModule,
        SimpiCommonsModule
    ],
    exports: [],
    declarations: [StepsPageComponent],
    providers: []
})
export class StepsModule { }
