import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, UntypedFormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'sim-text-input',
    templateUrl: './simpi-text-input.component.html',
    styleUrls: ['./simpi-text-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: SimpiTextInputComponent
        }
    ]
})
export class SimpiTextInputComponent implements ControlValueAccessor {

    @ViewChild(FormControlDirective, { static: true })
    private formControlDirective: FormControlDirective;

    @Input()
    public formControl: UntypedFormControl;

    @Input()
    public formControlName: string;

    @Input()
    public label: string = '';

    @Input()
    public placeholder: string = '';

    @Input()
    public type: string = 'text';

    @Input()
    public textbox: boolean = false;

    @Input()
    public showColorPreview: boolean = false;

    @Input()
    public rows: number = 5;

    @Input()
    public displayValidIndicator: boolean = false;

    @Input()
    public autocomplete: string = undefined;

    @Input()
    public inputmode: string = undefined;

    @Input()
    public placeholderImageSrc: string = undefined;

    @Input()
    public value: string = undefined;

    @Output()
    public blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @Output()
    public change: EventEmitter<void> = new EventEmitter<void>();

    public get control(): UntypedFormControl {
        return this.formControl || (this.controlContainer.control.get(this.formControlName) as UntypedFormControl);
    }

    constructor(private controlContainer: ControlContainer) {
    }

    public registerOnChange(fn: any): void {
        this.formControlDirective?.valueAccessor.registerOnChange(fn);
    }

    public registerOnTouched(fn: any): void {
        this.formControlDirective?.valueAccessor.registerOnTouched(fn);
    }

    public setDisabledState(isDisabled: boolean): void {
        this.formControlDirective?.valueAccessor.setDisabledState(isDisabled);
    }

    public writeValue(obj: any): void {
        this.formControlDirective?.valueAccessor.writeValue(obj);
    }

    public onInputBlur($event: FocusEvent): void {
        this.blur.emit($event);
    }

    public onInputChange($event: any): void {
        this.change.emit($event);
    }
}
