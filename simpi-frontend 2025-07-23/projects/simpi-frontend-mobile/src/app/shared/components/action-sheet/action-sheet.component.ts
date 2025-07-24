import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Gesture, GestureController } from '@ionic/angular';
import { ResourceResponse, SimpiResponse } from '../../../../../../simpi-frontend-common/src/public-api';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { catchError, takeWhile } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { EMPTY, from } from 'rxjs';
import { UrlService } from '../../services/url-service/url.service';

const { Browser } = Plugins;

@Component({
    selector: 'sim-action-sheet',
    templateUrl: 'action-sheet.component.html',
    styleUrls: ['action-sheet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ActionSheetComponent implements OnInit, AfterViewInit, OnDestroy {
    private swipeGesture: Gesture;
    private _componentActive: boolean = true;

    public direction: 'up' | 'down' = undefined;

    public orientation: 'landscape' | 'portrait';

    public state: 'top' | 'half' | 'bottom' = 'bottom';

    @Input()
    public containerEl: any;

    @Input()
    public simpi: SimpiResponse;

    @Input()
    public resources: ResourceResponse[];

    @Output()
    public playSimpi: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public visible: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('overlay')
    public overlay: ElementRef<HTMLDivElement>;

    @ViewChild('content')
    public content: ElementRef<HTMLDivElement>;

    constructor(private gestureCtrl: GestureController, 
                private cdr: ChangeDetectorRef,
                private urlService: UrlService) {

    }

    public ngOnInit(): void {
        this.checkOrientation();
    }

    public onPlaySimpi(): void {
        this.playSimpi.emit();
        this.closeOverlay();
    }

    private checkOrientation(): void {
        this.setOrientation();
        ScreenOrientation.onChange().pipe(
            takeWhile(() => this._componentActive)
        ).subscribe((e: any) => {
            if (e && e.type === 'orientationchange') {
                this.setOrientation();
            }
        });
    }

    private setOrientation(): void {
        const { PORTRAIT, PORTRAIT_PRIMARY, PORTRAIT_SECONDARY } = ScreenOrientation.ORIENTATIONS;
        if (ScreenOrientation.type === PORTRAIT ||
            ScreenOrientation.type === PORTRAIT_PRIMARY ||
            ScreenOrientation.type === PORTRAIT_SECONDARY) {
            this.orientation = 'portrait';
        } else {
            this.orientation = 'landscape';
        }
        this.cdr.detectChanges();
    }

    public ngAfterViewInit(): void {
        if (this.containerEl) {
            const gesture: Gesture = this.gestureCtrl.create({
                el: this.containerEl.nativeElement,
                threshold: 100,
                direction: 'y',
                gestureName: 'my-gesture',
                onMove: ev => this.onMove(ev),
                onEnd: () => this.onEnd()
            }, true);

            this.swipeGesture = gesture;
            this.swipeGesture.enable();

            this.state = 'half';
            this.visible.emit(true);
            this.cdr.detectChanges();
        }

    }

    public ngOnDestroy(): void {
        this.swipeGesture.destroy();
        this._componentActive = false;
    }

    public closeOverlay(): void {
        this.state = 'bottom';
        this.visible.emit(false);
        this.cdr.detectChanges();
    }

    public expand(): void {
        this.state = 'top';
        this.visible.emit(true);
        this.cdr.detectChanges();
    }

    public showOverlay(): void {
        this.state = 'half';
        this.visible.emit(true);
        this.cdr.detectChanges();
    }

    public openShopUrl(url: string): void {
        if (url) {
            from(Browser.open({ url: this.urlService.getValidUrl(url) })).pipe(
                catchError(err => {
                    return EMPTY;
                })
            ).subscribe();
        }
    }

    private onEnd(): void {
        this.direction = undefined;
    }

    private onMove(detail: any): void {
        const { deltaY } = detail;
        if (deltaY > 0 && this.direction !== 'down') {
            this.direction = 'down';
            switch (this.state) {
                case 'top':
                    this.state = 'half';
                    this.visible.emit(true);
                    break;
                case 'half':
                    this.state = 'bottom';
                    this.visible.emit(false);
                    break;
                default:
                    break;
            }
        } else if (deltaY < 0 && this.direction !== 'up') {
            this.direction = 'up';
            switch (this.state) {
                case 'bottom':
                    this.state = 'half';
                    this.visible.emit(true);
                    break;
                case 'half':
                    this.state = 'top';
                    this.visible.emit(true);
                    break;
                default:
                    break;
            }
        }
        this.cdr.detectChanges();
    }
}
