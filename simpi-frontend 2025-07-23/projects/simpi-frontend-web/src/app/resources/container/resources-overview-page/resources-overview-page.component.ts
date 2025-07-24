import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import {
  tap,
  takeWhile,
  switchMap,
  shareReplay,
  map,
  distinctUntilChanged,
  take,
} from "rxjs/operators";
import { ResourceService } from "../../../../../../simpi-frontend-common/src/lib/services/resources/resource.service";
import { ResourceResponse } from "../../../../../../simpi-frontend-common/src/lib/models";
import { ResourceChangeRequest } from "../../../../../../simpi-frontend-common/src/lib/models/http/requests/resourceChangeRequest";
import { ViewMode } from "../../../../../../simpi-frontend-common/src/lib/models/view-mode";

@Component({
  template: `
    <ng-container *ngIf="assets$ | async as assets">
      <ng-container *ngIf="(view$ | async) === 'card'">
        <sim-assets-grid
          (showAssetSettings)="onShowAssetSettings($event)"
          (deleteAsset)="onDeleteAsset($event)"
          (restoreAsset)="onRestoreAsset($event)"
          [assets]="assets"
        ></sim-assets-grid>
      </ng-container>
      <ng-container *ngIf="(view$ | async) === 'table'">
        <sim-assets-table
          (edit)="onShowAssetSettings($event)"
          [items]="assets"
        ></sim-assets-table>
      </ng-container>
    </ng-container>
  `,
  styleUrls: ["resources-overview-page.component.scss"],
})
export class ResourcesOverviewPageComponent implements OnInit, OnDestroy {
  private _simpiId: string = null;
  private _componentActive: boolean = true;
  private _isDeletedView: boolean = false;
  public view$: Observable<ViewMode>;
  public assets$: Observable<ResourceResponse[]>;

  public addModeEnabled: boolean = false;
  public resourceForm: FormGroup;
  public selectedResource$: Observable<ResourceResponse>;
  public errorLoadingData: boolean = false;
  public simpiTitle$: Observable<string>;

  constructor(
    private resourcesService: ResourceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.view$ = this.resourcesService.currentResourceView$.pipe(
      distinctUntilChanged(),
      shareReplay()
    );

    this.assets$ = this.route.url.pipe(
      switchMap((urlSegment) => {
        this._isDeletedView = urlSegment.length > 0;
        return this.resourcesService.resources$.pipe(
          map((resources) =>
            resources?.filter((x) =>
              !this._isDeletedView ? !x.deleted : x.deleted
            )
          ),
          shareReplay()
        );
      })
    );

    this.selectedResource$ = this.resourcesService.selectedResource$;
    this.buildForm();
    this.loadResources();
  }

  public ngOnDestroy(): void {
    this._componentActive = false;
  }

  public onSelectResource(resource: ResourceResponse): void {
    if (resource) {
      this.onEnableOrDisableAddMode(false);
      this.resourcesService.setSelectedResource(resource);
      this.populateResourceForm(resource);
    }
  }

  public onReloadData(): void {
    this.loadResources();
  }

  public onSaveResource(): void {
    const resourceToUpdate: ResourceChangeRequest = {
      title: this.resourceForm.get("title").value,
      resourceType: this.resourceForm.get("resourceType").value,
      manufacturer: this.resourceForm.get("manufacturer").value,
      shoppingLink: this.resourceForm.get("shoppingLink").value,
      thumbnailId: this.resourceForm.get("thumbnailId").value,
    };

    this.resourcesService
      .saveResource(this.resourceForm.get("resourceId").value, resourceToUpdate)
      .pipe(
        tap((resp) => {
          if (resp.status === 204) {
            this.resourcesService.disableEditMode();
          }
        }),
        takeWhile(() => this._componentActive)
      )
      .subscribe();
  }

  public onEnableOrDisableAddMode(enabled: boolean): void {
    this.resourcesService.setSelectedResource(null);
    if (enabled) {
      this.buildForm();
      this.addModeEnabled = true;
    }
    if (!enabled) {
      this.addModeEnabled = false;
    }
  }

  public onShowAssetSettings(alias: string): void {
    if (!this._isDeletedView) {
      this.router.navigate([alias], {
        relativeTo: this.route,
        state: { returnTo: "published" },
      });
    } else {
      this.router.navigate([`../${alias}`], {
        relativeTo: this.route,
        state: { returnTo: "deleted" },
      });
    }
  }

  public onDeleteAsset(id: string): void {
    this.resourcesService.deleteResource(id).subscribe();
  }

  public onRestoreAsset(id: string): void {
    this.resourcesService.restoreResource(id).subscribe();
  }

  private loadResources(): void {
    this.resourcesService.getResources().pipe(take(1)).subscribe();
  }

  private buildForm(): void {
    this.resourceForm = this.fb.group({
      resourceId: null,
      title: ["", Validators.required],
      resourceType: [1, Validators.required],
      manufacturer: "",
      shoppingLink: "",
      thumbnailId: null,
      thumbnailUrl: null,
    });
  }

  private populateResourceForm(resource: ResourceResponse): void {
    this.resourceForm.patchValue({
      resourceId: resource.resourceId,
      title: resource.title,
      resourceType: resource.resourceType,
      manufacturer: resource.manufacturer,
      shoppingLink: resource.shoppingLink,
      thumbnailId: resource.thumbnailId,
      thumbnailUrl: resource.thumbnailId
        ? this.resourcesService.getResourceImageUrl(resource.thumbnailId)
        : null,
    });
  }
}
