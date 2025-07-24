import { Component, Input } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

@Component({
    selector: 'sim-loading-spinner',
    template: `
        <fa-icon *ngIf='show' [icon]='["fas", "circle-notch"]' [spin]='true'
        [size]='size' [fixedWidth]='true'></fa-icon>
    `,
    styles: [`
        fa-icon {
            position: absolute;
            left: 50%;
            top: 25%;
            transform: translate(-50%, -50%);
        }
    `]
})
export class LoadingSpinnerComponent {
    @Input()
    public show: boolean = false;

    @Input()
    public size: SizeProp = '3x';
}
