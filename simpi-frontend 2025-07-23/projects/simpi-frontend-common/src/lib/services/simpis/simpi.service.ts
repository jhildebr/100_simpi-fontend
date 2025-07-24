import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap, share, shareReplay, switchMap, tap } from 'rxjs/operators';
import { RestService } from '../base/rest.service';
import { COMMON_CONFIG, SimpiCommonConfig } from '../../simpi-common-config';
import {
  ChangeOrderRequest,
  ChangeSimpiResponse,
  CreateSimpiRequest,
  DeploymentInfoRequest,
  DeploymentInfoResponse,
  DeploymentStateRequest,
  DeploymentStateResponse,
  SimpiChangeRequest,
  SimpiDescriptionChangeRequest,
  SimpiInsertResponse,
  SimpiResponse,
  SimpiThumbnailChangeRequest,
  SimpiTitleChangeRequest,
  SimpiStartPanelVisibilityChangeRequest,
  SimpiPlaybackResponse,
  SimpiCloneRequest, LanguageResponse,
} from '../../models';
import { AuthService } from '../auth/auth.service';
import {SimpiGroupNameChangeRequest} from '../../models/http/requests/simpiGroupNameChangeRequest';
import {SimpiGroupNamesResponse} from '../../models/http/responses/simpiGroupNamesResponse';
import {GroupNameResponse} from "../../models/http/responses/goupNameResponse";


@Injectable({ providedIn: 'root' })
export class SimpiService extends RestService {
  private readonly restUrl: string;

  private selectedSimpi: BehaviorSubject<SimpiResponse> = new BehaviorSubject<SimpiResponse>(null);

  public selectedSimpi$ = this.selectedSimpi.asObservable();

  private editModeEnabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public editModeEnabled$ = this.editModeEnabled.asObservable();

  private simpis: BehaviorSubject<SimpiResponse[]> = new BehaviorSubject<SimpiResponse[]>(undefined);

  public simpis$: Observable<SimpiResponse[]> = this.simpis.asObservable();

  private deleteRestoreOperation: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  public deleteRestoreOperation$: Observable<string> = this.deleteRestoreOperation.asObservable().pipe(
    shareReplay()
  );

  constructor(@Inject(COMMON_CONFIG) private config: SimpiCommonConfig,
              private httpClient: HttpClient, private authService: AuthService) {
    super(config);
    this.restUrl = this.config.restUrl;
  }

  public disableEditMode(): void {
    this.editModeEnabled.next(false);
  }

  public enableEditMode(): void {
    this.editModeEnabled.next(true);
  }

  public setSelectedSimpi(simpi: SimpiResponse): void {
    if (simpi === null) {
      this.selectedSimpi.next(null);
    } else {
      this.selectedSimpi.next(simpi);
    }
  }

  public updateSimpis(simpi: SimpiResponse) {
    const simpis = this.simpis.getValue();
    if (simpis && simpis.length) {
      this.simpis.next([simpi, ...simpis]);
    } else {
      this.simpis.next([simpi]);
    }
  }

  public saveSimpi(simpiId: string, simpiToUpdate: SimpiChangeRequest): Observable<HttpResponse<any>> {
    const options = { headers: this.headers, observe: 'response' as const };
    return this.httpClient.put<ChangeSimpiResponse>(`${this.restUrl}/api/v1/simpis/${simpiId}`, simpiToUpdate, options).pipe(
      tap(resp => {
        if (resp.status === 200) {
          const simpis = this.simpis.getValue();
          if (simpis && simpis.length) {
            const simpi = simpis.find(x => x.simpiId === simpiId);
            if (simpi) {
              simpi.deploymentInfo = simpiToUpdate.deploymentInfo as unknown as DeploymentInfoResponse;
              simpi.description = simpiToUpdate.description;
              if (simpi.iconColor) {
                simpi.iconColor = simpiToUpdate.iconColor;
              }
              simpi.thumbnailId = simpiToUpdate.thumbnailId;
              if (simpi.thumbnailId) {
                simpi.thumbnailUrl = this.getThumbnailUrl(simpi.thumbnailId);
              }
              if (simpi.iconColor) {
                delete simpi.thumbnailUrl;
              }
              simpi.title = simpiToUpdate.title;
              simpi.alias = resp.body?.newSimpiAlias;
              simpi.groupName = resp.body?.groupName;
            }
            this.simpis.next(simpis);
          }
        }
      })
    );
  }

