import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SimpiResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import { ColorService } from '../../../shared/services/color-service/color.service';
import { takeWhile, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'sim-card-view',
    templateUrl: 'simpis-card-view.component.html',
    styleUrls: ['simpis-card-view.component.scss']
})

export class SimpisCardViewComponent implements OnInit, OnDestroy {
    private _simpi: SimpiResponse;
    private _componentActive: boolean = true;
    public simpiUrl: string;
    public textColor: string = 'light';
    public defaultColor: string = '#cecece';

    @Input()
    public set simpi(val: SimpiResponse) {
        if (val.thumbnailId) {
            this.getColor(val.thumbnailId)
        }
        this._simpi = val;

    }

    constructor(private sanitizer: DomSanitizer, private simpiService: SimpiService,
        private colorService: ColorService, private router: Router) {

    }

    public getSanitizedImage(id: string): SafeStyle {
        if (id) {
            const url = this.simpiService.getThumbnailUrl(id);
            return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
        }
    }

    public getColor(id: string): void {
        const url = this.simpiService.getThumbnailUrl(id);
        this.colorService.getProminentColorOfImage(url).pipe(
            tap(color => {
                this.textColor = color;
            }),
            takeWhile(() => this._componentActive)
        ).subscribe();
    }

    public go(id: string) {
        this.router.navigateByUrl(`/nav/steps/${id}`, { replaceUrl: true });
    }

    public ngOnInit(): void { }

    public ngOnDestroy(): void {
        this._componentActive = false;
    }

    public get simpi(): SimpiResponse {
        return this._simpi;
    }
}
