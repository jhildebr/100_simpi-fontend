import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, UntypedFormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sim-checkbox-input',
  templateUrl: './simpi-checkbox-input.component.html',
  styleUrls: ['./simpi-checkbox-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SimpiCheckboxInputComponent
    }
  ]
})
export class SimpiCheckboxInputComponent implements ControlValueAccessor {

  @ViewChild(FormControlDirective, { static: true })
  private formControlDirective: FormControlDirective;

  @Input()
  public formControl: UntypedFormControl;

  @Input()
  public formControlName: string;

  @Input()
  public label: string = '';

  @Output()
  public change: EventEmitter<void> = new EventEmitter<void>();

  public get control(): UntypedFormControl {
    return this.formControl || (this.controlContainer.control.get(this.formControlName) as UntypedFormControl);
}

  constructor(private controlContainer: ControlContainer) {
  }

  writeValue(obj: any): void {
    this.formControlDirective?.valueAccessor.writeValue(obj);
  }
  registerOnChange(fn: any): void {
    this.formControlDirective?.valueAccessor.registerOnChange(fn);
  }
  registerOnTouched(fn: any): void {
    this.formControlDirective?.valueAccessor.registerOnTouched(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
    this.formControlDirective?.valueAccessor.setDisabledState(isDisabled);
  }

  public onInputChange(): void {
    this.change.emit();
  }
}
