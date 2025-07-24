import { Component, Input, ViewChild, ElementRef, ChangeDetectorRef, Optional, Self, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'sim-switch',
  templateUrl: 'sim-switch.component.html',
  styleUrls: ['sim-switch.component.scss']
})
export class SimSwitchComponent implements ControlValueAccessor {
  private onChanged: any = () => {
  };
  private onTouched: any = () => {
  };

  @ViewChild('checkbox', { static: true })
  public checkbox: ElementRef<HTMLInputElement>;

  private _checkedValue: boolean;

  @Input()
  public labelLeft: string;

  @Input()
  public labelRight: string;

  constructor(private cdr: ChangeDetectorRef,
              @Optional()
              @Self()
              public control: NgControl, private renderer: Renderer2) {
    this.control.valueAccessor = this;
  }

  public writeValue(val: any): void {
    this._checkedValue = val;
    this.cdr.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.renderer.setAttribute(this.checkbox.nativeElement, 'disabled', 'true');
    } else {
      this.renderer.removeAttribute(this.checkbox.nativeElement, 'disabled');
    }
  }

  public onBlur(): void {
    this.onTouched();
  }

  public onInputChange(event) {
    const newValue: boolean = event.target.checked;
    if (newValue !== this._checkedValue) {
      this._checkedValue = newValue;
      this.onChanged(this._checkedValue);
    }
  }


  public leftLabelClick(): void {
    if (this.currentValue() && !this.checkbox.nativeElement.disabled) {
      this._checkedValue = false;
      this.onChanged(this._checkedValue);
    }
  }

  public rightLabelClick(): void {
    if (!this.currentValue() && !this.checkbox.nativeElement.disabled) {
      this._checkedValue = true;
      this.onChanged(this._checkedValue);
    }
  }

  private currentValue(): boolean {
    return this.checkbox.nativeElement.checked;
  }

}
