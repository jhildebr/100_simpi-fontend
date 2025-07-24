import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../../../simpi-frontend-common/src/lib/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../../../../../../simpi-frontend-common/src/lib/models';
import { catchError, map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'projects/simpi-frontend-common/src/lib/services/customers/customer.service';
import { BrandService } from 'projects/simpi-frontend-common/src/lib/services/brand/brand.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sim-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    private _componentActive: boolean = true;

    public message: string = null;
    public loginForm: FormGroup;
    public loggingIn: boolean = false;

    constructor(
        private authService: AuthService,
        private customerService: CustomerService,
        private brandService: BrandService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal) {
    }

    public ngOnInit(): void {
        this.buildForm();

        this.route.params.subscribe(params => {
            const customerUrl = params['customer'];
            if (customerUrl) {
                this.customerService.getCustomerByUrl(customerUrl).subscribe(customer => {

                });
            }
        });
    }

    private buildForm(): void {
        this.loginForm = this.fb.group({
            eMail: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required]
        });
    }

    public login(): void {
        this.loggingIn = true;
        this.message = null;
        const loginRequest: LoginRequest = this.loginForm.value;
        this.authService.login(loginRequest).pipe(
            switchMap(response => {
                if (response) {
                    return this.brandService.getBrandById(response.homeBrandId).pipe(
                        map(brand => {
                            if (brand) {
                                this.router.navigate([brand.alias]).catch(console.error);
                                this.loggingIn = false;
                            }
                        })
                    )
                }
            }),
            catchError(err => {
                this.loggingIn = false;
                this.message = "Your username and password do not match.";
                return EMPTY;
            }),
            takeWhile(() => this._componentActive)
        ).subscribe();
    }

    public ngOnDestroy(): void {
        this._componentActive = false;
    }
}
