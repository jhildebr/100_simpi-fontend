import { Component, Input, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { ResourceTypeResponse, ResourceResponse } from '../lib/models';

@Component({
    selector: 'sim-resource',
    template: `
            <div class="d-flex resource-item" *ngFor="let resource of resources">
                <div class="resource-img">
                    <img *ngIf="resource.thumbnailId" [src]="resource.thumbnailUrl" />
                    <!-- Enable when resource object receives a count prop -->
                    <!-- <div class="count">1</div> -->
                </div>
                <div class="resource-text d-flex flex-column w-100">
                    <div class="resource-title">{{resource.title}}</div>
                    <div class="resource-manufacturer">
                        {{resource.manufacturer}}
                    </div>
                    <div class="ml-auto">
                    <ng-template [ngTemplateOutlet]="resourceButtonTemplate" [ngTemplateOutletContext]="{$implicit: resource}"></ng-template>
                        <!-- <ng-container [ngSwitch]="resource.resourceType">
                            <ng-container *ngSwitchCase="resourceType.Product">
                                <ng-content select=".shop-btn"></ng-content>
                            </ng-container>
                            <ng-container *ngSwitchDefault>
                                <ng-content select=".detail-btn"></ng-content>
                            </ng-container>
                            <ion-button  *ngSwitchCase="resourceType.Product" class="m-0 detail-btn" [href]="resource.shoppingLink ? resource.shoppingLink : undefined"
                            target="_blank">Shop</ion-button>
                            <ion-button *ngSwitchDefault class="m-0 detail-btn">Details</ion-button>
                        </ng-container> -->
                    </div>
                </div>
            </div>
    `,
    styleUrls: ['resource.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResourceComponent {
    public resourceType: typeof ResourceTypeResponse = ResourceTypeResponse;

    @Input()
    public resources: ResourceResponse[];

    @Input()
    public resourceButtonTemplate: TemplateRef<any>;
}