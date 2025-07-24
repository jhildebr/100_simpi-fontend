import { Inject, Injectable } from "@angular/core";
import { RestService } from "../base/rest.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { COMMON_CONFIG, SimpiCommonConfig } from "../../simpi-common-config";
import { map, shareReplay, tap, withLatestFrom } from "rxjs/operators";

import {
  BrandResponse,
  LanguageResponse,
  BrandChangeRequest,
} from "../../models";

@Injectable({
  providedIn: "root",
})
export class BrandService extends RestService {
  private readonly restUrl: string;

  private templateTranslations: BehaviorSubject<LanguageResponse[]> =
    new BehaviorSubject<LanguageResponse[]>([]);

  public templateTranslations$: Observable<LanguageResponse[]> =
    this.templateTranslations.asObservable().pipe(shareReplay(1));

  constructor(
    @Inject(COMMON_CONFIG) private config: SimpiCommonConfig,
    private httpClient: HttpClient
  ) {
    super(config);
    this.restUrl = this.config.restUrl;
  }

  public getBrandById(brandId: string): Observable<BrandResponse> {
    const options = { headers: this.headers };
    return this.httpClient
      .get<BrandResponse>(`${this.restUrl}/api/v1/brands/${brandId}`, options)
      .pipe(shareReplay());
  }

  public getBrandByAlias(alias: string): Observable<BrandResponse> {
    const options = { headers: this.headers };
    return this.httpClient.get<BrandResponse>(
      `${this.restUrl}/api/v1/brands/alias/${alias}`,
      options
    );
  }

  public getBrandsByUserId(userId: string): Observable<BrandResponse[]> {
    const options = { headers: this.headers };
    return this.httpClient.get<BrandResponse[]>(
      `${this.restUrl}/api/v1/brands/user/${userId}`,
      options
    );
  }

  public changeBrand(
    brandId: string,
    brandChangeRequest: BrandChangeRequest
  ): Observable<void> {
    const options = { headers: this.headers };
    return this.httpClient.put<void>(
      `${this.restUrl}/api/v1/brands/${brandId}`,
      brandChangeRequest,
      options
    );
  }

  /**
   * Uploads the given file to the backend server and returns the generated image id that references it.
   * @param file The file to upload. Must be an image.
   */
  public uploadLogo(file: File): Observable<string> {
    const formData = new FormData();
    formData.append("logo", file, file.name);
    const options = { headers: this.fileHeaders, observe: "response" as const };
    return this.httpClient
      .post<any>(`${this.restUrl}/api/v1/brands/logo`, formData, options)
      .pipe(map((resp) => resp.body.imageId));
  }

  /**
   * Delets the logo with the given image id from the server.
   * @param imageId Image id that references the logo that should be deleted.
   */
  public deleteLogo(imageId: string): Observable<HttpResponse<any>> {
    const options = { headers: this.headers, observe: "response" as const };
    return this.httpClient.delete<HttpResponse<any>>(
      `${this.restUrl}/api/v1/brands/logo/${imageId}`,
      options
    );
  }

  public getLogoImageUrl(imageId: string): string {
    return `${this.restUrl}/api/v1/brands/logo/${imageId}`;
  }

  public getTemplateLanguages(brandId: string): Observable<LanguageResponse[]> {
    const options = { headers: this.headers };
    return this.httpClient
      .get<LanguageResponse[]>(
        `${this.config.restUrl}/api/v1/brands/${brandId}/templates/languages`,
        options
      )
      .pipe(tap((languages) => this.templateTranslations.next(languages)));
  }

  public addTemplateTranslation(
    brandId: string,
    language: LanguageResponse
  ): Observable<boolean> {
    const options = {
      headers: this.headers,
      observe: "response" as const,
    };
    return this.httpClient
      .post<void>(
        `${this.config.restUrl}/api/v1/brands/${brandId}/templates/languages/${language.code}`,
        null,
        options
      )
      .pipe(
        withLatestFrom(this.templateTranslations$),
        map(([response, targets]) => {
          if (response.ok) {
            this.templateTranslations.next(
              targets.concat({ code: language.code, name: language.name, voice: language.voice })
            );
            return true;
          } else {
            return false;
          }
        })
      );
  }

  public deleteTemplateTranslation(
    language: LanguageResponse,
    brandId: string
  ): Observable<boolean> {
    const options = {
      headers: this.headers,
      observe: "response" as const,
    };
    return this.httpClient
      .delete<void>(
        `${this.restUrl}/api/v1/brands/${brandId}/templates/languages/${language.code}`,
        options
      )
      .pipe(
        withLatestFrom(this.templateTranslations$),
        map(([response, targets]) => {
          if (response.ok) {
            this.templateTranslations.next(
              targets.filter((x) => x.code !== language.code)
            );
            return true;
          } else {
            return false;
          }
        })
      );
  }

  /**
   * Get available voices from Azure Speech Services
   */
  public getAvailableVoices(language: LanguageResponse): Observable<string[]> {
    const options = { headers: this.headers };
    return this.httpClient.get<string[]>(`${this.restUrl}/api/v1/brands/languages/${language.code}/voices`, options);
  }

  /**
   * Get the voice assigned to a specific language for a brand
   */
  public getVoiceForLanguage(
    brandId: string,
    languageCode: string
  ): Observable<string> {
    const options = { headers: this.headers };
    return this.httpClient.get<string>(
      `${this.restUrl}/api/v1/brands/${brandId}/templates/languages/${languageCode}/voice`,
      options
    );
  }

  /**
   * Set the voice for a specific language in a brand
   */
  public setVoiceForLanguage(
    brandId: string,
    languageCode: string,
    voice: string
  ): Observable<boolean> {
    const options = { headers: this.headers, observe: 'response' as const };
    return this.httpClient.post<void>(
      `${this.restUrl}/api/v1/brands/${brandId}/templates/languages/${languageCode}/voices/${voice}`,
      null,
      options
    ).pipe(
      map(response => response.ok)
    );
  }
}
