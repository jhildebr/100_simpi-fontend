import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableData } from '../../../shared/components/sim-table/model/tableData.model';
import { StepResponse } from '../../../../../../simpi-frontend-common/src/lib/models/http/responses/stepResponse';

@Component({
    selector: 'sim-deleted-steps-overview',
    template: `
        <sim-table [showAddRow]='false' [data]='steps' [dynamicColumns]='dynamicColumns' 
            (clickedRow)="restoreStep.emit($event)" (restore)="restoreStep.emit($event)" [selectedItemId]="null">
        </sim-table>
    `
})

export class DeletedStepsOverviewComponent {
    @Input()
    public steps: StepResponse[];

    @Output()
    public restoreStep: EventEmitter<StepResponse> = new EventEmitter<StepResponse>();

    public dynamicColumns: TableData<StepResponse>[] = [
        { prop: 'iconOrThumbnail', text: 'icon', cell: step => `${step.thumbnailUrl}`, imageOrIcon: step => 'image' },
        { prop: 'title', text: 'title', cell: step => `${step.title}`, extraCss: 'font-weight-bold' }
    ];
}