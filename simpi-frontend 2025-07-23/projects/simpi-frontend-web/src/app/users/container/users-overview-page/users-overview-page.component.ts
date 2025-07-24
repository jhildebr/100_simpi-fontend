import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../../simpi-frontend-common/src/lib/services/users/user.service';

@Component({
    selector: 'sim-users-overview-page',
    template: `
        <sim-users-overview></sim-users-overview>
    `
})

export class UsersOverviewPageComponent implements OnInit {
    constructor(private userService: UserService) { }

    ngOnInit() { }
}