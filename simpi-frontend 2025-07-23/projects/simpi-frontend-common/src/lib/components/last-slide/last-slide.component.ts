import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'sim-last-slide',
    templateUrl: 'last-slide.component.html',
    styleUrls: ['last-slide.component.scss']
})

export class LastSlideComponent implements OnInit {
    public activeEmoji: 'left' | 'middle' | 'right' = undefined;

    @Input()
    public showFeedbackView: boolean = false;

    @Output()
    public emojiClick: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    ngOnInit() { }

    public setActive(position: 'left' | 'middle' | 'right'): void {
        this.activeEmoji = position;
        this.emojiClick.emit();
    }
}