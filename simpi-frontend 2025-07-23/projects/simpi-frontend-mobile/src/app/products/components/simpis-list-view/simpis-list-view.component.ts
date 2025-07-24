import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { SimpiResponse } from '../../../../../../simpi-frontend-common/src/lib/models';

@Component({
    selector: 'sim-list-view',
    templateUrl: 'simpis-list-view.component.html',
    styleUrls: ['simpis-list-view.component.scss']
})

export class SimpisListViewComponent implements OnInit, OnDestroy {
    @Input()
    public simpi: SimpiResponse;

    public ngOnInit(): void { }

    public ngOnDestroy(): void { }
}
