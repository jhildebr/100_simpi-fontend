import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sim-login-register-input',
  templateUrl: './login-register-input.component.html',
  styleUrls: ['./login-register-input.component.scss']
})
export class LoginRegisterInputComponent {

  private lastSentInput: string = undefined;
  public inputType: string = 'text';
  public inputMode: string = 'email';
  public autocomplete: string = 'tel';
  public inputLabel: string = '';
  public errorText: string = 'The email or phone number is invalid.';

  @Input()
  public formGroup: FormGroup;

  @Output()
  public nextClicked: EventEmitter<void> = new EventEmitter<void>();

  public onSubmit(): void {
    const currentInputValue: string = this.formGroup.controls['phoneNumberOrEmailAddress'].value;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (currentInputValue == this.lastSentInput) {
        console.debug(`Email or phone number ${currentInputValue} has already been sent to backend. Not sending again.`);
      } else {
        this.nextClicked.emit();
        this.lastSentInput = currentInputValue;
      }
    } else {
      this.replaceLeadingZeroWithCountryCodeInPhoneNumber();
    }
  }

  public onInputBlur(): void {
    this.replaceLeadingZeroWithCountryCodeInPhoneNumber();
  }

  private replaceLeadingZeroWithCountryCodeInPhoneNumber(): void {
    let value = this.formGroup.controls['phoneNumberOrEmailAddress'].value;
    if (value) {
      value = value.replace(' ', '');
      if (value.match('^0[0-9]*$')) {
        value = '+49' + value.substr(1);
      }
      this.formGroup.controls['phoneNumberOrEmailAddress'].patchValue(value);
    }
  }

  public onInputChange(): void {
    const value = this.formGroup.controls['phoneNumberOrEmailAddress'].value;
    if (value && value.length > 3) {
      if (value.match('^[0|\+]{1}[0-9 ]{3,}$')) {
        this.userIsTypingPhoneNumber();
        if (value.match('^0[0-9]{3,}$')) {
          this.formGroup.controls['phoneNumberOrEmailAddress'].patchValue('+49' + value.substr(1));
        }
      } else {
        this.userIsTypingEmailAddress();
      }
    } else {
      this.userIsTypingUnknownText();
    }
  }

  private userIsTypingEmailAddress(): void {
    this.inputType = 'email';
    this.inputLabel = 'Email';
    this.inputMode = 'email';
    this.autocomplete = 'email';
    this.errorText = 'The email address is invalid.';
  }

  private userIsTypingPhoneNumber(): void {
    this.inputType = 'tel';
    this.inputLabel = 'Phone number';
    this.inputMode = 'tel';
    this.autocomplete = 'tel';
    this.errorText = 'The phone number is invalid.';
  }

  private userIsTypingUnknownText(): void {
    this.inputType = 'text';
    this.inputLabel = 'Phone number or email address';
    this.inputMode = 'email';
    this.autocomplete = 'tel';
    this.errorText = 'The email or phone number is invalid.';
  }
}
