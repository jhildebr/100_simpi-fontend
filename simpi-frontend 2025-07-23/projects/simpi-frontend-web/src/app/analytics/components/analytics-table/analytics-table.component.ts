import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UserInteractionStatsResponse } from "projects/simpi-frontend-common/src/lib/models/http/responses/userInteractionStatsResponse";
import { SimpiResponse } from "../../../../../../simpi-frontend-common/src/lib/models";
import {
  getStartOfLastDay,
  getStartOfLastMonth,
  getStartOfLastWeek,
  getVeryOldDate,
} from "../../date-calculation";

@Component({
  selector: "sim-analytics-table",
  templateUrl: "./analytics-table.component.html",
  styleUrls: ["./analytics-table.component.scss"],
})
export class AnalyticsTableComponent {
  public selectedTimeRangeOption: string = "LastDay";

  constructor() {}

  @Output()
  public deleteProduct: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public showProductSettings: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public userInteractionStats: UserInteractionStatsResponse;

  @Output()
  public shareProduct: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public editSimpiSteps: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public shareSimpi: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public cloneSimpi: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public changeSimpiSettings: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public deleteSimpi: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public startDateChanged: EventEmitter<Date> = new EventEmitter<Date>();

  @Output()
  public restoreSimpi: EventEmitter<SimpiResponse> =
    new EventEmitter<SimpiResponse>();

  @Input()
  public readonly: boolean = true;

  public onSelectChanged(value) {
    let date: Date;
    console.log(this.userInteractionStats);
    // console.log(this.userInteractionStats.productStats.lastAccess);
    switch (this.selectedTimeRangeOption) {
      case "LastDay":
        date = getStartOfLastDay();
        break;
      case "LastWeek":
        date = getStartOfLastWeek();
        break;
      case "LastMonth":
        date = getStartOfLastMonth();
        break;
      case "Total":
        date = getVeryOldDate();
        break;
    }

    this.startDateChanged.emit(date);
  }
}
