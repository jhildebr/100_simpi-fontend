import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { startWith, switchMap } from "rxjs/operators";
import { TabNavItem } from "../../../shared/models/tabNavItem";
import { ResourceService } from "../../../../../../simpi-frontend-common/src/lib/services/resources/resource.service";
import { ViewMode } from "../../../../../../simpi-frontend-common/src/lib/models/view-mode";
import { Observable, of } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AssetAddModalComponent } from "../../components/asset-add-modal/asset-add-modal.component";
import { CreateResourceRequest } from "../../../../../../simpi-frontend-common/src/lib/models/http/requests/createResourceRequest";
import { ResourceCount } from "../../../../../../simpi-frontend-common/src/lib/models/resource-count";

@Component({
  template: `
    <ng-container *ngIf="view$ | async as viewMode">
      <div class="page-title-container align-items-center">
        <h1 class="page-title mb-0">Assets</h1>
        <div class="d-flex align-items-center">
          <div
            class="switch-group"
            [ngClass]="{ 'active-right': viewMode === 'table' }"
          >
            <button class="left" (click)="setView('card')">
              <img src="assets/svg/cardview.svg" />
            </button>
            <button class="right" (click)="setView('table')">
              <img src="assets/svg/tableview.svg" />
            </button>
          </div>
          <button (click)="addAsset()" class="simpi-button-dark ml-3">
            + &nbsp; Add Asset
          </button>
        </div>
      </div>
      <sim-tab-nav [routes]="assetRoutes$ | async"></sim-tab-nav>
      <router-outlet></router-outlet>
    </ng-container>
  `,
  styleUrls: ["resources-routing.component.scss"],
})
export class ResourcesRoutingComponent implements OnInit {
  public view$: Observable<ViewMode>;

  constructor(
    private assetService: ResourceService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  public assetRoutes$: Observable<TabNavItem[]>;
  private initialAssetRoutes = [
    { url: "./", text: "Published  " },
    // { url: "unpublished", text: "Unpublished  " },
    { url: "deleted", text: "Deleted  " },
  ];

  public setView(type: ViewMode): void {
    this.assetService.setViewMode(type);
  }

  public ngOnInit(): void {
    this.view$ = this.assetService.currentResourceView$;
    this.assetRoutes$ = this.assetService.resourceCount$.pipe(
      startWith(of(this.initialAssetRoutes)),
      switchMap((assetCount: ResourceCount) => {
        if (assetCount) {
          const updatedAssetRoutes = [
            {
              url: this.initialAssetRoutes[0].url,
              text: (this.initialAssetRoutes[0].text = `Published ${assetCount.published} `),
            },
            {
              url: this.initialAssetRoutes[1].url,
              text: (this.initialAssetRoutes[1].text = `Deleted ${assetCount.deleted} `),
            },
          ];
          return of(updatedAssetRoutes);
        }
        return of(this.initialAssetRoutes);
      })
    );
  }

  public addAsset(): void {
    const modalRef = this.modalService.open(AssetAddModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.result.then(
      (result: { success: boolean; value: CreateResourceRequest }) => {
        if (result?.success) {
          const {
            title,
            description,
            manufacturer,
            resourceType,
            shoppingLink,
            thumbnailId,
            resourceId,
            showOnStartPanel,
          } = result.value;
          const resourceToAdd: CreateResourceRequest = {
            title,
            description,
            manufacturer,
            resourceType: +resourceType,
            shoppingLink,
            thumbnailId,
            resourceId,
            creationDate: new Date(),
            showOnStartPanel
          };
          this.assetService.createResource(resourceToAdd).subscribe();
        }
      },
      (err) => {
        console.warn('Asset modal was dismissed:', err);
      }
    );
  }
}
