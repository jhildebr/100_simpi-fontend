import { Route } from '@angular/router';
import { ProfileRoutingPageComponent } from './container/profile-routing-page/profile-routing-page.component';
import { ProfileOverviewComponent } from './components/profile-overview/profile-overview.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { LoginRegisterComponent } from './container/login-register/login-register.component';

export const profileRoutes: Route[] = [
  {
    path: '',
    component: ProfileRoutingPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: ProfileOverviewComponent,
      },
      {
        path: 'edit',
        component: ProfileEditComponent,
      },
    ]
  },
  {
    path: 'login',
    component: LoginRegisterComponent,
  },
];
