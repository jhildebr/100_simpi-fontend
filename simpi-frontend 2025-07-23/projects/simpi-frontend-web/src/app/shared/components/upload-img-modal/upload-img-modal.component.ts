import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadImgModalService, ImageType } from 'projects/simpi-frontend-common/src/lib/services/images/upload-img-modal.service';

@Component({
    selector: 'sim-upload-img-modal',
    templateUrl: './upload-img-modal.component.html',
    styleUrls: ['./upload-img-modal.component.scss']
})
export class UploadImgModalComponent implements OnInit, OnDestroy {

    private _componentActive: boolean = true;

    public pictureUrl: string = null;
    public processing: boolean = false;
    public uploadedImageId: string = null;
    public showUploadBox: boolean = true;

    @Input()
    public modalTitle: string = 'Upload Image';

    @Input()
    public imageType: ImageType;

    @HostListener('window:beforeunload')
    @HostListener('window:pagehide')
    removeImageIfNotSaved(): void {
        if (this.uploadedImageId) {
            this.deleteImageFromServer();
        }
    }

    constructor(public activeModal: NgbActiveModal, private uploadImgModalService: UploadImgModalService) {
    }

    public ngOnInit(): void { }

    public onRemoveUnusedImage(): void {
        this.deleteImageFromServer();
    }

    private uploadPicture(file: any): void {
        this.uploadImgModalService.uploadImageToServer(this.imageType, file)
            .pipe(takeWhile(() => this._componentActive)).subscribe(uploadedImageId => {
                this.uploadedImageId = uploadedImageId;
                this.pictureUrl = this.uploadImgModalService.getImageUrlFromImageId(uploadedImageId, this.imageType);
                this.processing = false;
            });
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
        this.uploadImgModalService.deleteLastUploadedImageFromServer()
            .pipe(takeWhile(() => this._componentActive)).
            subscribe(
                success => {
                    if (success) {
                        this.pictureUrl = null;
                        this.processing = false;
                        this.showUploadBox = true;
                        this.uploadedImageId = null;
                    }
                },
                err => {
                    this.processing = false;
                    console.log(err);
                });
    }


    public ngOnDestroy(): void {
        this._componentActive = false;
    }
}
