import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ImageType } from "projects/simpi-frontend-common/src/lib/services/images/upload-img-modal.service";
import { UploadImgModalComponent } from "../../../shared/components/upload-img-modal/upload-img-modal.component";


@Component({
    selector: "sim-custom-sticker-add-modal",
    templateUrl: "custom-sticker-add-modal.component.html",
    styleUrls: ["custom-sticker-add-modal.component.scss"],
})
export class CustomStickerAddModalComponent implements OnInit {
    public createCustomStickerForm: FormGroup;
    public showUploadBox: boolean = true;
    public thumbnailUrl: string | null = null;

    constructor(
        public activeModal:NgbActiveModal,
        private fb: FormBuilder,
        private modalService: NgbModal,
    ) {}

    public changeAssetThumbnail(): void {
        const modalRef = this.modalService.open(UploadImgModalComponent);
        modalRef.componentInstance.imageType = ImageType.ResourceImage;
        modalRef.componentInstance.modalTitle = "Upload sticker";
        modalRef.result.then((result) => {
        if (result !== "Cancel click") {
            this.thumbnailUrl = result.uploadedImageUrl;
            this.createCustomStickerForm.patchValue({
                thumbnailId: result.uploadedImageId,
            });
        }
        });
    }

    ngOnInit(): void {
        this.createCustomStickerForm = this.fb.group({
            thumbnailId: ["", Validators.required],
            resourceId: null,
        })
    }
    
}