import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AnalyticsService } from "projects/simpi-frontend-common/src/lib/services/analytics/analytics.service";
import { UserInteractionStatsResponse } from "projects/simpi-frontend-common/src/lib/models/http/responses/userInteractionStatsResponse";
import { DropdownMenuHelperService } from "../../../shared/services/dropdown-menu-helper.service";
import { SimpiResponse } from "projects/simpi-frontend-common/src/public-api";
import { getStartOfLastDay } from "../../date-calculation";

@Component({
  selector: "sim-analytics-overview-page",
  template: `
    <sim-analytics-overview
      [userInteractionStats]="userInteractionStats$ | async"
    >
    </sim-analytics-overview>
    <sim-analytics-table
      [userInteractionStats]="userInteractionStats$ | async"
      (startDateChanged)="startDateChangedCall($event)"
      (cloneSimpi)="cloneSimpi($event)"
      (showProductSettings)="showProductSettings($event)"
      (shareProduct)="shareProduct()"
      (shareSimpi)="shareSimpi($event)"
      (editSimpiSteps)="navigateToSimpiStepEditor($event)"
      (changeSimpiSettings)="changeSimpiSettings($event)"
      (deleteSimpi)="deleteSimpi($event)"
    ></sim-analytics-table>
  `,
})
export class AnalyticsOverviewPageComponent implements OnInit {

  public userInteractionStats$: Observable<UserInteractionStatsResponse>;
  public userInteractionStats: UserInteractionStatsResponse;
  public errorLoadingData: boolean = false;

  constructor(
    private analyticsService: AnalyticsService,
    private router: Router,
    private route: ActivatedRoute,
    private dropdownMenuHelperService: DropdownMenuHelperService
  ) {}

  public ngOnInit(): void {
    this.userInteractionStats$ = this.analyticsService.getUserInteractionStats(
      getStartOfLastDay()
    );
  }

  public startDateChangedCall(date: Date) {
    this.userInteractionStats$ =
      this.analyticsService.getUserInteractionStats(date);
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
