import { RestService } from '../base/rest.service';
import { Inject, Injectable } from '@angular/core';
import { COMMON_CONFIG, SimpiCommonConfig } from '../../simpi-common-config';
import { HttpClient } from '@angular/common/http';
import { CustomerResponse } from '../../models/http/responses/customerResponse';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService extends RestService {
  private readonly restUrl: string;

  constructor(@Inject(COMMON_CONFIG) private config: SimpiCommonConfig, private httpClient: HttpClient) {
    super(config);
    this.restUrl = config.userServiceUrl;
  }

  public getCustomerByUrl(url: string): Observable<CustomerResponse> {
    const options = { headers: this.headers };
    return this.httpClient.get<CustomerResponse>(`${this.restUrl}/api/v1/customers/${url}`, options);
  }
}
