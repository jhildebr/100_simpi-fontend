import { Component } from '@angular/core';
import { TabNavItem } from '../../../shared/models/tabNavItem';

@Component({
    template: `
    <sim-tab-nav [routes]='userRoutes'></sim-tab-nav>
    <router-outlet></router-outlet>
    `
})

export class UsersRoutingComponent {
    public userRoutes: TabNavItem[] = [{ url: './', text: 'Users' }];
}
