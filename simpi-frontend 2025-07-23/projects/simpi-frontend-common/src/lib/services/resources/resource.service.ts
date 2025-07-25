import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { RestService } from "../base/rest.service";
import { BehaviorSubject, from, Observable, of, throwError } from "rxjs";
import { ResourceResponse, ResourceTypeResponse } from "../../models";
import {
  catchError,
  map,
  mergeMap,
  share,
  shareReplay,
  take,
  tap,
} from "rxjs/operators";
import { COMMON_CONFIG, SimpiCommonConfig } from "../../simpi-common-config";
import { CreateResourceRequest } from "../../models/http/requests/createResourceRequest";
import { CreateResourceResponse } from "../../models/http/responses/createResourceResponse";
import { ResourceChangeRequest } from "../../models/http/requests/resourceChangeRequest";
import { AuthService } from "../auth/auth.service";
import { ViewMode } from "../../models/view-mode";
import { ResourceCount } from "../../models/resource-count";
import { ChangeResourceResponse } from "../../models/http/responses/changeResourceResponse";
import { ResourceTitleChangeRequest } from "../../models/http/requests/resourceTitleChangeRequest";
import { ResourceDescriptionChangeRequest } from "../../models/http/requests/resourceDescriptionChangeRequest";
import { ResourceManufacturerChangeRequest } from "../../models/http/requests/resourceManufacturerChangeRequest";
import { ResourceShowOnStartPanelChangeRequest } from "../../models/http/requests/resourceShowOnStartPanelChangeRequest";
import { ResourceShoppingLinkChangeRequest } from "../../models/http/requests/resourceShoppingLinkChangeRequest";
import { ResourceTypeChangeRequest } from "../../models/http/requests/resourceTypeChangeRequest";
import { ResourceThumbnailChangeRequest } from "../../models/http/requests/resourceThumbnailChangeRequest";

@Injectable({ providedIn: "root" })
export class ResourceService extends RestService {
  private readonly restUrl: string;

  private currentResourceView: BehaviorSubject<ViewMode> =
    new BehaviorSubject<ViewMode>("card");
  public currentResourceView$: Observable<ViewMode> =
    this.currentResourceView.asObservable();

  private resourceCount: BehaviorSubject<ResourceCount> =
    new BehaviorSubject<ResourceCount>({
      published: 0,
      unpublished: 0,
      deleted: 0,
    });
  public resourceCount$: Observable<ResourceCount> =
    this.resourceCount.asObservable();

  private resources: BehaviorSubject<ResourceResponse[]> = new BehaviorSubject<
    ResourceResponse[]
  >(null);
  public resources$: Observable<ResourceResponse[]> =
    this.resources.asObservable();

  private selectedResource: BehaviorSubject<ResourceResponse> =
    new BehaviorSubject<ResourceResponse>(null);
  public selectedResource$: Observable<ResourceResponse> =
    this.selectedResource.asObservable();

  private editModeEnabled: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public editModeEnabled$ = this.editModeEnabled.asObservable();

  private resourceAdded: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public resourceAdded$: Observable<boolean> =
    this.resourceAdded.asObservable();

  private deleteRestoreOperation: BehaviorSubject<string> =
    new BehaviorSubject<string>(null);

  public deleteRestoreOperation$: Observable<string> =
    this.deleteRestoreOperation.asObservable().pipe(shareReplay());

  constructor(
    @Inject(COMMON_CONFIG) private config: SimpiCommonConfig,
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    super(config);
    this.restUrl = this.config.restUrl;
  }
  public getResources(): Observable<ResourceResponse[]> {
    const url: string = `${this.restUrl}/api/v1/resources`;
    const options = { headers: this.headers };
    return this.httpClient.get<ResourceResponse[]>(url, options).pipe(
      share(),
      map((resources) => {
        if (resources) {
          let resourceCount: ResourceCount = {
            published: 0,
            deleted: 0,
            unpublished: 0,
          };
          const mapped = resources.map((x) => {
            if (x.deleted) {
              resourceCount.deleted += 1;
            } else {
              resourceCount.published += 1;
            }
            if (x.thumbnailId) {
              x.thumbnailUrl = this.getResourceImageUrl(x.thumbnailId);
            }
            return x;
          });
          this.resourceCount.next(resourceCount);
          return mapped.sort(
            (a, b) =>
              new Date(b.creationDate).getTime() -
              new Date(a.creationDate).getTime()
          );
        }
      }),
      tap((resources) => {
        this.resources.next(resources);
      })
    );
  }

  public getResourceByAlias(alias: string): Observable<ResourceResponse> {
    const currentValue = this.resources.getValue();
    if (currentValue && currentValue.find((x) => x.alias === alias)) {
      const resource = currentValue.find((x) => x.alias === alias);
      return of(resource);
    } else {
      return this.requestResourceByAlias(alias);
    }
  }

