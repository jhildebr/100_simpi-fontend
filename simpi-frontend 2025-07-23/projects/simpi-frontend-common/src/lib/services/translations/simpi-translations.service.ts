import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { TranslationService } from "./translations.service";
import { SimpiCommonConfig, COMMON_CONFIG } from "../../simpi-common-config";
import { Observable, BehaviorSubject, merge, of } from "rxjs";
import {
  TranslationResponse,
  LanguageResponse,
  LanguageRequest,
  SimpiResponse,
} from "../../models";
import { TranslationTargetResponse } from "../../models";
import { map, mergeMap, shareReplay, withLatestFrom } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class SimpiTranslationService extends TranslationService {
  private selectedSimpi: BehaviorSubject<SimpiResponse> =
    new BehaviorSubject<SimpiResponse>(null);

  public selectedSimpi$: Observable<SimpiResponse> = this.selectedSimpi
    .asObservable()
    .pipe(shareReplay(1));

  public originalLanguage$: Observable<LanguageResponse> =
    this.selectedSimpi$.pipe(
      mergeMap((s) => this.getOriginalLanguage(s.simpiId)),
      shareReplay(1)
    );

  private translationTargets: BehaviorSubject<TranslationTargetResponse[]> =
    new BehaviorSubject<TranslationTargetResponse[]>([]);

  public translationTargets$: Observable<TranslationTargetResponse[]> = merge(
    this.translationTargets.asObservable(),
    this.selectedSimpi$.pipe(
      mergeMap((simpi) => this.getTranslationTargets(simpi.simpiId))
    )
  ).pipe(shareReplay(1));

  public availableLanguages$: Observable<LanguageResponse[]> =
    this.translationTargets$.pipe(
      mergeMap(() => this.getAvailableLanguages()),
      shareReplay(1)
    );

  constructor(
    @Inject(COMMON_CONFIG) protected config: SimpiCommonConfig,
    protected httpClient: HttpClient
  ) {
    super(config, httpClient);
    this.restUrl = this.config.restUrl;
  }

  public selectSimpi(simpi: SimpiResponse): void {
    if (simpi === null) {
      this.selectedSimpi.next(null);
    } else {
      this.selectedSimpi.next(simpi);
    }
  }

  public getOriginalLanguage(simpiId: string): Observable<LanguageResponse> {
    const options = { headers: this.headers };
    return this.httpClient.get<LanguageResponse>(
      `${this.restUrl}/api/v1/translations/${simpiId}/language`,
      options
    );
  }

  public setOriginalLanguage(
    simpiId: string,
    language: LanguageResponse
  ): Observable<HttpResponse<void>> {
    const options = {
      headers: this.headers,
      observe: "response" as const,
    };
    const requestBody: LanguageRequest = {
      languageCode: language.code,
    };
    return this.httpClient.put<void>(
      `${this.restUrl}/api/v1/translations/${simpiId}/language`,
      requestBody,
      options
    );
  }

  public getTranslationTargets(
    simpiId: string
  ): Observable<TranslationTargetResponse[]> {
    const options = { headers: this.headers };
    return this.httpClient.get<TranslationTargetResponse[]>(
      `${this.restUrl}/api/v1/translations/${simpiId}/targets`,
      options
    );
  }

  public getTranslations(
    simpiId: string,
    languageCode: string
  ): Observable<TranslationResponse[]> {
    const options = { headers: this.headers };
    return this.httpClient.get<TranslationResponse[]>(
      `${this.restUrl}/api/v1/translations/${simpiId}/${languageCode}`,
      options
    );
  }

  public addTranslationTarget(language: LanguageResponse): Observable<boolean> {
    const options = {
      headers: this.headers,
      observe: "response" as const,
    };
    return this.httpClient
      .put<void>(
        `${this.restUrl}/api/v1/translations/${this.selectedSimpi.value.simpiId}/targets/${language.code}`,
        null,
        options
      )
      .pipe(
        withLatestFrom(this.translationTargets$),
        map(([response, targets]) => {
          if (response.ok) {
            console.log("Add OK");
            this.translationTargets.next(
              targets.concat({
                language,
                userProvided: false,
                userProvidedMetadata: false,
                outdatedMetadata: false,
                outdated: false,
              })
            );
            return true;
          } else {
            return false;
          }
        })
      );
  }

  public removeTranslationTarget(
    language: LanguageResponse
  ): Observable<boolean> {
    const options = {
      headers: this.headers,
      observe: "response" as const,
    };
    return this.httpClient
      .delete<void>(
        `${this.restUrl}/api/v1/translations/${this.selectedSimpi.value.simpiId}/targets/${language.code}`,
        options
      )
      .pipe(
        withLatestFrom(this.translationTargets$),
        map(([response, targets]) => {
          if (response.ok) {
            console.log("Remove OK");
            this.translationTargets.next(
              targets.filter((x) => x.language != language)
            );
            return true;
          } else {
            return false;
          }
        })
      );
  }

  public resetTranslationTarget(
    language: LanguageResponse
  ): Observable<boolean> {
    const options = {
      headers: this.headers,
      observe: "response" as const,
    };
    return this.httpClient
      .post<void>(
        `${this.restUrl}/api/v1/translations/${this.selectedSimpi.value.simpiId}/targets/${language.code}/reset`,
        null,
        options
      )
      .pipe(
        withLatestFrom(this.translationTargets$),
        map(([response, targets]) => {
          if (response.ok) {
            console.log("Reset OK");
            const index = targets.findIndex((t) => t.language === language);
            targets[index].userProvided = false;
            targets[index].userProvidedMetadata = false;
            this.translationTargets.next(targets);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  public reloadTranslations(): void {
    this.selectedSimpi.next(this.selectedSimpi.value);
  }

  public getBestAvailableTranslationTarget(
    simpiId: string,
    userLanguages: readonly string[] = navigator.languages
  ): Observable<string> {
    const options = { headers: this.headers };
    return this.httpClient.post<string>(
      `${this.restUrl}/api/v1/translations/${simpiId}/targets/best`,
      userLanguages,
      options
    );
  }

  public applyTemplate(simpiId): Observable<boolean> {
    const options = {
      headers: this.headers,
      observe: "response" as const,
    };
    return this.httpClient.put<void>(
        `${this.restUrl}/api/v1/translations/simpis/${simpiId}/template`,
        null,
        options
      )
      .pipe(
        map((response) => {
          if (response.ok) {
            this.reloadTranslations();
            return true;
          } else {
            return false;
          }
        })
      );
  }

  public importTranslationCSV(
    simpiId: string,
    file: File
  ): Observable<boolean> {
    const formData = new FormData();
    formData.append("translations", file, file.name);
    const options = {
      headers: this.fileHeaders,
      observe: "response" as const,
    };
    return this.httpClient
      .post<void>(
        `${this.restUrl}/api/v1/translations/import/${simpiId}`,
        formData,
        options
      )
      .pipe(
        map((response) => {
          if (response.ok) {
            this.reloadTranslations();
            return true;
          } else {
            return false;
          }
        })
      );
  }

  public exportTranslationCSV(simpiId: string): Observable<ArrayBuffer> {
    return this.httpClient.get(
      `${this.restUrl}/api/v1/translations/export/${simpiId}`,
      {
        headers: this.fileHeaders,
        observe: "body" as const,
        responseType: "arraybuffer",
      }
    );
  }

  public importMetadataTranslationCSV(
    simpiId: string,
    file: File
  ): Observable<boolean> {
    const formData = new FormData();
    formData.append("translations", file, file.name);
    const options = {
      headers: this.fileHeaders,
      observe: "response" as const,
    };
    return this.httpClient
      .post<void>(
        `${this.restUrl}/api/v1/translations/import/metadata/${simpiId}`,
        formData,
        options
      )
      .pipe(
        map((response) => {
          if (response.ok) {
            this.reloadTranslations();
            return true;
          } else {
            return false;
          }
        })
      );
  }

  public exportMetadataTranslationCSV(
    simpiId: string
  ): Observable<ArrayBuffer> {
    return this.httpClient.get(
      `${this.restUrl}/api/v1/translations/export/metadata/${simpiId}`,
      {
        headers: this.fileHeaders,
        observe: "body" as const,
        responseType: "arraybuffer",
      }
    );
  }
}