  public changeSimpiOrder(idsAndIndexes: ChangeOrderRequest[]): Observable<HttpResponse<any>> {
    const options = {
      headers: this.headers,
      observe: 'response' as const
    };
    return this.httpClient.put<HttpResponse<any>>(`${this.restUrl}/api/v1/simpis`, idsAndIndexes, options).pipe(
      tap(resp => {
        if (resp.status === 204) {
          const simpis = this.simpis.getValue();
          const newSimps = simpis.map(s => {
            const simpi = idsAndIndexes.find(x => x.objectId === s.simpiId);
            if (simpi) {
              s.positionIndex = simpi.positionIndex;
            }
            return s;
          });
          newSimps.sort((a, b) => a.positionIndex - b.positionIndex);
          this.simpis.next(newSimps);
        }
      })
    );
  }

  public addSimpi(simpi: CreateSimpiRequest): Observable<SimpiInsertResponse> {
    const options = { headers: this.headers };
    return this.httpClient.post<SimpiInsertResponse>(`${this.restUrl}/api/v1/simpis`, simpi, options)
      .pipe(tap(simpiInsertResponse => {
        simpi.simpiId = simpiInsertResponse.id;
        this.updateSimpis(this.convertCreateSimpiRequestToSimpiResponse(simpi));
      }));
  }

  public getSimpi(simpiId: string): Observable<SimpiResponse> {
    return from(this.authService.getToken()).pipe(mergeMap(token => {
      let url: string;
      if (token) {
        url = `${this.restUrl}/api/v1/simpis/${simpiId}`;
      } else {
        url = `${this.restUrl}/api/v1/simpis/published/${simpiId}`;
      }
      const options = { headers: this.headers };
      return this.httpClient.get<SimpiResponse>(url, options)
        .pipe(
          tap(simpi => {
            if (simpi) {
              if (simpi.thumbnailId) {
                simpi.thumbnailUrl = this.getThumbnailUrl(simpi.thumbnailId);
              }
            }
          })
        );
    }));
  }

  public getSimpiForPlayback(simpiId: string): Observable<SimpiPlaybackResponse> {
    const options = { headers: this.headers };
    return this.httpClient.get<SimpiPlaybackResponse>(`${this.restUrl}/api/v2/simpis/${simpiId}`, options)
      .pipe(tap(simpi => {
        if (simpi?.primaryColor) {
          document.documentElement.style.setProperty('--simpi-theme-primary-color', simpi.primaryColor);
        }
      }));
  }

  public getSimpisByProductId(productId: string, includeDeleted: boolean = false, refresh: boolean = false, cache: boolean = true): Observable<SimpiResponse[]> {
    if (this.simpis.getValue() && this.simpis.getValue().length >= 1 && !refresh) {
      return this.simpis$;
    }
    return this.requestSimpis(productId, includeDeleted).pipe(
      share(),
      map(s => {
        if (s) {
          s.sort((a, b) => {
            return a.positionIndex - b.positionIndex;
          });
          return s;
        }
      }),
      tap(simpis => {
        if (simpis) {
          simpis.forEach(s => {
            if (s.thumbnailId) {
              s.thumbnailUrl = this.getThumbnailUrl(s.thumbnailId);
            } else {
              s.thumbnailId = null;
            }
            if (s.iconColor === '') {
              s.iconColor = null;
            }
          });
        }
        if (cache) {
          this.simpis.next(simpis);
        }
      })
    );
  }

