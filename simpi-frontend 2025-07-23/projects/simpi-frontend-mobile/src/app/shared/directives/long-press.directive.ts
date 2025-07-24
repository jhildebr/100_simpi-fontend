import { EventEmitter, Directive, OnInit, Output, Input, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { GestureController } from '@ionic/angular';


@Directive({
    selector: '[ion-long-press]'
})
export class LongPressDirective implements AfterViewInit {
    @Output()
    public pressStart: EventEmitter<void> = new EventEmitter<void>();
    @Output()
    public pressEnd: EventEmitter<void> = new EventEmitter<void>();
    @Input("delay")
    public delay: number = 300;
    public action: any;

    private longPressActive: boolean = false;

    constructor(
        private el: ElementRef,
        private gestureCtrl: GestureController,
        private zone: NgZone
    ) { }

    public ngAfterViewInit(): void {
        this.loadLongPressOnElement();
    }

    private loadLongPressOnElement(): void {
        const gesture = this.gestureCtrl.create({
            el: this.el.nativeElement,
            threshold: 0,
            gestureName: 'long-press',
            onStart: ev => {
                this.longPressActive = true;
                this.longPressAction();
            },
            onEnd: ev => {
                this.longPressActive = false;
                this.pressEnd.emit();
            }
        });
        gesture.enable(true);
    }

    private longPressAction(): void {
        if (this.action) {
            clearInterval(this.action);
        }
        this.action = setTimeout(() => {
            this.zone.run(() => {
                if (this.longPressActive === true) {
                    this.longPressActive = false;
                    this.pressStart.emit();
                }
            });
        }, this.delay);
    }
}