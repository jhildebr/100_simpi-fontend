import { Component, Input, OnDestroy, HostListener } from '@angular/core';
import { takeWhile, tap } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';

@Component({
    selector: 'sim-thumbnail-or-color-modal',
    templateUrl: './thumbnail-or-color-modal.component.html',
    styleUrls: ['./thumbnail-or-color-modal.component.scss'],
    host: { 'window:beforeunload': 'deleteImagesIfUnsaved' }
})
export class ThumbnailOrColorModalComponent implements OnDestroy {
    private _componentActive: boolean = true;

    public imageOrColor = 'image';
    public selectedColor: string = null;
    public pictureUrl: string = null;
    public processing: boolean = false;
    public uploadedImageId: string = null;
    public showUploadBox: boolean = true;

    @HostListener('window:beforeunload')
    @HostListener('window:pagehide')
    removeImageIfNotSaved(): void {
        if (this.uploadedImageId) {
            this.deleteImageFromServer();
        }
    }

    @Input()
    public simpiId: string;

    constructor(public activeModal: NgbActiveModal, private simpiService: SimpiService) {
    }

    public onRemoveUnusedImage(): void {
        this.deleteImageFromServer();
    }

    private uploadPicture(file: File): void {
        this.pictureUrl = null;
        this.processing = true;

        this.simpiService.uploadThumbnail(file)
            .pipe(
                tap(uploadedImageId => {
                    this.uploadedImageId = uploadedImageId;
                    if (this.uploadedImageId) {
                        this.pictureUrl = this.simpiService.getThumbnailUrl(this.uploadedImageId);
                        this.processing = false;
                    }
                }),
                takeWhile(() => this._componentActive)
            )
            .subscribe();
    }

    public onSelectColor(color: string): void {
        this.selectedColor = color;
    }

    public onChangeImageOrColor(type: string): void {
        if (type === "color") {
            this.imageOrColor = "color";
            this.deleteImageFromServer();
        }
        if (type === "image") {
            this.imageOrColor = "image";
            this.selectedColor = null;
        }
    }

    public onFilesToUploadReceived(e: any[]): void {
        if (e.length) {
            this.showUploadBox = !this.showUploadBox;
            this.processing = true;
            this.uploadPicture(e[0]);
        }
    }

    public removeAddedPicture(): void {
        this.processing = true;
        this.deleteImageFromServer();
    }

    public dismissModal(): void {
        this.deleteImageFromServer();
        this.activeModal.dismiss('Cross click');
    }

    public closeModal(): void {
        this.deleteImageFromServer();
        this.activeModal.close('Cancel click');
    }

    public deleteImageFromServer(): void {
        if (this.uploadedImageId) {
            this.simpiService.removeThumbnail(this.uploadedImageId)
                .pipe(
                    tap(resp => {
                        if (resp.status === 204) {
                            this.pictureUrl = null;
                            this.processing = false;
                            this.showUploadBox = true;
                            this.uploadedImageId = null;
                        }
                    },
                        err => {
                            this.processing = false;
                            console.log(err);
                        }),
                    takeWhile(() => this._componentActive),
                )
                .subscribe();
        }
    }

    public ngOnDestroy(): void {
        this._componentActive = false;
    }
}
