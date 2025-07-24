import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserProfileModel } from '../../models/UserProfile.model';
import { Observable, of } from 'rxjs';

import { AuthService } from '../../../../../../simpi-frontend-common/src/lib/services/auth/auth.service';
import { map, filter, takeWhile, switchMap, take, catchError } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Platform, ViewWillLeave } from '@ionic/angular';
import { UserService } from '../../../../../../simpi-frontend-common/src/lib/services/users/user.service';
import { SegmentTypes } from '../../models/segmentTypes';

@Component({
    templateUrl: 'profile-routing-page.component.html',
    styleUrls: ['profile-routing-page.component.scss']
})

export class ProfileRoutingPageComponent implements OnInit, OnDestroy, ViewWillLeave {
    private _componentActive: boolean = true;

    public userAccount$: Observable<UserProfileModel>;
    public editMode: boolean = false;
    public viewActive: boolean = false;
    public selectedSegment: 'mySimpis' | 'saved' = 'mySimpis';
    public segmentType: typeof SegmentTypes = SegmentTypes;

    @ViewChild('outlet')
    public outlet: any;

    constructor(private authService: AuthService, private router: Router, private platform: Platform, private userService: UserService) {
    }

    public ngOnInit(): void {
        this.authService.userInfo$.pipe(
            take(1),
            switchMap(authInfo => {
                if (authInfo) {
                    return this.userService.getUser(authInfo.id);
                }
                return of(null);
            })
        ).subscribe();

        this.backButtonEvent();
        this.router.events.pipe(
            filter(ev => ev instanceof NavigationEnd),
            takeWhile(() => this._componentActive)
        ).subscribe((ev: NavigationEnd) => {
            const split = ev.urlAfterRedirects.split('/');
            if (split[3] && split[3] === 'edit') {
                this.editMode = true;
            }
        });

        this.authService.getToken().then(token => {
          if (!token) {
            this.router.navigate(['nav', 'profile', 'login'], { replaceUrl: true }).catch(console.error);
          } else {
            this.userAccount$ = this.userService.userAccount$;
          }
        });
    }

    public saveUserInfo(): void {
        this.userService.saveUserInfo();
    }

    public ionViewWillLeave(): void {
        this.editMode = false;
    }

    public navigateToSettings(): void {
        this.router.navigate(['nav', 'profile', 'edit']);
    }

    public navigateToOverview(): void {
        this.editMode = false;
        this.router.navigate(['nav', 'profile', 'overview']);
    }

    public ngOnDestroy(): void {
        this._componentActive = false;
    }

    private backButtonEvent(): void {
        this.platform.backButton.subscribe((p) => {
            if (this.editMode) {
                this.router.navigateByUrl('/hello');
                this.editMode = false;
            }
        });
    }
}
