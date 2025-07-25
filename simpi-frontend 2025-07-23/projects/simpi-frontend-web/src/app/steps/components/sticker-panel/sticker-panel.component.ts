import { Component, OnInit, Input } from "@angular/core";
import { StickerService } from "projects/simpi-frontend-common/src/lib/services/stickers/sticker.service";
import { StickerPalette } from "projects/simpi-frontend-common/src/lib/models/sticker-palette";
import { UntypedFormGroup } from "@angular/forms";
import { SimpiResponse } from "../../../../../../simpi-frontend-common/src/lib/models";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetAddModalComponent } from '../../../resources/components/asset-add-modal/asset-add-modal.component';
import { CreateResourceRequest } from 'projects/simpi-frontend-common/src/lib/models/http/requests/createResourceRequest';
import { AddCustomStickerRequest } from 'projects/simpi-frontend-common/src/lib/models/http/requests/addCustomStickerRequest';
import { ResourceService } from 'projects/simpi-frontend-common/src/lib/services/resources/resource.service';
import { CustomStickerAddModalComponent } from "../../../resources/components/custom-sticker-add-modal/custom-sticker-add-modal.component";
import { CustomStickerService } from "projects/simpi-frontend-common/src/lib/services/custom-stickers/custom-sticker.service";

@Component({
  selector: "sim-sticker-panel",
  templateUrl: "./sticker-panel.component.html",
  styleUrls: ["./sticker-panel.component.scss"],
})
export class StickerPanelComponent implements OnInit {
  public stickerPalettes: StickerPalette[];

  @Input()
  public stepForm: UntypedFormGroup;

  @Input()
  public simpiId: string;

  @Input()
  public simpi: SimpiResponse;

  constructor(
    private stickerService: StickerService, 
    private modalService: NgbModal, 
    private assetService: ResourceService,
    private customStickerService: CustomStickerService
  ) {
    this.stickerPalettes = this.stickerService.palettes;
  }

  ngOnInit(): void {}

  public addCustomAsset(): void {
    const modalRef = this.modalService.open(CustomStickerAddModalComponent);
    modalRef.result.then(
      (result: { success: boolean, value: any}) => {
        if (result?.success)
        {
          const {
            thumbnailId
          } = result.value;

          const stickerToAdd: AddCustomStickerRequest = {
            thumbnailId: thumbnailId
          };

          this.customStickerService.createCustomSticker(stickerToAdd).subscribe();
        }
      },
      (err) => {}
    );
  }

  public addAsset(): void {
    const modalRef = this.modalService.open(AssetAddModalComponent);
    modalRef.result.then(
      (result: { success: boolean; value: CreateResourceRequest }) => {
        if (result?.success) {
          const {
            title,
            description,
            manufacturer,
            resourceType,
            shoppingLink,
            thumbnailId,
            resourceId,
            showOnStartPanel,
          } = result.value;
          const resourceToAdd: CreateResourceRequest = {
            title,
            description,
            manufacturer,
            resourceType: +resourceType,
            shoppingLink,
            thumbnailId,
            resourceId,
            creationDate: new Date(),
            showOnStartPanel,
          };
          this.assetService.createResource(resourceToAdd).subscribe();
        }
      },
      (err) => {}
    );
  }
}
