import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ResourceResponse, ResourceTypeResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { ResourceService } from '../../../../../../simpi-frontend-common/src/lib/services/resources/resource.service';
import { tap, takeWhile } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadImgModalComponent } from '../../../shared/components/upload-img-modal/upload-img-modal.component';
import { ImageType, UploadImgModalService } from '../../../../../../simpi-frontend-common/src/lib/services/images/upload-img-modal.service';
import { DropdownItemModel } from '../../../shared/models/dropdownItem';

@Component({
    selector: 'sim-resource-detail-sidebar',
    templateUrl: 'resource-detail-sidebar.component.html',
    styleUrls: ['resource-detail-sidebar.component.scss']
})

export class ResourceDetailSidebarComponent implements OnInit, OnDestroy {
    private _componentActive: boolean = true;
    private _addingAborted: boolean;
    private maxWidth: string;
    public resourceTypes: typeof ResourceTypeResponse = ResourceTypeResponse;

    public thumbnailUrl: string = null;

    public editModeEnabled: boolean;

    public resourceTypesList: DropdownItemModel[];

    @Input()
    public addModeEnabled: boolean;

    @Input()
    public selectedResource: ResourceResponse;

    @Input()
    public resourceForm: UntypedFormGroup;

    @Input()
    public set addingAborted(val: boolean) {
        this._addingAborted = val;
        if (val) {
            const thumbnailControl = this.resourceForm.get('thumbnailId');
            if (thumbnailControl.value) {
                this.imageUploadService.deleteLastUploadedImageFromServer().pipe(
                    takeWhile(() => this._componentActive)
                ).subscribe();
                thumbnailControl.setValue(null);
                this.cdr.detectChanges();
                this.thumbnailUrl = null;
            }
        }
    }

    public get addingAborted(): boolean {
        return this._addingAborted;
    }

    @Output()
    public unselectResource: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public saveResource: EventEmitter<any> = new EventEmitter<any>();

    constructor(private resourcesService: ResourceService, private modalService: NgbModal,
        private imageUploadService: UploadImgModalService, private cdr: ChangeDetectorRef) { }

    public ngOnInit(): void {
        this.resourceTypesList = this.createResourceTypeArray();
        this.resourcesService.editModeEnabled$.pipe(
            tap(val => this.editModeEnabled = val),
            takeWhile(() => this._componentActive)
        ).subscribe();
        this.resourcesService.resourceAdded$.pipe(
            tap(val => {
                if (val) {
                    this.thumbnailUrl = null;
                }
            }),
            takeWhile(() => this._componentActive)
        ).subscribe();
        this.maxWidth = document.getElementById('content').style.maxWidth;
        document.getElementById('content').style.maxWidth = 'unset';
    }

    public ngOnDestroy(): void {
        this._componentActive = false;
        document.getElementById('content').style.maxWidth = this.maxWidth;
    }

    public onUnselectResource(): void {
        this.resourcesService.setSelectedResource(null);
        this.resourcesService.disableEditMode();
        this.unselectResource.emit();
    }

    public enableEditMode(): void {
        this.resourcesService.enableEditMode();
    }

    public disableEditMode(): void {
        this.resourcesService.disableEditMode();
    }

    public onSaveResource(): void {
        this.saveResource.emit();
        this.thumbnailUrl = null;
    }

    private createResourceTypeArray(): DropdownItemModel[] {
        return Object.entries(this.resourceTypes).filter(e => !isNaN(e[0] as any)).map(e => ({ text: e[1].toString(), value: +e[0] }));
    }

    public openResourceImgModal(): void {
        const modalRef = this.modalService.open(UploadImgModalComponent);
        modalRef.componentInstance.imageType = ImageType.ResourceImage;
        modalRef.componentInstance.modalTitle = 'Upload Image';
        const thumbnailControl = this.resourceForm.get('thumbnailId');

        if (this.selectedResource && !this.editModeEnabled) {
            modalRef.result.then(result => {
                if (result !== 'Cancel click') {
                    if (thumbnailControl.value) {
                        this.deleteThumbnail(thumbnailControl.value);
                    }
                    this.resourceForm.patchValue({ thumbnailId: result.uploadedImageId });
                    this.thumbnailUrl = this.imageUploadService.getImageUrlFromImageId(result.uploadedImageId, ImageType.ResourceImage);
                }
            },
            rejected => {
                console.log(rejected);
            });
        } else {
            modalRef.result.then(result => {
                if (result !== 'Cancel click') {
                    if (thumbnailControl.value) {
                        this.deleteThumbnail(thumbnailControl.value);
                    }
                    this.thumbnailUrl = this.imageUploadService.getImageUrlFromImageId(result.uploadedImageId, ImageType.ResourceImage);
                    this.resourceForm.patchValue({ thumbnailId: result.uploadedImageId });
                } else {
                    this.imageUploadService.deleteLastUploadedImageFromServer().pipe(
                        takeWhile(() => this._componentActive)
                    ).subscribe();
                    this.thumbnailUrl = null;
                    this.resourceForm.patchValue({ thumbnailId: null });
                }
            },
                rejected => {
                    this.imageUploadService.deleteLastUploadedImageFromServer().pipe(
                        takeWhile(() => this._componentActive)
                    ).subscribe();
                    this.thumbnailUrl = null;
                    this.resourceForm.patchValue({ thumbnailId: null });
                });
        }
    }

    private deleteThumbnail(thumbnailId: string): void {
        this.resourcesService.deleteThumbnail(thumbnailId).pipe(
            takeWhile(() => this._componentActive)
        ).subscribe();
    }
}
