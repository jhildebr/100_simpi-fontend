import { Directive, Output, EventEmitter, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[dragDrop]'
})
export class DragDropFileUploadDirective {
    @HostBinding('style.background-color') public background = '#f5fcff'
    @HostBinding('style.opacity') public opacity = '1'

    @HostListener('dragover', ['$event'])
    public onDragOver(evt): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#9ecbec';
        this.opacity = '0.8'
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave(evt): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f5fcff'
        this.opacity = '1'
    }

    @HostListener('drop', ['$event'])
    public ondrop(evt): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f5fcff'
        this.opacity = '1'
        let files = evt.dataTransfer.files;
        if (files.length > 0) {
            if (!this.allowMultiple && files.length > 1) {
                this.onError.emit('Only 1 file allowed');
            } else {
                this.onFileDropped.emit(files)
            }
        }
    }

    @Input()
    public allowMultiple: boolean;

    @Output()
    public onFileDropped = new EventEmitter<any>();

    @Output()
    public onError = new EventEmitter<string>();

}
