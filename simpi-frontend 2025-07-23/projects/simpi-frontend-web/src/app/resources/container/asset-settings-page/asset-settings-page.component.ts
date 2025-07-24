import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { pluck, switchMap } from "rxjs/operators";
import { ResourceService } from "../../../../../../simpi-frontend-common/src/lib/services/resources/resource.service";
import { ResourceResponse } from "../../../../../../simpi-frontend-common/src/public-api";
import { UploadImgModalComponent } from '../../../shared/components/upload-img-modal/upload-img-modal.component';

@Component({
  selector: "sim-asset-settings-page",
  template: ` <sim-asset-settings
    [asset]="asset$ | async" [uploadImageModalComponent]="uploadImageModalComponent"
    (navigateBack)="onNavigateBack($event)"
  ></sim-asset-settings>`,
})
export class AssetSettingsPageComponent implements OnInit {
  public asset$: Observable<ResourceResponse>;

  public uploadImageModalComponent: typeof UploadImgModalComponent = UploadImgModalComponent;

  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.asset$ = this.route.params.pipe(
      pluck("assetAlias"),
      switchMap((alias) => this.resourceService.getResourceByAlias(alias))
    );
  }

  public onNavigateBack(returnTo: string | undefined): void {
    if (!returnTo || returnTo === "published") {
      this.router.navigate(["../../"], { relativeTo: this.route });
    } else {
      this.router.navigate(["../../deleted"], { relativeTo: this.route });
    }
  }
}
