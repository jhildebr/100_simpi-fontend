import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RestService } from '../base/rest.service';
import { SimpiCommonConfig, COMMON_CONFIG } from '../../simpi-common-config';
import { Observable, BehaviorSubject, merge, of } from 'rxjs';
import {
  TranslationResponse,
  LanguageResponse,
  LanguageRequest,
  SimpiResponse,
} from '../../models';
import { TranslationTargetResponse } from '../../models';
import {map, mergeMap, shareReplay, tap, withLatestFrom} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TranslationService extends RestService {
  protected restUrl: string;

  public availableLanguages$: Observable<LanguageResponse[]> =
    this.getAvailableLanguages();

  private translations: BehaviorSubject<LanguageResponse[]> =
    new BehaviorSubject<LanguageResponse[]>([]);

  public translations$: Observable<LanguageResponse[]> = merge(
    this.translations.asObservable(),
  ).pipe(shareReplay(1));

  constructor(
    @Inject(COMMON_CONFIG) protected config: SimpiCommonConfig,
    protected httpClient: HttpClient
  ) {
    super(config);
    console.log('constru8ctor config', config);
    this.restUrl = this.config.restUrl;
  }

  public getAvailableLanguages(): Observable<LanguageResponse[]> {
    const options = { headers: this.headers };
    return this.httpClient.get<LanguageResponse[]>(
      `${this.config.restUrl}/api/v1/translations/languages/available`,
      options
    );
  }

  // [Route("api/v1/brands/template/${brandId}/languages/${language.code}")]

  // public addTemplateTranslation(
  //   brandId: string,
  //   language: LanguageResponse
  // ): Observable<boolean> {
  //   const options = {
  //     headers: this.headers,
  //     observe: 'response' as const,
  //   };
  //   console.log('addTranslation_service');
  //   console.log('Rest URL: ' + this.restUrl);
  //   return this.httpClient
  //     .post<void>(
  //       `${this.restUrl}/api/v1/brands/template/${brandId}/languages/${language.code}`,
  //       null,
  //       options)
  //     .pipe(
  //       tap(console.log),
  //       withLatestFrom(this.translations$),
  //       map(([response, targets]) => {
  //         if (response.ok) {
  //           console.log('Add OK');
  //           this.translations.next(targets.concat({code: language.code, name: language.name}));
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       }));
  // }

  public deleteTranslation(language: LanguageResponse): Observable<boolean> {
    const options = {
      headers: this.headers,
      observe: 'response' as const,
    };
    return this.httpClient
      .delete<void>(
        `${this.restUrl}/api/v1/translations/targets/${language.code}`,
        options
      )
      .pipe(
        withLatestFrom(this.translations$),
        map(([response, targets]) => {
          if (response.ok) {
            console.log('Remove OK');
            // this.translations.next(
            //   targets.filter((x) => x.language != language)
            // );
            return true;
          } else {
            return false;
          }
        })
      );
  }
}
