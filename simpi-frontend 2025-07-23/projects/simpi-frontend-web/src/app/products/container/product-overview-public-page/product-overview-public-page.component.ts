import {Component, OnInit} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {ProductService} from '../../../../../../simpi-frontend-common/src/lib/services';
import {
  DeploymentStateResponse,
  ProductResponse,
  SimpiResponse
} from '../../../../../../simpi-frontend-common/src/lib/models';
import {ActivatedRoute} from '@angular/router';
import {SimpiService} from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {ShareService} from '../../../shared/services/share.service';
import {Meta, Title} from '@angular/platform-browser';
import {BrandService} from '../../../../../../simpi-frontend-common/src/lib/services/brand/brand.service';
import {NotAvailableReasonType} from 'projects/simpi-frontend-common/src/lib/models/notAvailableReasonType';
import {SimpiGroup} from '../../../../../../simpi-frontend-common/src/lib/models/simpi-group';

@Component({
  template: `
    <div class="container h-100">
      <sim-not-available *ngIf="productNotAvailable" [reason]="notAvailableReason"></sim-not-available>
      <img *ngIf="!productNotAvailable && brandLogoImageUrl" [src]="brandLogoImageUrl"
           class="img-fluid product-page-brand-logo" alt="Brand Logo">
      <sim-product-details *ngIf="!productNotAvailable" [product]="product$ | async" [simpis]="simpis$ | async"
                           [simpiGroups]="simpiGroups$ | async" [readonly]="true" (shareProduct)="onShare()">
      </sim-product-details>
      <div class="mt-auto"></div>
      <footer class="footer">
        <div class="d-flex flex-column flex-md-row h-100 align-items-center-sm">
          <div>
            <a href="https://www.simpi.com/imprint">Impressum</a>
            |
            <a href="https://www.simpi.com/data-privacy">Datenschutzbestimmungen</a>
          </div>
          <div class="ml-auto"></div>
          <div>
            © {{ copyRightsYear }} SIMPI GmbH. Alle Rechte vorbehalten
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      max-width: 960px;
    }

    .footer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }

    .product-page-brand-logo {
      height: 50px;
      max-width: 200px;
      display: block;
      object-fit: contain;
      margin: 30px auto;
    }
  `]
})

export class ProductOverviewPublicPageComponent implements OnInit {
  private _productName: string;
  private _productAlias: string;
  private _brandAlias: string;
  public product$: Observable<ProductResponse>;
  public simpis$: Observable<SimpiResponse[]>;
  public simpiGroups$: Observable<SimpiGroup[]>;
  public productNotAvailable: boolean = false;
  public brandLogoImageUrl: string;
  public notAvailableReason: NotAvailableReasonType;
  public copyRightsYear = new Date().getFullYear();

  constructor(private productService: ProductService, private route: ActivatedRoute,
              private simpiService: SimpiService, private shareService: ShareService,
              private metaService: Meta, private titleService: Title, private brandService: BrandService) {
  }

  public ngOnInit(): void {
    const {brandAlias, productAlias} = this.route.snapshot.params;

    this.product$ = this.productService.getProductByAlias(brandAlias, productAlias)
      .pipe(
        tap((prod) => {
          if (prod) {
            this._productName = prod.productName;
            this._productAlias = prod.productAlias;
            this._brandAlias = prod.brandAlias;
            this.brandLogoImageUrl = this.brandService.getLogoImageUrl(prod.brandLogoImageId);
            this.simpis$ = this.simpiService.getSimpisByProductId(prod.productId, false, true);
            this.simpiGroups$ = this.simpis$.pipe(map(x => this.groupSimpis(x)));
            this.productNotAvailable = false;
            this.setPageMetadata(prod);
          } else {
            this.setNoIndexMetaTag();
          }
        }),
        catchError(err => {
          this.productNotAvailable = true;
          if (err?.status === 404) {
            this.notAvailableReason = NotAvailableReasonType.NOT_FOUND;
          } else if (err?.status === 403) {
            this.notAvailableReason = NotAvailableReasonType.PRIVATE;
          } else {
            console.error(err);
          }
          return EMPTY;
        }));
  }

  public onShare(): void {
    const text = this._productName ? `Check out this how-to! ${this._productName}` : undefined;
    const url = `${environment.baseUrl}/${this._brandAlias}/product/${this._productAlias}/overview`;
    this.shareService.share(this._productName, text, url);
  }

  private groupSimpis(simpis: SimpiResponse[]): SimpiGroup[] {
    const simpiGroups: SimpiGroup[] = [];
    for (const simpi of simpis) {
      if (simpiGroups.some(x => x.groupName === simpi.groupName)) {
        simpiGroups.find(x => x.groupName === simpi.groupName).simpis.push(simpi);
      } else {
        simpiGroups.push({ groupName: simpi.groupName, simpis: [simpi] });
      }
    }
    return simpiGroups.sort(this.sortByGroupName);
  }

  private sortByGroupName = (a: SimpiGroup, b: SimpiGroup) => {
    if (a.groupName === b.groupName) {
      return 0;
    }
    if (this.isNullOrEmpty(a.groupName)) {
      return -1;
    }
    if (this.isNullOrEmpty(b.groupName)) {
      return 1;
    }
    return a.groupName.localeCompare(b.groupName);
  }

  private isNullOrEmpty(str: string): boolean {
    return (str == null || !str || str.length === 0);
  }
  private setPageMetadata(product: ProductResponse): void {
    this.titleService.setTitle('SIMPIS for ' + product.brandName + ' ' + product.productName);
    this.setDescriptionMetaTag(product);
    if (product.deploymentState !== DeploymentStateResponse.Public) {
      this.setNoIndexMetaTag();
    }
  }

  private setDescriptionMetaTag(product: ProductResponse): void {
    this.metaService.addTag({
      name: 'description',
      content: 'A collection of interactive how-tos for ' + product.brandName + ' ' + product.productName,
    });
  }

  private setNoIndexMetaTag(): void {
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex',
    });
  }
}