  private requestResourceByAlias(alias: string): Observable<ResourceResponse> {
    const url = `${this.restUrl}/api/v1/resources/${alias}`;
    const options = { headers: this.headers };
    return this.httpClient.get<ResourceResponse>(url, options).pipe(
      map((resource) => {
        if (resource.thumbnailId) {
          resource.thumbnailUrl = this.getResourceImageUrl(
            resource.thumbnailId
          );
        }
        return resource;
      })
    );
  }

  public getResourcesBySimpiId(
    simpiId: string
  ): Observable<ResourceResponse[]> {
    return from(this.authService.getToken()).pipe(
      mergeMap((token) => {
        let url: string;
        if (token) {
          url = `${this.restUrl}/api/v1/simpis/${simpiId}/resources`;
        } else {
          url = `${this.restUrl}/api/v1/simpis/published/${simpiId}/resources`;
        }
        const options = { headers: this.headers };
        return this.httpClient.get<ResourceResponse[]>(url, options).pipe(
          share(),
          map((resources) => {
            if (resources) {
              return resources
                .filter((x) => x && !x.deleted)
                .map((x) => {
                  if (x.thumbnailId) {
                    x.thumbnailUrl = this.getResourceImageUrl(x.thumbnailId);
                  }
                  return x;
                });
            }
          }),
          tap((resources) => {
            this.resources.next(resources);
          })
        );
      })
    );
  }

  public getResourceTypes(): Observable<{ text: string; value: number }[]> {
    return of([
      {
        text: "Product",
        value: 1,
      },
      {
        text: "Tool",
        value: 2,
      },
      {
        text: "Inspiration",
        value: 3,
      },
      {
        text: "Ingredient",
        value: 4,
      },
      {
        text: "Part",
        value: 5,
      },
    ]).pipe(take(1));
  }

  public createResource(
    createRequest: CreateResourceRequest
  ): Observable<HttpResponse<CreateResourceResponse>> {
    const url = `${this.restUrl}/api/v1/resources`;
    const options = { headers: this.headers, observe: "response" as const };
    return this.httpClient
      .post<CreateResourceResponse>(url, createRequest, options)
      .pipe(
        tap((response) => {
          const { id, alias } = response.body;
          if (response.status === 201) {
            const newResource: ResourceResponse = {
              resourceId: id,
              creationDate: new Date().toLocaleDateString("de-DE"),
              description: createRequest.description,
              deleted: false,
              manufacturer: createRequest.manufacturer,
              positionIndex: this.resources.getValue()?.length - 1 || 0,
              resourceType:
                createRequest.resourceType as unknown as ResourceTypeResponse,
              shoppingLink: createRequest.shoppingLink,
              thumbnailId: createRequest.thumbnailId,
              thumbnailUrl: createRequest.thumbnailId
                ? this.getResourceImageUrl(createRequest.thumbnailId)
                : null,
              title: createRequest.title,
              alias,
              simpiCount: 0,
              showOnStartPanel: createRequest.showOnStartPanel,
            };
            const resources = this.resources.getValue();
            const newResources = [newResource, ...resources];
            this.resources.next(newResources);
          }
        })
      );
  }

  public setViewMode(mode: ViewMode): void {
    this.currentResourceView.next(mode);
  }

  public assignResourceToSimpi(
    resourceId: string,
    simpiId: string
  ): Observable<HttpResponse<any>> {
    const url = `${this.restUrl}/api/v1/simpis/${simpiId}/resources/${resourceId}`;
    const options = { headers: this.headers, observe: "response" as const };
    return this.httpClient.post<HttpResponse<any>>(url, null, options).pipe(
      tap((resp) => {
        if (resp.status === 204) {
          const currentResources = this.resources.getValue();
          if (currentResources) {
            const resource = currentResources.find(
              (x) => x.resourceId === resourceId
            );
            if (resource) {
              resource.simpiCount++;
              this.resources.next(currentResources);
            }
          }
        }
      })
    );
  }

  public getResourceImageUrl(imageId: string): string {
    return `${this.restUrl}/api/v1/resources/thumbnail/${imageId}`;
  }

  public setSelectedResource(resource: ResourceResponse): void {
    this.selectedResource.next(resource);
  }

  public setSelectedResourceById(resourceId: string): void {
    const resources = this.resources.getValue();
    if (resources.length) {
      const resourceToSelect = resources.find(
        (x) => x.resourceId === resourceId
      );
      this.selectedResource.next(resourceToSelect);
    }
  }

  public notifyResourceAdded(val: boolean): void {
    this.resourceAdded.next(val);
  }

