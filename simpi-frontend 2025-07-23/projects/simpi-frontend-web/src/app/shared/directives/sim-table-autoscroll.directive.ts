import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Directive({
    selector: '[cdkDrag][scrolldiv]',
})
export class SimTableAutoscroll {
    @Input('scrolldiv') scrolldiv: string;
    originalElement: ElementRef<HTMLElement>;

    constructor(cdkDrag: CdkDrag) {
        cdkDrag._dragRef.beforeStarted.subscribe(() => {
            var cdkDropList = cdkDrag.dropContainer;
            if (!this.originalElement) {
                this.originalElement = cdkDropList.element;
            }

            if (this.scrolldiv) {
                const element = this.originalElement.nativeElement.closest(this.scrolldiv) as HTMLElement;
                cdkDropList._dropListRef.element = element;
                cdkDropList.element = new ElementRef<HTMLElement>(element);
            } else {
                cdkDropList._dropListRef.element = cdkDropList.element.nativeElement;
                cdkDropList.element = this.originalElement;
            }
        });
    }
}