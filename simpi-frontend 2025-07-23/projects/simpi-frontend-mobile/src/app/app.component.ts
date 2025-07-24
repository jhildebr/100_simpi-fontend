import { Component, ViewChildren, QueryList, NgZone, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { Plugins } from "@capacitor/core";
import { filter, distinctUntilChanged, takeWhile } from 'rxjs/operators';
import { UrlService } from './shared/services/url-service/url.service';
const { App, SplashScreen } = Plugins;

@Component({
    selector: 'sim-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
    private _currentUrl: string;
    private _previousUrl: string;
    private _componentActive: boolean = true;

    constructor(
        private platform: Platform,
        private zone: NgZone,
        private router: Router,
        private urlService: UrlService,
    ) {
        this.initializeApp();
        this.backButtonEvent();
    }

    public ngOnInit(): void {
        SplashScreen.hide();

        this.router.events.pipe(
            distinctUntilChanged(),
            filter((event) => event instanceof NavigationEnd),
            takeWhile(() => this._componentActive)
        ).subscribe((event: NavigationEnd) => {
            this._previousUrl = this._currentUrl;
            this._currentUrl = event.url;
            this.urlService.setPreviousUrl(this._previousUrl);
        });
    }

    public backButtonEvent(): void {
        this.platform.backButton.subscribe(() => {
            this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
                if (this.router.url === '/home') {
                    navigator['app'].exitApp();
                } else {
                    window.history.back();
                }
            });
        });
    }

    public initializeApp(): void {

        App.addListener('appUrlOpen', (data: any) => {
            this.zone.run(() => {
                const slug = data.url.split(".net").pop();
                console.log(slug);
                if (slug) {
                    this.router.navigateByUrl(slug);
                }
                // If no match, do nothing - let regular routing 
                // logic take over
            });
        });
    }
}