  public saveResource(
    resourceId: string,
    resourceToUpdate: ResourceChangeRequest
  ): Observable<HttpResponse<any>> {
    const url = `${this.restUrl}/api/v1/resources/${resourceId}`;
    const options = { headers: this.headers, observe: "response" as const };
    return this.httpClient
      .put<HttpResponse<any>>(url, resourceToUpdate, options)
      .pipe(
        tap((resp) => {
          if (resp.ok) {
            const resources = this.resources.getValue();
            const resource = resources.find((x) => x.resourceId === resourceId);
            resource.title = resourceToUpdate.title;
            resource.resourceType =
              resourceToUpdate.resourceType as unknown as ResourceTypeResponse;
            resource.manufacturer = resourceToUpdate.manufacturer;
            resource.shoppingLink = resourceToUpdate.shoppingLink;
            resource.thumbnailId = resourceToUpdate.thumbnailId;
            if (resource.thumbnailId) {
              resource.thumbnailUrl = this.getResourceImageUrl(
                resource.thumbnailId
              );
            }
            if (resp.status === 200) {
              const { newAlias } = resp.body;
              resource.alias = newAlias;
            }
            this.resources.next(resources);
          }
        })
      );
  }

  public changeTitle(
    resourceId: string,
    newTitle: string
  ): Observable<HttpResponse<ChangeResourceResponse>> {
    const options = { headers: this.headers, observe: "response" as const };
    const body: ResourceTitleChangeRequest = {
      newResourceTitle: newTitle,
    };
    return this.httpClient
      .put<ChangeResourceResponse>(
        `${this.restUrl}/api/v1/resources/${resourceId}/title`,
        body,
        options
      )
      .pipe(
        tap((response) => {
          if (response.status === 200) {
            const currentResources = this.resources.getValue();
            if (currentResources) {
              const mapped = currentResources.map((x) => {
                if (x.resourceId === resourceId) {
                  x.title = newTitle;
                  x.alias = response.body?.newAlias;
                }
                return x;
              });
              this.resources.next(mapped);
            }
          }
        })
      );
  }

  public changeDescription(
    resourceId: string,
    newDescription: string
  ): Observable<HttpResponse<void>> {
    const options = { headers: this.headers, observe: "response" as const };
    const body: ResourceDescriptionChangeRequest = {
      newResourceDescription: newDescription,
    };
    return this.httpClient
      .put<void>(
        `${this.restUrl}/api/v1/resources/${resourceId}/description`,
        body,
        options
      )
      .pipe(
        tap((response) => {
          if (response.status === 200) {
            const currentResources = this.resources.getValue();
            if (currentResources) {
              const mapped = currentResources.map((x) => {
                if (x.resourceId === resourceId) {
                  x.description = newDescription;
                }
                return x;
              });
              this.resources.next(mapped);
            }
          }
        })
      );
  }

  public changeShowOnStartPanel(
    resourceId: string,
    newShowOnStartPanel: boolean
  ): Observable<HttpResponse<void>> {
    const options = { headers: this.headers, observe: "response" as const };
    const body: ResourceShowOnStartPanelChangeRequest = {
      newResourceShowOnStartPanel: newShowOnStartPanel,
    };
    return this.httpClient
      .put<void>(
        `${this.restUrl}/api/v1/resources/${resourceId}/showOnStartPanel`,
        body,
        options
      )
      .pipe(
        tap((response) => {
          if (response.status === 200) {
            const currentResources = this.resources.getValue();
            if (currentResources) {
              const mapped = currentResources.map((x) => {
                if (x.resourceId === resourceId) {
                  x.showOnStartPanel = newShowOnStartPanel;
                }
                return x;
              });
              this.resources.next(mapped);
            }
          }
        })
      )
  }

  public changeManufacturer(
    resourceId: string,
    newManufacturer: string
  ): Observable<HttpResponse<void>> {
    const options = { headers: this.headers, observe: "response" as const };
    const body: ResourceManufacturerChangeRequest = {
      newResourceManufacturer: newManufacturer,
    };
    return this.httpClient
      .put<void>(
        `${this.restUrl}/api/v1/resources/${resourceId}/manufacturer`,
        body,
        options
      )
      .pipe(
        tap((response) => {
          if (response.status === 200) {
            const currentResources = this.resources.getValue();
            if (currentResources) {
              const mapped = currentResources.map((x) => {
                if (x.resourceId === resourceId) {
                  x.manufacturer = newManufacturer;
                }
                return x;
              });
              this.resources.next(mapped);
            }
          }
        })
      );
  }

