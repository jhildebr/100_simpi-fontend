import { HttpClient, HttpResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, share, tap } from "rxjs/operators";
import { AddCustomStickerResponse, CustomStickerResponse, AddCustomStickerRequest } from "../../models";
import { COMMON_CONFIG, SimpiCommonConfig } from "../../simpi-common-config";
import { RestService } from "../base/rest.service";
import { ResourceService } from "../resources/resource.service";


@Injectable({ providedIn: 'root' })
export class CustomStickerService extends RestService{

    private readonly restUrl: string;

    private customStickers: BehaviorSubject<CustomStickerResponse[]> = new BehaviorSubject<CustomStickerResponse[]>(null);
    public customStickers$: Observable<CustomStickerResponse[]> = this.customStickers.asObservable();

    constructor(
        @Inject(COMMON_CONFIG) private config: SimpiCommonConfig,
        private httpClient: HttpClient,
        private resourceService: ResourceService
    ) {
        super(config);
        this.restUrl = this.config.restUrl;
    }

    public getCustomStickers(): Observable<CustomStickerResponse[]>
    {
        const url: string = `${this.restUrl}/api/v1/resources/customstickers`;
        const options = { headers: this.headers };
        return this.httpClient.get<CustomStickerResponse[]>(url, options).pipe(
            share(),
            map((stickers) => {
                if (stickers) {
                    const mapped = stickers.map((x) => {
                        if (x.thumbnailId)
                        {
                            x.thumbnailUrl = this.resourceService.getResourceImageUrl(x.thumbnailId);
                        }
                        return x;
                    });
                    
                    return mapped.sort(
                        (a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
                    );
                }
                return stickers;
            }),
            tap((customSticker) => {
                this.customStickers.next(customSticker);
            })
        )
    }

    public createCustomSticker(createRequest: AddCustomStickerRequest): Observable<HttpResponse<AddCustomStickerResponse>>
    {
    	const url = `${this.restUrl}/api/v1/resources/customsticker`;
        const options = { headers: this.headers, observe: "response" as const};

        return this.httpClient
            .post<AddCustomStickerResponse>(url, createRequest, options)
            .pipe(
            tap((response) => {
                const { id } = response.body;
                if (response.status === 201) {
                    const newCustomSticker: CustomStickerResponse = {
                        id: id,
                        creationDate: new Date().toLocaleDateString("de-DE"),
                        thumbnailId: createRequest.thumbnailId,
                        thumbnailUrl: this.resourceService.getResourceImageUrl(createRequest.thumbnailId),
                        brandId: "",
                        deleted: false
                    };
                    const customStickers = this.customStickers.getValue();
                    const newCustomStickers = [newCustomSticker, ...customStickers];
                    this.customStickers.next(newCustomStickers);
                }
            })
        );
    }

    public assignStickerToSimpi(
        stickerId: string,
        simpiId: string
    ): Observable<HttpResponse<any>>
    {
        const url = `${this.restUrl}/api/v1/simpis/${simpiId}/stickers/${stickerId}`;
        const options = { headers: this.headers, observe: "response" as const };
        return this.httpClient.post<HttpResponse<any>>(url, null, options).pipe(
            tap((resp) => {
                if (resp.status === 204) {
                    const currentStickers = this.customStickers.getValue();
                    if (currentStickers) {
                        const sticker = currentStickers.find((x) => x.id === stickerId);
                        if (sticker) {
                            this.customStickers.next(currentStickers);
                        }
                    }
                }
            })
        );
    }

    public deleteSticker(stickerId: string): Observable<HttpResponse<any>>
    {
        const options = { headers: this.headers, observe: 'response' as const };
        return this.httpClient.delete<HttpResponse<any>>(`${this.restUrl}/api/v1/resources/customstickers/${stickerId}`, options)
            .pipe(
                tap(response => {
                    if (response.status === 204)
                    {
                        const stickers = this.customStickers.getValue() || [];
                        this.customStickers.next(stickers.filter(x => x.id !== stickerId));
                    }
                })
            );
    }
}