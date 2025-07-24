import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sim-color-picker',
    template: `
        <div class="color-picker">
            <div class="summary-info">
                <div class="info">
                <p class="style">{{ heading }}</p>
                <p class="style-value">
                    {{ (color === null ? "Choose a color" : color) }}
                </p>
            </div>
            <div *ngIf='color !== null' class="square" [ngStyle]="{'background': color}"></div>
        </div>
        <div *ngIf="show" class="opened">
            <div class="colors">
                <div (click)="changeColor(paint)" *ngFor="let paint of defaultColors" class="square"
                    [ngStyle]="{'background': paint}"></div>
                </div>
                <div class="hex-code">
                    <p>Custom Color (Hex Code)</p>
                    <div class="g-input">
                        <input type="text" maxlength="7" [value]="color"
                            (keyup)="changeColorManual(paintInput.value)"
                            #paintInput placeholder="e.g. #000000" />
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['color-picker.component.scss']
})
export class ColorPickerComponent {
    public show = true;

    @Input()
    public heading: string;

    @Input()
    public color: string;

    @Output()
    public selectColor: EventEmitter<string> = new EventEmitter<string>();

    public defaultColors: string[] = [
        '#000105',
        '#3e6158',
        '#3f7a89',
        '#96c582',
        '#b7d5c4',
        '#bcd6e7',
        '#7c90c1',
        '#9d8594',
        '#dad0d8',
        '#4b4fce',
        '#4e0a77',
        '#a367b5',
        '#ee3e6d',
        '#d63d62',
        '#c6a670',
        '#f46600',
        '#cf0500',
        '#efabbd',
        '#8e0622',
        '#f0b89a',
        '#f0ca68',
        '#62382f',
        '#c97545',
        '#c1800b'
    ];

    public changeColor(color: string): void {
        this.color = color;
        this.selectColor.emit(this.color);
    }

    public changeColorManual(color: string): void {
        const isValid = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);

        if (isValid) {
            this.color = color;
            this.selectColor.emit(this.color);
        }
    }
}