  public changeResourceType(
    resourceId: string,
    newResourceType: number
  ): Observable<HttpResponse<void>> {
    const options = { headers: this.headers, observe: "response" as const };
    const body: ResourceTypeChangeRequest = {
      newResourceType,
    };
    return this.httpClient
      .put<void>(
        `${this.restUrl}/api/v1/resources/${resourceId}/resourceType`,
        body,
        options
      )
      .pipe(
        tap((response) => {
          if (response.status === 200) {
            const currentResources = this.resources.getValue();
            if (currentResources) {
              const mapped = currentResources.map((x) => {
                if (x.resourceId === resourceId) {
                  x.resourceType = newResourceType;
                }
                return x;
              });
              this.resources.next(mapped);
            }
          }
        })
      );
  }

  public changeShoppingLink(
    resourceId: string,
    newShoppingLink: string
  ): Observable<HttpResponse<void>> {
    const options = { headers: this.headers, observe: "response" as const };
    const body: ResourceShoppingLinkChangeRequest = {
      newResourceShoppingLink: newShoppingLink,
    };
    return this.httpClient
      .put<void>(
        `${this.restUrl}/api/v1/resources/${resourceId}/shoppinglink`,
        body,
        options
      )
      .pipe(
        tap((response) => {
          if (response.status === 200) {
            const currentResources = this.resources.getValue();
            if (currentResources) {
              const mapped = currentResources.map((x) => {
                if (x.resourceId === resourceId) {
                  x.shoppingLink = newShoppingLink;
                }
                return x;
              });
              this.resources.next(mapped);
            }
          }
        })
      );
  }

  public uploadThumbnail(file: File): Observable<string> {
    const formData = new FormData();
    formData.append("resourceImage", file, file.name);
    const options = {
      headers: this.fileHeaders,
      observe: "response" as const,
    };
    return this.httpClient
      .post<any>(
        `${this.restUrl}/api/v1/resources/thumbnail`,
        formData,
        options
      )
      .pipe(map((resp) => resp.body.imageId)); // return the imageId of the uploaded image
  }

  public changeThumbnail(
    resourceId: string,
    newResourceThumbnailId: string
  ): Observable<HttpResponse<void>> {
    const options = { headers: this.headers, observe: "response" as const };
    const body: ResourceThumbnailChangeRequest = {
      newResourceThumbnailId,
    };
    return this.httpClient
      .put<void>(
        `${this.restUrl}/api/v1/resources/${resourceId}/thumbnail`,
        body,
        options
      )
      .pipe(
        tap((response) => {
          if (response.status === 204) {
            const currentResources = this.resources.getValue();
            if (currentResources) {
              const mapped = currentResources.map((x) => {
                if (x.resourceId === resourceId) {
                  x.thumbnailId = newResourceThumbnailId;
                  x.thumbnailUrl = this.getResourceImageUrl(
                    newResourceThumbnailId
                  );
                }
                return x;
              });
              this.resources.next(mapped);
            }
          }
        })
      );
  }

  public deleteThumbnail(imageId: string): Observable<HttpResponse<any>> {
    const options = {
      headers: this.headers,
      observe: "response" as const,
    };
    return this.httpClient
      .delete<HttpResponse<any>>(
        `${this.restUrl}/api/v1/resources/thumbnail/${imageId}`,
        options
      )
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(error.message || "server error.");
  }

  public disableEditMode(): void {
    this.editModeEnabled.next(false);
  }

  public enableEditMode(): void {
    this.editModeEnabled.next(true);
  }

  public restoreResource(resourceId: string): Observable<HttpResponse<any>> {
    const body = {
      resourceId,
      deleted: false,
    };

    const options = { headers: this.headers, observe: "response" as const };
    const url = `${this.restUrl}/api/v1/resources/${resourceId}`;
    return this.httpClient.put(url, body, options).pipe(
      tap((response) => {
        if (response.status === 204) {
          const currentResources = this.resources.getValue();
          if (currentResources) {
            const mapped = currentResources.map((x) => {
              if (x.resourceId === resourceId) {
                x.deleted = false;
              }
              return x;
            });

            const resourceCount = { ...this.resourceCount.getValue() };
            resourceCount.deleted -= 1;
            resourceCount.published += 1;
            this.resourceCount.next(resourceCount);
            this.resources.next(mapped);
          }
        }
      })
    );
  }

  public deleteResource(resourceId: string): Observable<HttpResponse<any>> {
    const options = { headers: this.headers, observe: "response" as const };
    return this.httpClient
      .delete<HttpResponse<any>>(
        `${this.restUrl}/api/v1/resources/${resourceId}`,
        options
      )
      .pipe(
        tap((response) => {
          if (response.status === 204) {
            let resources = this.resources.getValue() || [];
            resources = resources.filter((x) => x.resourceId !== resourceId);
            const resourceCount = { ...this.resourceCount.getValue() };
            resourceCount.deleted += 1;
            resourceCount.published -= 1;
            this.resourceCount.next(resourceCount);
            this.resources.next(resources);
          }
        })
      );
  }
}
