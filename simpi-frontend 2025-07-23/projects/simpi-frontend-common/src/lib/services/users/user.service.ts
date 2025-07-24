import { Injectable, Inject } from '@angular/core';
import { RestService } from '../base/rest.service';
import { COMMON_CONFIG, SimpiCommonConfig } from '../../simpi-common-config';
import { BehaviorSubject, EMPTY, Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UpdateUserRequest } from '../../models/http/requests/updateUserRequest';
import { catchError, map, tap } from 'rxjs/operators';
import { UserProfileModel } from '../../../../../simpi-frontend-mobile/src/app/profile/models/UserProfile.model';

@Injectable({ providedIn: 'root' })
export class UserService extends RestService {
    private userServiceUrl: string;
    private _userAccount: BehaviorSubject<UserProfileModel> = new BehaviorSubject<UserProfileModel>(null);
    public userAccount$: Observable<UserProfileModel>;

    private _saveUserInfo: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
    public saveUserInfo$: Observable<void> = this._saveUserInfo.asObservable();

    constructor(@Inject(COMMON_CONFIG) private config: SimpiCommonConfig, private http: HttpClient) {
        super(config);
        this.userServiceUrl = config.userServiceUrl;
        this.userAccount$ = this._userAccount.asObservable();
    }

    public getUser(userId: string): Observable<void> {
        const url = `${this.userServiceUrl}/api/v1/users/${userId}`
        return this.http.get<UserProfileModel>(url, { headers: this.headers }).pipe(
            map(userAccount => this._userAccount.next(userAccount))
        );
    }

    public updateUserInfo(userId: string, updateUserRequest: UpdateUserRequest): Observable<boolean> {
        const url = `${this.userServiceUrl}/api/v1/users/${userId}`
        return this.http.put<HttpResponse<any>>(url, updateUserRequest, { headers: this.headers, observe: 'response' }).pipe(
            map(({ status }) => {
                if (status === 204) {
                    const { customerId, eMail, homeBrandId, id, phoneNumber } = this._userAccount.getValue();
                    this._userAccount.next({
                        about: updateUserRequest.about,
                        forename: updateUserRequest.forename,
                        surname: updateUserRequest.surname,
                        customerId,
                        eMail,
                        homeBrandId,
                        id,
                        phoneNumber
                    });
                    return true;
                }
                return false;
            }),
            catchError(err => of(false))
        );
    }

    public saveUserInfo(): void {
        this._saveUserInfo.next();
    }
}
