import { NgModule } from '@angular/core';
import { UsersOverviewPageComponent } from './container/users-overview-page/users-overview-page.component';
import { UsersOverviewComponent } from './components/users-overview/users-overview.component';
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routing';
import { UsersRoutingComponent } from './components/users-routing/users-routing.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [
        RouterModule.forChild(usersRoutes),
        SharedModule
    ],
    declarations: [UsersOverviewPageComponent, UsersOverviewComponent, UsersRoutingComponent],
})
export class UsersModule { }