import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AuthService } from '../../../../../../simpi-frontend-common/src/lib/services/auth/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { distinctUntilChanged, finalize, skip, switchMap, take, takeWhile } from 'rxjs/operators';
import { UserService } from '../../../../../../simpi-frontend-common/src/lib/services/users/user.service';
import { UpdateUserRequest } from '../../../../../../simpi-frontend-common/src/lib/models/http/requests/updateUserRequest';

@Component({
    selector: 'sim-profile-edit',
    templateUrl: 'profile-edit.component.html',
    styleUrls: ['profile-edit.component.scss']
})

export class ProfileEditComponent implements OnInit, OnDestroy {
    private _componentActive: boolean = true;

    public userForm: FormGroup;

    constructor(private authService: AuthService, private fb: FormBuilder, private host: ElementRef<HTMLElement>,
        private userService: UserService) {
    }

    public ngOnInit(): void {
        this.buildForm();
        this.patchForm();
        this.userService.saveUserInfo$.pipe(
            skip(1),
            takeWhile(() => this._componentActive),
        ).subscribe(() => {
            this.saveUserInfo();
        });
    }


    public saveUserInfo(): void {
        const updateUserRequest: UpdateUserRequest = {
            about: this.userForm.get('about').value,
            forename: this.userForm.get('forename').value,
            surname: this.userForm.get('surname').value,
            eMail: this.userForm.get('eMail').value,
            phoneNumber: this.userForm.get('phoneNumber').value
        };
        this.authService.userInfo$.pipe(
            take(1),
            switchMap(({ id }) => this.userService.updateUserInfo(id, updateUserRequest))
        ).subscribe();
    }

    private buildForm(): void {
        this.userForm = this.fb.group({
            forename: '',
            surname: '',
            eMail: '',
            phoneNumber: '',
            about: ''
        });
    }

    private patchForm(): void {
        this.userService.userAccount$.pipe(
            take(1),
        ).subscribe(({ forename, surname, eMail, phoneNumber, about }) => {
            this.userForm.patchValue({
                forename: forename || '',
                surname: surname || '',
                eMail: eMail || '',
                phoneNumber: phoneNumber || '',
                about: about || ''
            });
        });
    }

    public ngOnDestroy(): void {
        this.host.nativeElement.remove();
        this._componentActive = false;
    }
}
