import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Directive({
    selector: '[cancelCdkDrag]'
})
export class CancelCdkDrag implements OnInit, OnDestroy {
    private _$element: HTMLElement;
    private _componentActive: boolean = true;

    constructor(el: ElementRef) {
        this._$element = el.nativeElement;
    }

    private preventDrag($event: Event) {
        $event.cancelBubble = true;
    }

    public ngOnInit(): void {
        fromEvent(this._$element, 'mousedown').pipe(
            takeWhile(() => this._componentActive)
        ).subscribe(event => {
            this.preventDrag(event);
        })
    }

    public ngOnDestroy(): void {
        this._componentActive = false;
    }
}
