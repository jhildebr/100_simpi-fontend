import { Route } from '@angular/router';
import { StepsPageComponent } from './container/steps-page/steps-page.component';

export const stepsRoutes: Route[] = [
    {
        path: ':simpiId',
        component: StepsPageComponent
    }
];