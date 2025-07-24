import { HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../../models';
import { StorageService } from '../storage/storage.service';
import { SimpiCommonConfig } from '../../simpi-common-config';

export class RestService {
  protected readonly authStorageKey: string = 'auth';
  protected endpoint: string;
  private static jwtToken: string;

  constructor(config: SimpiCommonConfig) {
    this.authStorageKey = config?.authStorageKey ?? 'auth';
    this.setJwtTokenFromStorage();
  }

  public get fileHeaders(): HttpHeaders {
    return this.getFileHeaders();
  }

  public get headers(): HttpHeaders {
    return this.getJsonHeaders();
  }

  public getAuthHeaderValue(): string {
    if (RestService.jwtToken !== null) {
      return 'Bearer ' + RestService.jwtToken;
    }

    return undefined;
  }

  public addAuthToHeaders(headers: HttpHeaders): HttpHeaders {
    if (RestService.jwtToken !== null) {
      return headers.append('Authorization', 'Bearer ' + RestService.jwtToken);
    }

    return headers;
  }

  private getFileHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = this.addAuthToHeaders(headers);

    return headers;
  }

  private getJsonHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    headers = this.addAuthToHeaders(headers);

    return headers;
  }

  protected setJwtTokenFromStorage() {
    StorageService.retrieve(this.authStorageKey).then(userInfoJson => {
      if (userInfoJson) {
        let authInfo = <LoginResponse> JSON.parse(userInfoJson);
        RestService.jwtToken = authInfo.token;
      }
    });
  }

}
