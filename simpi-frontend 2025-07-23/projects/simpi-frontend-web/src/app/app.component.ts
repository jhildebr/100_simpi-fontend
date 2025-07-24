import {
  Component,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { ScreenType } from "./shared/models/screenTypes";
import { Platform } from "@angular/cdk/platform";
import { AuthService } from "../../../simpi-frontend-common/src/lib/services/auth/auth.service";
import { tap, takeWhile, pluck, shareReplay } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { BrandService } from "projects/simpi-frontend-common/src/lib/services/brand/brand.service";

@Component({
  selector: "sim-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private _componentActive: boolean = true;
  public screenTypes: typeof ScreenType = ScreenType;
  public screenType: ScreenType;

  constructor(
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    private authService: AuthService,
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.authService.getToken().then((token) => {
      if (token) {
        this.authService.userInfo$
          .pipe(
            pluck("homeBrandId"),
            tap((homeBrandId) => {
              if (homeBrandId) {
                this.brandService
                  .getBrandById(homeBrandId)
                  .subscribe((homeBrand) => {
                    if (homeBrand) {
                      const url = window.location.pathname;
                      if (url === "/") {
                        this.router.navigate([`../${homeBrand.alias}`], {
                          relativeTo: this.route,
                        });
                      }
                    }
                  });
              }
            }),
            takeWhile(() => this._componentActive)
          )
          .subscribe();
      }
    });
  }

  private checkIfDeviceHasTouchscreen(): void {
    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    ) {
      //this is a touch device you can any action here
      this.screenType = this.screenTypes.HAS_TOUCHSCREEN;
    } else {
      //it's not touch device another code here
      this.screenType = this.screenTypes.NO_TOUCHSCREEN;
    }

    if (this.platform.ANDROID) {
      document.documentElement.style.setProperty(`--simpi-player-zIndex`, "-1");
    }
    this.cdr.detectChanges();
  }

  public ngAfterViewInit(): void {
    this.checkIfDeviceHasTouchscreen();
  }

  public ngOnDestroy(): void {
    this._componentActive = false;
  }
}
