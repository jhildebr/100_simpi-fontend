import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../simpi-frontend-common/src/lib/services/auth/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { ProductService } from '../../../../../../simpi-frontend-common/src/lib/services';
import { StorageService } from '../../../../../../simpi-frontend-common/src/lib/services/storage/storage.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'sim-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  public showLoginRegisterInputComponent: boolean = true;
  public showLoginRegisterVerifyComponent: boolean = false;
  public loginRegisterForm: FormGroup;
  public verifyForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private alertController: AlertController,
              private productService: ProductService) {
  }

  public ngOnInit(): void {
    this.buildLoginRegisterForm();
    this.buildVerifyForm();
  }

  private buildLoginRegisterForm(): void {
    const emailOrPhonePattern = '(^\\+[1-9]\\d{1,14}$)|(^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$)';
    this.loginRegisterForm = this.fb.group({
      phoneNumberOrEmailAddress: ['', [Validators.required, Validators.pattern(emailOrPhonePattern)]]
    });
  }

  private buildVerifyForm(): void {
    this.verifyForm = this.fb.group({
      verificationCode: ['', [Validators.required, Validators.pattern('^\\d+$')]]
    });
  }

  public loginRegisterInputSubmitted(): void {
    if (this.loginRegisterForm.valid) {
      this.authService.sendVerificationCodeToUser({ eMailOrPhone: this.loginRegisterForm.controls.phoneNumberOrEmailAddress.value })
        .subscribe(success => {
          if (success) {
            this.showLoginRegisterInputComponent = false;
            this.showLoginRegisterVerifyComponent = true;
          } else {
            this.presentAlert('Code could not be sent', 'Please check your email address or phone number.').catch(console.error);
          }
        }, error => {
          this.presentAlert('Code could not be sent', this.getErrorDetails(error)).catch(console.error);
        });
    }
  }

  public verifySubmitted(): void {
    if (this.verifyForm.valid && this.loginRegisterForm.valid) {
      this.authService.verifyCodeToLogIn({
        eMailOrPhone: this.loginRegisterForm.controls.phoneNumberOrEmailAddress.value,
        code: this.verifyForm.controls.verificationCode.value,
      })
        .subscribe(loginResponse => {
          if (loginResponse) {
            StorageService.retrieve(environment.authStorageKey)
              .then(userInfoJson => {
                const brandId = (JSON.parse(userInfoJson) as LoginResponse)?.homeBrandId;
                this.presentAlert('Welcome to SIMPI', 'You successfully signed in').catch(console.error);
                this.productService.getProducts(brandId, false, true).subscribe();
                this.router.navigate(['nav', 'profile'], { replaceUrl: true }).catch(console.error);
              });
          }
        }, error => {
          if (error?.status === 401) {
            this.presentAlert('Invalid Code', 'Please try again.').catch(console.error);
          } else {
            this.presentAlert('Error validating code', this.getErrorDetails(error)).catch(console.error);
          }
        });
    }
  }

  public resendVerificationCode(): void {
    this.authService.sendVerificationCodeToUser({ eMailOrPhone: this.loginRegisterForm.controls.phoneNumberOrEmailAddress.value })
      .subscribe({
        error: error => {
          this.presentAlert('Code could not be re-sent', this.getErrorDetails(error)).catch(console.error);
        }
      });
  }

  private getErrorDetails(error): string {
    if (error) {
      return error.error || JSON.stringify(error);
    }
  }

  public closeLoginDialog(): void {
    this.router.navigate(['nav', 'home'], { replaceUrl: true }).catch(console.error);
  }

  public showLoginRegisterInput(): void {
    this.showLoginRegisterInputComponent = true;
    this.showLoginRegisterVerifyComponent = false;
  }

  private async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
