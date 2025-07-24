import { Route } from '@angular/router';
import { WebPlayerPageComponent } from './container/webPlayer-page/webPlayer-page.component';

export const webPlayerRoutes: Route[] = [
    {
        path: ':simpiAlias',
        component: WebPlayerPageComponent
    }
];