  public getSimpiGroupName(simpiId: string): Observable<GroupNameResponse> {
    const options = { headers: this.headers };
    return this.httpClient.get<GroupNameResponse>(
      `${this.restUrl}/api/v1/simpis/${simpiId}/groupName`,
      options
    );
  }

  public getAllSimpiGroupNames(): Observable<SimpiGroupNamesResponse> {
    const options = { headers: this.headers };
    return this.httpClient.get<SimpiGroupNamesResponse>(`${this.restUrl}/api/v1/simpis/groupNames`, options)
      .pipe(share());
  }

  private requestSimpis(productId: string, includeDeleted: boolean): Observable<SimpiResponse[]> {
    return from(this.authService.getToken()).pipe(mergeMap(token => {
      const options = { headers: this.headers };
      if (includeDeleted) {
        return this.httpClient.get<SimpiResponse[]>(`${this.restUrl}/api/v1/simpis/all/product/${productId}`, options).pipe(
          share()
        );
      }
      let url: string;
      if (token) {
        url = `${this.restUrl}/api/v1/simpis/product/${productId}`;
      } else {
        url = `${this.restUrl}/api/v1/simpis/product/public/${productId}`;
      }
      return this.httpClient.get<SimpiResponse[]>(url, options).pipe(
        share()
      );
    }));
  }

  public uploadThumbnail(file: any): Observable<string> {
    const formData = new FormData();
    formData.append('thumbnail', file, file.name);

    const options = { headers: this.fileHeaders, observe: 'response' as const };
    return this.httpClient.post<any>(`${this.restUrl}/api/v1/simpis/thumbnail`, formData, options)
      .pipe(map(resp => resp.body.imageId)); // return the imageId of the uploaded image;
  }

  public getThumbnailUrl(imageId: string): string {
    if (imageId) {
      return `${this.restUrl}/api/v1/simpis/thumbnail/${imageId}`;
    } else {
      return '';
    }
  }

  public removeThumbnail(imageId: string): Observable<HttpResponse<any>> {
    const options = { headers: this.headers, observe: 'response' as const };
    return this.httpClient.delete(`${this.restUrl}/api/v1/simpis/thumbnail/${imageId}`, options).pipe(
      catchError(this.errorHandler)
    );
  }

  public restoreSimpi(simpiId: string): Observable<HttpResponse<any>> {
    const body = {
      simpiId,
      deleted: false
    };

    const options = { headers: this.headers, observe: 'response' as const };
    return this.httpClient.put(`${this.restUrl}/api/v1/simpis/${simpiId}`, body, options).pipe(
      tap(response => {
        if (response.status === 204) {
          const currentSimpis = this.simpis.getValue();
          if (currentSimpis) {
            const simpis = currentSimpis.map(x => {
              if (x.simpiId === simpiId) {
                x.deleted = false;
                x.deploymentInfo.deploymentState = DeploymentStateResponse.Private;
              }
              return x;
            });
            this.simpis.next(simpis);
          }
          this.deleteRestoreOperation.next('restored simpi');
        }
      })
    );
  }

  public getSimpisByUserId(userId: string): Observable<SimpiResponse[]> {
    const options = { headers: this.headers };
    return this.httpClient.get<SimpiResponse[]>(`${this.restUrl}/api/v1/simpis/users/${userId}`, options).pipe(
      tap(simpis => {
        simpis.forEach(s => {
          if (s.thumbnailId) {
            s.thumbnailUrl = this.getThumbnailUrl(s.thumbnailId);
          } else {
            s.thumbnailId = null;
          }
          if (s.iconColor === '') {
            s.iconColor = null;
          }
        });
      })
    );
  }

  public deleteSimpi(simpiId: string): Observable<HttpResponse<any>> {
    const options = { headers: this.headers, observe: 'response' as const };
    return this.httpClient.delete<HttpResponse<any>>(`${this.restUrl}/api/v1/simpis/${simpiId}`, options).pipe(
      tap(response => {
        if (response.status === 204) {
          const simpis = this.simpis.getValue() || [];
          simpis.map(x => {
            if (x.simpiId === simpiId) {
              x.deleted = true;
              x.deploymentInfo.deploymentState = DeploymentStateResponse.Deleted;
            }
          });
          this.simpis.next(simpis);
          this.deleteRestoreOperation.next('simpi deleted');
        }
      })
    );
  }

