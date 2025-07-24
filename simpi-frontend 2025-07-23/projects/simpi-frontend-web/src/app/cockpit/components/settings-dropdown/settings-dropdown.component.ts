import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../../simpi-frontend-common/src/lib/services/auth/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsOverviewComponent } from '../../../branding/components/settings-overview/settings-overview.component';
import { UserService } from '../../../../../../simpi-frontend-common/src/lib/services/users/user.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'sim-settings-dropdown',
    templateUrl: './settings-dropdown.component.html',
    styleUrls: ['./settings-dropdown.component.scss'],
    animations: [
        trigger('openClose', [
            state('open', style({
                transform: 'translateY(0)'
            })),
            state('closed', style({
                transform: 'translateY(-100%)'
            })),
            transition('open => closed', [
                animate('0.2s')
            ]),
            transition('closed => open', [
                animate('0.1s')
            ]),
        ]),
    ]
})
export class SettingsDropdownComponent implements OnInit {

    public userName$: Observable<string>;
    dropdownExpanded = false;

    constructor(private authService: AuthService, private modalService: NgbModal, private userService: UserService,
                private router: Router) {
    }

    public ngOnInit(): void {
        this.userName$ = this.authService.userInfo$.pipe(
            switchMap((userInfo) => {
              const id = userInfo?.id; // userInfo is initially null
              if (id) {
                    return this.userService.getUser(id).pipe(
                        switchMap(() => this.userService.userAccount$.pipe(
                            map(({ forename, surname }) => `${forename} ${surname}`)
                        )),
                    );
                } else {
                    return of('Unknown User');
                }
            })
        );

    }

    public openSettingsModal(): void {
        this.dropdownExpanded = false;
        const modalRef = this.modalService.open(SettingsOverviewComponent, {
            size: 'lg'
        });
        modalRef.componentInstance.width = '100%';
    }

  public logoutUser(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login').catch(console.error);
  }
}
