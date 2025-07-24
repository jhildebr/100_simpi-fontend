import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { SimpiResponse } from '../../../../../../simpi-frontend-common/src/lib/models';

@Component({
    selector: 'sim-simpi-overview',
    templateUrl: 'simpi-overview.component.html',
    styleUrls: ['simpi-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SimpiOverviewComponent {
    public defaultHref: string = '/';

    @Input()
    public loading: boolean;

    @Input()
    public simpis: SimpiResponse[];

    @Input()
    public productPageImageUrl: string;

    @Output()
    public navigateToSimpi: EventEmitter<string> = new EventEmitter<string>();
}