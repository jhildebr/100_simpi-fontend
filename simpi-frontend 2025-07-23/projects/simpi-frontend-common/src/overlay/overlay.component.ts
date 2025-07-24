import { Component, Input, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { StepResponse, ResourceResponse, SimpiResponse } from '../lib/models';

@Component({
    selector: 'sim-overlay',
    templateUrl: 'overlay.component.html',
    styleUrls: ['overlay.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateY(100%)' }),
                animate('200ms ease-out', style({ transform: 'translateY(0%)' }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ transform: 'translateY(100%)' }))
            ])
        ])
    ]
})

export class OverlayComponent {
    @Input()
    public set resources(value: ResourceResponse[]) {
        this.resourcesToDisplay = value?.filter(resource => resource && (resource.showOnStartPanel || resource.shoppingLink));
    }

    @Input()
    public resourceButtonTemplate: TemplateRef<any>;

    @Input()
    public simpi: SimpiResponse;

    @Input()
    public visible: boolean;

    public resourcesToDisplay: ResourceResponse[];

}