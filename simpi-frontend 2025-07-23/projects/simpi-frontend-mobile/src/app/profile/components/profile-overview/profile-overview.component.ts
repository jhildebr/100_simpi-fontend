import { Component, Input, OnInit } from '@angular/core';
import { DeploymentStateResponse, SimpiResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { UserProfileModel } from '../../models/UserProfile.model';
import { Observable } from 'rxjs';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import { AuthService } from '../../../../../../simpi-frontend-common/src/lib/services/auth/auth.service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { SegmentTypes } from '../../models/segmentTypes';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'sim-profile-overview',
    templateUrl: 'profile-overview.component.html',
    styleUrls: ['profile-overview.component.scss']
})

export class ProfileOverviewComponent implements OnInit {
    public userInfo: UserProfileModel;

    @Input()
    public selectedSegment: 'mySimpis' | 'saved' = 'mySimpis';

    public simpis$: Observable<SimpiResponse[]>;

    public segmentType: typeof SegmentTypes = SegmentTypes;
    public deploymentState: typeof DeploymentStateResponse = DeploymentStateResponse;

    constructor(private simpiService: SimpiService, private authService: AuthService, private navCtrl: NavController) {
    }

    public ngOnInit(): void {
        this.simpis$ = this.authService.userInfo$.pipe(
            switchMap(userInfo => {
                if (userInfo) {
                    return this.simpiService.getSimpisByProductId(environment.mobileCreatedSimpisProductId).pipe(
                        startWith(null),
                        map(simpis => {
                            if (simpis) {
                                return simpis.filter(simpi => !simpi.deleted);
                            } else {
                                return [];
                            }
                        })
                    );
                } else {
                    return [];
                }
            })
        );
    }

    public navigateToSimpi(id: string): void {
        this.navCtrl.navigateForward(`/nav/steps/${id}`);
    }
}
