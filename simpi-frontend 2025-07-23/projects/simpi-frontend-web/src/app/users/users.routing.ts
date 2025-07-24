import { Route } from '@angular/router';
import { UsersOverviewPageComponent } from './container/users-overview-page/users-overview-page.component';
import { UsersRoutingComponent } from './components/users-routing/users-routing.component';

export const usersRoutes: Route[] = [
    {
        path: '',
        component: UsersRoutingComponent,
        children: [
            {
                path: '',
                component: UsersOverviewPageComponent
            }
        ]
    }
];