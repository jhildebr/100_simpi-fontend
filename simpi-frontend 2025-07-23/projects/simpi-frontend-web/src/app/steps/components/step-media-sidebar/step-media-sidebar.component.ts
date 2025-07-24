import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StepResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { UploadImgModalComponent } from '../../../shared/components/upload-img-modal/upload-img-modal.component';
import { ImageType } from '../../../../../../simpi-frontend-common/src/lib/services/images/upload-img-modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sim-step-media-sidebar',
  templateUrl: './step-media-sidebar.component.html',
  styleUrls: ['./step-media-sidebar.component.scss']
})
export class StepMediaSidebarComponent {

  @Input()
  public selectedStep: StepResponse;

  @Output()
  public stepMediaUploaded: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modalService: NgbModal) {
  }

  public onExchangeMedia(): void {
    const modalRef = this.modalService.open(UploadImgModalComponent);
    modalRef.componentInstance.imageType = ImageType.StepMedia;
    modalRef.componentInstance.modalTitle = 'Upload Step Media';
    modalRef.result
      .then((result) => {
        if (result !== 'Cancel click') {
          const newStepMediaId: string = result.uploadedImageId;
          this.stepMediaUploaded.emit(newStepMediaId);
        }
      }).catch((error) => {
      if (error !== 'Cross click') {
        console.error(error);
      }
    });
  }
}
