import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableData } from '../../../shared/components/sim-table/model/tableData.model';
import { SimpiResponse } from '../../../../../../simpi-frontend-common/src/lib/models';

@Component({
  selector: 'sim-deleted-simpi-overview',
  template: `
    <sim-table [showAddRow]='false' [data]='simpis' [dynamicColumns]='dynamicColumns'
               (restore)="restoreSimpi.emit($event)" [selectedItemId]="null">
    </sim-table>
  `
})

export class DeletedSimpiOverviewComponent {
  @Input()
  public simpis: SimpiResponse[];

  @Output()
  public restoreSimpi: EventEmitter<SimpiResponse> = new EventEmitter<SimpiResponse>();

  public dynamicColumns: TableData<SimpiResponse>[] = [
    { prop: 'iconOrThumbnail', text: 'icon', cell: simpi => `${simpi.thumbnailUrl === undefined ? simpi.iconColor : simpi.thumbnailUrl}`, imageOrIcon: simpi => !simpi.iconColor ? 'image' : 'color' },
    { prop: 'title', text: 'title', cell: simpi => `${simpi.title}`, extraCss: 'font-weight-bold' },
    { prop: 'status', text: 'status', cell: simpi => simpi.deploymentInfo.deploymentState, type: 'simpi' },
    { prop: 'count', text: 'steps', cell: simpi => simpi.stepCount, type: 'steps', singular: 'step', plural: 'steps' }
  ];
}