  public changeSimpiDeploymentInfo(simpiId: string, deploymentState: DeploymentStateRequest): Observable<HttpResponse<any>> {
    const simpis = this.simpis.getValue();
    const options = { headers: this.headers, observe: 'response' as const };
    if (simpis) {
      const simpi = simpis.find(x => x.simpiId === simpiId);
      const newState: DeploymentInfoRequest = {
        deletionDate: simpi.deploymentInfo.deletionDate,
        deploymentState,
        releaseDate: simpi.deploymentInfo.releaseDate
      };
      return this.httpClient.put<HttpResponse<any>>(`${this.restUrl}/api/v1/simpis/deploymentInfo/${simpiId}`, newState, options).pipe(
        tap(response => {
          if (response.status === 204) {
            simpi.deploymentInfo = newState as unknown as DeploymentInfoResponse;
            this.simpis.next(simpis);
          }
        })
      );
    } else {
      return this.getSimpi(simpiId).pipe(
        switchMap(simpi => {
          if (simpi) {
            const newState: DeploymentInfoRequest = {
              deletionDate: simpi.deploymentInfo.deletionDate,
              releaseDate: simpi.deploymentInfo.releaseDate,
              deploymentState
            };
            return this.httpClient.put<HttpResponse<any>>(`${this.restUrl}/api/v1/simpis/deploymentInfo/${simpiId}`, newState, options);
          }
        })
      );
    }
  }

