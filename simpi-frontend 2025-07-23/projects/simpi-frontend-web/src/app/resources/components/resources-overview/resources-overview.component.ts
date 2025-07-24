import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TableData } from '../../../shared/components/sim-table/model/tableData.model';
import { ResourceResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'sim-resources-overview',
    templateUrl: 'resources-overview.component.html',
    styleUrls: ['resources-overview.component.scss']
})

export class ResourcesOverviewComponent {
    public addingAborted: boolean = false;

    @Input()
    public resourceForm: FormGroup;

    @Input()
    public addModeEnabled: boolean;

    @Input()
    public selectedResource: ResourceResponse;

    @Input()
    public errorLoadingData: boolean;

    @Input()
    public resources: ResourceResponse[];

    @Output()
    public selectResource: EventEmitter<ResourceResponse> = new EventEmitter<ResourceResponse>();

    @Output()
    public addResource: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public enableOrDisableAddMode: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    public deleteResource: EventEmitter<ResourceResponse> = new EventEmitter<ResourceResponse>();

    @Output()
    public reloadData: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public unselectResource: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public saveResource: EventEmitter<any> = new EventEmitter<any>();

    public enableAddMode(): void {
        this.addingAborted = false;
        if (!this.addModeEnabled)
            this.enableOrDisableAddMode.emit(true);
    }

    public disableAddMode(): void {
        this.addingAborted = true;
        if (this.addModeEnabled)
            this.enableOrDisableAddMode.emit(false);
    }

    public onSelectResource(resource: ResourceResponse): void {
        if (this.addModeEnabled) {
            this.addingAborted = true;
        }
        this.selectResource.emit(resource);
    }

    public staticColumns: any[] = ['menu','dragHandle'];

    public dynamicColumns: TableData<any>[] = [
        { prop: 'iconOrThumbnail', text: '', cell: resource => `${resource.thumbnailUrl}`, imageOrIcon: () => "image" },
        { prop: 'title', text: 'title', cell: resource => `${resource.title}` },
        { prop: 'manufacturer', text: 'manufacturer', cell: resource => resource.manufacturer },
        { prop: 'resourceType', text: 'type', cell: resource => `${resource.resourceType}` },
    ];
}