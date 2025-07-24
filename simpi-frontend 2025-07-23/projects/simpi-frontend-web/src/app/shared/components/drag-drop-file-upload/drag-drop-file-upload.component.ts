import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sim-drag-drop-file-upload',
    templateUrl: './drag-drop-file-upload.component.html',
    styleUrls: ['./drag-drop-file-upload.component.scss']
})
export class DragAndDropFileUploadComponent {
    public files: File[] = [];
    public uploadedImageId: string;
    public errorMessage: string;

    @Input()
    public allowMultiple: boolean = false;

    @Input()
    public showUploadBox: boolean;

    @Input()
    public allowedMimeTypes: string;

    @Input()
    public title: string = "Upload step media";

    @Input()
    public description: string = "Drag & Drop a video or image here or browse using plus icon.";

    @Output()
    public filesToUpload: EventEmitter<File[]> = new EventEmitter();

    public uploadFile(event: any): void {
        this.errorMessage = '';
        this.files = [];
        for (let file of event) {
            if (!this.isMimeTypeAllowed(file.type)) {
                this.errorMessage = `Files of type ${file.type} are not allowed`;
                return;
            }
            this.files.push(file);
        }

        if (this.files.length > 1 && !!this.allowMultiple) {
            this.errorMessage = 'Only one file allowed';
        }

        if (this.files.length > 0) {
            this.filesToUpload.emit(this.files);
        }
    }

    private isMimeTypeAllowed(type: string) {
        if (!this.allowedMimeTypes) {
            return true;
        } else {
            for (let allowed of this.allowedMimeTypes.split(",")) {
                if (new RegExp(allowed).test(type)) {
                    return true;
                }
            }
        }
        return false;
    }

    public onError(message: string): void {
        this.errorMessage = message;
    }
}
