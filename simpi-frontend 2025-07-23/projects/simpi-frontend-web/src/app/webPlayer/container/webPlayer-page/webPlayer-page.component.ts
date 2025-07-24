import {  ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, switchMap, takeWhile, tap } from 'rxjs/operators';
import { DeploymentStateResponse, SimpiResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import { environment } from '../../../../environments/environment';
import { ShareService } from '../../../shared/services/share.service';
import { Meta, Title } from '@angular/platform-browser';
import { NotAvailableReasonType } from 'projects/simpi-frontend-common/src/lib/models/notAvailableReasonType';
import { WebplayerComponent } from '../../components/webplayer/webplayer.component';

@Component({
    selector: 'sim-webPlayer-page',
    template: `
      <sim-not-available *ngIf="simpiNotAvailable" [reason]="notAvailableReason"></sim-not-available>
      <sim-loading-spinner *ngIf="showLoadingSpinner" size="3x" [show]="true"></sim-loading-spinner>
      <ng-container *ngIf="!simpiNotAvailable">
        <sim-webplayer #player class="h-100" [simpiId]='simpi?.simpiId' [showCloseButton]="false" (share)="onShare()">
        </sim-webplayer>
      </ng-container>
    `,
    styles: [`
      sim-loading-spinner {
        position: absolute;
        z-index: 100;
        left: 50%;
        top: 50%;
      }
    `]
})

export class WebPlayerPageComponent implements OnInit, OnDestroy {
    private _simpiAlias: string;
    private _componentActive: boolean = true;

    public simpi: SimpiResponse;
    public simpiNotAvailable: boolean = false;
    public showLoadingSpinner: boolean = false;
    public notAvailableReason: NotAvailableReasonType;

    @ViewChild('player')
    public webplayer: WebplayerComponent;

    constructor(private route: ActivatedRoute, private simpiService: SimpiService, private cdr: ChangeDetectorRef,
        private renderer2: Renderer2, private shareService: ShareService,
        private metaService: Meta, private titleService: Title) {
    }

    public ngOnInit(): void {
        // prevent temporary scrollbars while the resources' infoOverlay fades in or out
        this.renderer2.setStyle(document.body, 'overflow', 'hidden');

        this.route.url.pipe(
            switchMap(url => {
                this._simpiAlias = url.toString();
                if (this._simpiAlias) {
                    return this.simpiService.getSimpiByAlias(this._simpiAlias).pipe(
                        catchError(err => {
                            this.showLoadingSpinner = false;
                            this.simpiNotAvailable = true;
                            if (err?.status === 404) {
                                this.notAvailableReason = NotAvailableReasonType.NOT_FOUND;
                            } else if (err?.status === 403) {
                                this.notAvailableReason = NotAvailableReasonType.PRIVATE;
                            } else {
                                console.error(err);
                            }
                            return EMPTY;
                        }),
                        tap(simpi => {
                            this.showLoadingSpinner = false;
                            if (simpi) {
                                this.simpiNotAvailable = false;
                                this.simpi = simpi;
                                this.setPageMetadata(simpi);
                            } else {
                                this.simpiNotAvailable = true;
                                this.notAvailableReason = NotAvailableReasonType.NOT_FOUND;
                                this.setNoIndexMetaTag();
                            }
                        })
                    )
                }
            }),
            takeWhile(() => this._componentActive)
        ).subscribe();
    }

    public onShare(): void {
        const text = this.simpi?.description ? `Check out this how-to! ${this.simpi.description}` : undefined;
        const url = `${environment.baseUrl}/player/${this._simpiAlias}`;
        this.shareService.share(this.simpi?.title, text, url);
    }

    public ngOnDestroy(): void {
        this._componentActive = false;
        this.renderer2.removeStyle(document.body, 'overflow');
        this.showLoadingSpinner = false;
    }

    private setPageMetadata(simpi: SimpiResponse): void {
        this.titleService.setTitle(simpi.title);
        this.setDescriptionMetaTag(simpi);
        if (simpi.deploymentInfo?.deploymentState !== DeploymentStateResponse.Public) {
            this.setNoIndexMetaTag();
        }
    }

    private setDescriptionMetaTag(simpi: SimpiResponse): void {
        this.metaService.addTag({
            name: 'description',
            content: simpi.description || "An interactive how-to about " + simpi.title,
        });
    }

    private setNoIndexMetaTag(): void {
        this.metaService.addTag({
            name: 'robots',
            content: 'noindex',
        });
    }
}
