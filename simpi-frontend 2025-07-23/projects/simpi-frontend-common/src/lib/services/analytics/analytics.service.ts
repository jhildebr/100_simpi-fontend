import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RestService } from "../base/rest.service";
import { BehaviorSubject, Observable } from "rxjs";
import { tap, shareReplay } from "rxjs/operators";
import { COMMON_CONFIG, SimpiCommonConfig } from "../../simpi-common-config";
import { UserInteractionStatsResponse } from "../../models/http/responses/userInteractionStatsResponse";
import { HttpParams } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AnalyticsService extends RestService {
  private readonly restUrl: string;

  private userInteractionStats: BehaviorSubject<UserInteractionStatsResponse> =
    new BehaviorSubject<UserInteractionStatsResponse>(null);

  public userInteractionStats$ = this.userInteractionStats
    .asObservable()
    .pipe(shareReplay(1));

  constructor(
    @Inject(COMMON_CONFIG) private config: SimpiCommonConfig,
    private httpClient: HttpClient,
  ) {
    super(config);
    this.restUrl = this.config.restUrl;
  }

  public getUserInteractionStats(since: Date): Observable<UserInteractionStatsResponse> {
    const url = `${this.restUrl}/api/v1/stats/userinteractions`;

    //Create HttpParams object and set query parameters
    let params = new HttpParams();
    params = params.set('since', since.toDateString());

    return this.httpClient.get<UserInteractionStatsResponse>(url, { params }).pipe(
      tap((stats) => {
        if (stats) {
          this.userInteractionStats.next(stats);
        }
      })
    );
  }
}
