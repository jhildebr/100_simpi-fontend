import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { AnalyticsService } from "projects/simpi-frontend-common/src/lib/services/analytics/analytics.service";
import { UserInteractionStatsResponse } from "projects/simpi-frontend-common/src/lib/models/http/responses/userInteractionStatsResponse";
import { DropdownMenuHelperService } from "../../../shared/services/dropdown-menu-helper.service";
import { SimpiResponse } from "projects/simpi-frontend-common/src/public-api";
import { getStartOfLastDay } from "../../date-calculation";

@Component({
  selector: "sim-analytics-overview-page",
  template: `
    <div class="analytics-container">
      <div class="loading-overlay" *ngIf="isLoading">
        <sim-loading-spinner [show]="true"></sim-loading-spinner>
      </div>
      <ng-container *ngIf="userInteractionStats$ | async as stats; else loading">
        <sim-analytics-overview
          [userInteractionStats]="stats"
        >
        </sim-analytics-overview>
        <sim-analytics-table
          [userInteractionStats]="stats"
          (startDateChanged)="startDateChangedCall($event)"
          (cloneSimpi)="cloneSimpi($event)"
          (showProductSettings)="showProductSettings($event)"
          (shareProduct)="shareProduct()"
          (shareSimpi)="shareSimpi($event)"
          (editSimpiSteps)="navigateToSimpiStepEditor($event)"
          (changeSimpiSettings)="changeSimpiSettings($event)"
          (deleteSimpi)="deleteSimpi($event)"
        ></sim-analytics-table>
      </ng-container>
      <ng-template #loading>
        <sim-loading-spinner [show]="true"></sim-loading-spinner>
      </ng-template>
    </div>
  `,
  styles: [`
    .analytics-container {
      position: relative;
      min-height: 400px;
    }
    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
  `]
})
export class AnalyticsOverviewPageComponent implements OnInit {

  public userInteractionStats$: Observable<UserInteractionStatsResponse>;
  public userInteractionStats: UserInteractionStatsResponse;
  public errorLoadingData: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private analyticsService: AnalyticsService,
    private router: Router,
    private route: ActivatedRoute,
    private dropdownMenuHelperService: DropdownMenuHelperService
  ) {}

  public ngOnInit(): void {
    this.loadAnalyticsData(getStartOfLastDay());
  }

  private loadAnalyticsData(date: Date): void {
    this.isLoading = true;
    this.userInteractionStats$ = this.analyticsService.getUserInteractionStats(date)
      .pipe(
        finalize(() => this.isLoading = false)
      );
  }

  public startDateChangedCall(date: Date) {
    this.loadAnalyticsData(date);
  }

  public navigateToProductSettings(productAlias: string) {
    this.router
      .navigate([productAlias, "settings"], { relativeTo: this.route })
      .catch(console.error);
  }

  public async cloneSimpi(simpi: SimpiResponse): Promise<void> {
    this.dropdownMenuHelperService.cloneSimpi(simpi);
  }

  public shareProduct() {
    this.dropdownMenuHelperService.shareProduct();
  }

  public showProductSettings(paramsJson: any): void { 
    this.dropdownMenuHelperService.showProductSettings(paramsJson);
  }

  public shareSimpi(simpi: SimpiResponse) {
    this.dropdownMenuHelperService.shareSimpi(simpi);
  }

  public changeSimpiSettings(simpi: SimpiResponse) {
    this.dropdownMenuHelperService.changeSimpiSettings(simpi);
  }

  public deleteSimpi(simpi: any): void {
    this.dropdownMenuHelperService.deleteSimpi(simpi);
  }

  public navigateToSimpiStepEditor(simpi: SimpiResponse) {
    this.dropdownMenuHelperService.navigateToSimpiStepEditor(simpi);
  }
}
