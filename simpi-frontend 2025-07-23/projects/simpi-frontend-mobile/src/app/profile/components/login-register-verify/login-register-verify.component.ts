import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'sim-login-register-verify',
    templateUrl: './login-register-verify.component.html',
    styleUrls: ['./login-register-verify.component.scss']
})
export class LoginRegisterVerifyComponent {

    public numberOfDigits: number = 7;
    public linkIsDisabled: boolean = false;
    public textIsHidden: boolean = true;

    @Input()
    public formGroup: UntypedFormGroup;

    @Output()
    public onSubmit: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public onResendCode: EventEmitter<void> = new EventEmitter<void>();

    public numbers: number[] = Array(this.numberOfDigits).fill(0).map((x, i) => i);

    public ngOnInit() {
        setTimeout(() => {this.textIsHidden = false}, 1000 * 8);
      }

    public submitForm(): void {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            this.onSubmit.emit();
        }
    }

    public resendCode(): void {
        this.linkIsDisabled = true;
        setTimeout(() => {this.linkIsDisabled = false}, 1000 * 16);
        this.onResendCode.emit();
    }

    public onInputChange(): void {
        if (this.formGroup.valid && this.formGroup.controls.verificationCode.value?.length === this.numberOfDigits) {
            this.onSubmit.emit();
        }
    }
}
