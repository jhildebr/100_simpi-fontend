import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import * as jwt from 'jwt-decode';
import { RestService } from '../base/rest.service';
import { LoginRequest, LoginResponse } from '../../models';
import { COMMON_CONFIG, SimpiCommonConfig } from '../../simpi-common-config';
import { TokenRenewalResponse } from '../../models/http/responses/tokenRenewalResponse';
import { AppLoginOrRegistrationRequest } from '../../models/http/requests/appLoginOrRegistrationRequest';
import { AppVerifyCodeRequest } from '../../models/http/requests/appVerifyCodeRequest';
import { StorageService } from '../storage/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends RestService {
  private authUrl: string = 'https://simpi.com/users';

  private _userInfo: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>(null);
  public userInfo$: Observable<LoginResponse> = this._userInfo.asObservable();

  constructor(@Inject(COMMON_CONFIG) private config: SimpiCommonConfig, private httpClient: HttpClient) {
    super(config);
    this.authUrl = config.userServiceUrl;
    this.setUserInfo();
  }

  public async getToken(): Promise<string> {
    const authInfo: string = await StorageService.retrieve(this.authStorageKey);
    if (authInfo) {

      const parsed: LoginResponse = JSON.parse(authInfo);
      return parsed.token;
    }
    return null;
  }

  private setUserInfo(): void {
    StorageService.retrieve(this.authStorageKey).then(authInfo => {
      if (authInfo) {
        const userInfo: LoginResponse = JSON.parse(authInfo);
        this._userInfo.next(userInfo);
        this.setJwtTokenFromStorage();
      }
    });
  }

  public async isTokenExpired(token?: string): Promise<boolean> {
    if (!token) {
      token = await this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  public getTokenExpirationDate(token: string): Date {
    const decoded = jwt(token) as any;

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  public async getDecodedToken(): Promise<string> {
    return await this.getToken().then(token => jwt(token));
  }

  public refreshToken(): Observable<any> {
    return from(StorageService.retrieve(this.authStorageKey)).pipe(
      mergeMap((authInfoStr: string) => {
        if (!authInfoStr) {
          return of(null);
        }
        const authInfo: LoginResponse = JSON.parse(authInfoStr);
        const req = {
          refreshToken: authInfo.refreshToken
        };

        return this.httpClient.post<TokenRenewalResponse>(`${this.authUrl}/api/v1/login/renewal`, req, { headers: this.headers }).pipe(
          map((resp: TokenRenewalResponse) => {
            authInfo.token = resp.token;
            authInfo.refreshToken = resp.refreshToken;
            StorageService.store(this.authStorageKey, JSON.stringify(authInfo))
              .then(() => this.setJwtTokenFromStorage())
              .catch(console.error);
            this._userInfo.next(authInfo);
            return authInfo;
          })
        );
      })
    );

  }

  public login(authInfo: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.authUrl}/api/v1/login`, authInfo, {
      headers: this.headers,
      observe: 'response'
    }).pipe(
      mergeMap(async resp => {
        if (resp.status === 200) {
          const loginResponse = resp.body;
          await StorageService.store(this.authStorageKey, JSON.stringify(loginResponse))
            .then(() => this.setJwtTokenFromStorage())
            .catch(console.error);
          this._userInfo.next(loginResponse);
          return loginResponse;
        }
      })
    );
  }

  public logout(): void {
    StorageService.removeItem(this.authStorageKey)
      .then(() => this._userInfo.next(null))
      .catch(console.error);
  }

  public sendVerificationCodeToUser(request: AppLoginOrRegistrationRequest): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(`${this.authUrl}/api/v1/login/app`, request, {
      headers: this.headers,
      observe: 'response'
    }).pipe(
      map(resp => {
        return resp.status === 200;
      })
    );
  }

  public verifyCodeToLogIn(request: AppVerifyCodeRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.authUrl}/api/v1/login/verify`, request, {
      headers: this.headers,
      observe: 'response'
    }).pipe(
      map(resp => {
        if (resp.status === 200) {
          const loginResponse = resp.body;
          StorageService.store(this.authStorageKey, JSON.stringify(loginResponse))
            .then(() => this.setJwtTokenFromStorage())
            .catch(console.error);
          this._userInfo.next(loginResponse);
          return loginResponse;
        }
      })
    );
  }

}
