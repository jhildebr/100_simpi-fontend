import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BrandService } from 'projects/simpi-frontend-common/src/lib/services/brand/brand.service';
import { ImageType } from "projects/simpi-frontend-common/src/lib/services/images/upload-img-modal.service";
import { UploadImgModalComponent } from "../../../shared/components/upload-img-modal/upload-img-modal.component";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'sim-corporate-logo',
    templateUrl: './corporate-logo.component.html',
    styleUrls: ['./corporate-logo.component.scss']
})
export class CorporateLogoComponent implements OnInit, OnDestroy {

    public uploadIcon = faCamera;

    @Input()
    public brandForm: FormGroup;

    @Output()
    public closeClicked: EventEmitter<void> = new EventEmitter();

    @Output()
    public logoUploaded: EventEmitter<string> = new EventEmitter();

    public logoImageUrl: string;

    constructor(private modalService: NgbModal, private brandService: BrandService) { }

    ngOnInit(): void {
        this.setLogoImageUrl();
    }
    ngOnDestroy(): void {
        this.closeClicked.emit();
    }

    uploadThumbnailClicked(): void {
        const modalRef = this.modalService.open(UploadImgModalComponent);
        modalRef.componentInstance.imageType = ImageType.CorporateIdentityLogo;
        modalRef.componentInstance.modalTitle = 'Upload Brand Logo';
        modalRef.result.then(result => {
                this.evaluateUploadResult(result);
            },
            () => {
                this.deleteLogo();
            }
        );
    }

    private evaluateUploadResult(result: any): void {
        if (result === 'Cancel click')
        {
            return;
        }

        this.brandForm.patchValue({ logoImageId: result.uploadedImageId });
        this.setLogoImageUrl();
        this.logoUploaded.emit(result.uploadedImageId);
    }

    private deleteLogo(): void {
        this.brandForm.patchValue({ logoImageId: null });
        this.setLogoImageUrl();
    }

    private setLogoImageUrl(): void {
        const logoId: string = this.brandForm.get('logoImageId').value;
        if (logoId) {
            this.logoImageUrl = this.brandService.getLogoImageUrl(logoId);
        } else {
            this.logoImageUrl = null;
        }
    }
}
