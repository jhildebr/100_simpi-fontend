import { Directive, Input, ElementRef } from '@angular/core';
import { CdkDropList } from '@angular/cdk/drag-drop';

@Directive({
    selector: '[cdkDropList][scrolldiv]',
})
export class CdkDropListScrolldivDirective {
    @Input('scrolldiv') scrolldiv: string;
    public originalElement: ElementRef<HTMLElement>;

    constructor(cdkDropList: CdkDropList) {
        cdkDropList._dropListRef.beforeStarted.subscribe(() => {
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