  public errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error.message || 'server error.');
  }

  public getSimpiByAlias(simpiAlias: string): Observable<SimpiResponse> {
    return from(this.authService.getToken()).pipe(mergeMap(token => {
      let url: string;
      if (token) {
        url = `${this.restUrl}/api/v1/simpis/alias/${simpiAlias}`;
      } else {
        url = `${this.restUrl}/api/v1/simpis/published/alias/${simpiAlias}`;
      }
      const options = { headers: this.headers };
      return this.httpClient.get<SimpiResponse>(url, options);
    }));
  }

  public convertCreateSimpiRequestToSimpiResponse(simpi: CreateSimpiRequest): SimpiResponse {
    const now = new Date();
    const converted: SimpiResponse = {
      creationDate: now,
      creatorId: simpi.creatorId,
      deleted: false,
      resourceIds: [],
      deploymentInfo: {
        deletionDate: simpi.deploymentInfo.deletionDate,
        releaseDate: simpi.deploymentInfo.releaseDate,
        deploymentState: simpi.deploymentInfo.deploymentState as unknown as DeploymentStateResponse,
      },
      showInfoOverlay: simpi.showInfoOverlay,
      description: simpi.description,
      lastUpdated: null,
      positionIndex: 0,
      productId: simpi.productId,
      simpiId: simpi.simpiId,
      stepCount: 0,
      title: simpi.title,
      alias: 'new-simpi',
      iconColor: simpi.iconColor,
      thumbnailId: simpi.thumbnailId,
      thumbnailUrl: simpi.thumbnailId ? this.getThumbnailUrl(simpi.thumbnailId) : null,
      brandLogoImageId: null,
      groupName: simpi.groupName,
    };
    if (!simpi.thumbnailId) {
      delete converted.thumbnailUrl;
    }
    return converted;
  }

  public changeSimpiGroupName(simpiId: string, newSimpiGroupName: string): Observable<HttpResponse<void>> {

    const options = { headers: this.headers, observe: 'response' as const };
    const body: SimpiGroupNameChangeRequest = {
      newGroupName: newSimpiGroupName
    };
    return this.httpClient.put<void>(`${this.restUrl}/api/v1/simpis/${simpiId}/groupname`, body, options).pipe(
      tap(response => {
        if (response.status === 204) {
          const currentSimpis = this.simpis.getValue();
          if (currentSimpis) {
            const simpis = currentSimpis.map(x => {
              if (x.simpiId === simpiId) {
                x.groupName = newSimpiGroupName;
              }
              return x;
            });
            this.simpis.next(simpis);
          }
        }
      })
    );

  }

  public changeSimpiTitle(simpiId: string, newSimpiTitle: string): Observable<HttpResponse<ChangeSimpiResponse>> {
    const options = { headers: this.headers, observe: 'response' as const };
    const body: SimpiTitleChangeRequest = {
      newSimpiTitle
    };
    return this.httpClient.put<ChangeSimpiResponse>(`${this.restUrl}/api/v1/simpis/${simpiId}/title`, body, options).pipe(
      tap(response => {
        if (response.status === 200) {
          const currentSimpis = this.simpis.getValue();
          if (currentSimpis) {
            const simpis = currentSimpis.map(x => {
              if (x.simpiId === simpiId) {
                x.title = newSimpiTitle;
                x.alias = response.body?.newSimpiAlias;
              }
              return x;
            });
            this.simpis.next(simpis);
          }
        }
      })
    );
  }

  public changeSimpiDescription(simpiId: string, newSimpiDescription: string): Observable<HttpResponse<void>> {
    const options = { headers: this.headers, observe: 'response' as const };
    const body: SimpiDescriptionChangeRequest = {
      newSimpiDescription
    };
    return this.httpClient.put<void>(`${this.restUrl}/api/v1/simpis/${simpiId}/description`, body, options).pipe(
      tap(response => {
        if (response.status === 204) {
          const currentSimpis = this.simpis.getValue();
          if (currentSimpis) {
            const simpis = currentSimpis.map(x => {
              if (x.simpiId === simpiId) {
                x.description = newSimpiDescription;
              }
              return x;
            });
            this.simpis.next(simpis);
          }
        }
      })
    );
  }

  public changeStartPanelVisibility(simpiId: string, newStartPanelVisibility: boolean): Observable<HttpResponse<void>> {
    const options = { headers: this.headers, observe: 'response' as const };
    const body: SimpiStartPanelVisibilityChangeRequest = {
      newStartPanelVisibility
    };
    return this.httpClient.put<void>(`${this.restUrl}/api/v1/simpis/${simpiId}/startPanelVisibility`, body, options).pipe(
      tap(response => {
        if (response.status === 204) {
          const currentSimpis = this.simpis.getValue();
          if (currentSimpis) {
            const simpis = currentSimpis.map(x => {
              if (x.simpiId === simpiId) {
                x.showInfoOverlay = newStartPanelVisibility;
              }
              return x;
            });
            this.simpis.next(simpis);
          }
        }
      })
    );
  }

  public changeSimpiThumbnail(simpiId: string, newSimpiThumbnailId: string): Observable<HttpResponse<void>> {
    const options = { headers: this.headers, observe: 'response' as const };
    const body: SimpiThumbnailChangeRequest = {
      newSimpiThumbnailId
    };
    return this.httpClient.put<void>(`${this.restUrl}/api/v1/simpis/${simpiId}/thumbnail`, body, options).pipe(
      tap(response => {
        if (response.status === 204) {
          const currentSimpis = this.simpis.getValue();
          if (currentSimpis) {
            const simpis = currentSimpis.map(x => {
              if (x.simpiId === simpiId) {
                x.thumbnailId = newSimpiThumbnailId;
                x.thumbnailUrl = this.getThumbnailUrl(newSimpiThumbnailId);
              }
              return x;
            });
            this.simpis.next(simpis);
          }
        }
      })
    );
  }

  public cloneSimpi(simpiId: string, targetProductId: string): Observable<SimpiInsertResponse> {
    const options = { headers: this.headers };
    const body: SimpiCloneRequest = {
      targetProductId
    };
    return this.httpClient.post<SimpiInsertResponse>(`${this.restUrl}/api/v1/simpis/${simpiId}/clone`, body, options);
  }
}
