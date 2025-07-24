import { Component, Input } from "@angular/core";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { ProductResponse } from "../../../../../../simpi-frontend-common/src/lib/models";
import { UserInteractionStatsResponse } from "projects/simpi-frontend-common/src/lib/models/http/responses/userInteractionStatsResponse";

@Component({
  selector: "sim-analytics-overview",
  templateUrl: "./analytics-overview.component.html",
  styleUrls: ["./analytics-overview.component.scss"],
})
export class AnalyticsOverviewComponent {
  public product: ProductResponse;
  public closeResult: string;
  public draggingRow: boolean = false;
  public config: PerfectScrollbarConfigInterface = {};
  public addingAborted: boolean = false;
  @Input()
  public userInteractionStats: UserInteractionStatsResponse;

  constructor() {}
}
