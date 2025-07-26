import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { RestService } from '../base/rest.service';
import { BehaviorSubject, Subject, from, Observable, throwError, of } from 'rxjs';
import {
  CreateProductRequest, DeploymentStateRequest,
  DeploymentStateResponse,
  ProductChangeRequest, ProductDeploymentStateChangeRequest, ProductImageChangeRequest,
  ProductInsertResponse, ProductNameChangeRequest, ProductPageImageChangeRequest,
  ProductResponse
} from '../../models';
import { catchError, map, share, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { COMMON_CONFIG, SimpiCommonConfig } from '../../simpi-common-config';
import { AuthService } from '../auth/auth.service';
import { ChangeProductResponse } from '../../models/http/responses/changeProductResponse';
import {ProductHideTitleChangeRequest} from "../../models/http/requests/productHideTitleChangeRequest";

@Injectable({ providedIn: 'root' })
export class ProductService extends RestService {
  private readonly restUrl: string;

  private selectedProduct: BehaviorSubject<ProductResponse> = new BehaviorSubject<ProductResponse>(null);

  public selectedProduct$: Observable<ProductResponse> = this.selectedProduct.asObservable();

  private addProductRequested: Subject<boolean> = new Subject<boolean>();

  public addProductRequested$ = this.addProductRequested.asObservable();

  private deleteRestoreOperation: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  public deleteRestoreOperation$: Observable<string> = this.deleteRestoreOperation.asObservable();

  private products: BehaviorSubject<ProductResponse[]> = new BehaviorSubject<ProductResponse[]>(null);

  public products$ = this.products.asObservable().pipe(
    shareReplay(1),
  );

  public tempProductImageUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public tempProductImageUrl$ = this.tempProductImageUrl.asObservable();

  public tempProductPageImageUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public tempProductPageImageUrl$ = this.tempProductPageImageUrl.asObservable();


  constructor(@Inject(COMMON_CONFIG) private config: SimpiCommonConfig,
              private httpClient: HttpClient, private authService: AuthService) {
    super(config);
    this.restUrl = this.config.restUrl;
  }

  public updateSimpiCount(productId: string): void {
    const products = this.products.getValue();
    if (products) {
      const product = products.find(x => x.productId === productId);
      product.simpiCount += 1;
      this.products.next(products);
    }
  }

  public saveProduct(productId: string, productToUpdate: ProductChangeRequest): Observable<HttpResponse<any>> {
    const options = { headers: this.headers, observe: 'response' as const };
    return this.httpClient.put<HttpResponse<any>>(`${this.restUrl}/api/v1/products/${productId}`, productToUpdate, options).pipe(
      tap(resp => {
        if (resp.status === 200) {
          const products = this.products.getValue();
          const product = products.find(x => x.productId === productId);
          product.productName = productToUpdate.productName;
          product.productAlias = resp.body.newProductAlias;
          product.productImageId = productToUpdate.productImageId;
          product.productPageImageId = productToUpdate.productPageImageId;
          this.resolveProductImageUrls(product);
          product.deploymentState = productToUpdate.deploymentState as unknown as DeploymentStateResponse;
          this.products.next(products);
        }
      })
    );
  }

  public setTempProductImageUrl(imageUrl: string): void {
    this.tempProductImageUrl.next(imageUrl);
  }

  public setTempProductPageImageUrl(imageUrl: string): void {
    this.tempProductPageImageUrl.next(imageUrl);
  }

  public setSelectedProduct(product: ProductResponse): void {
    this.selectedProduct.next(product);
  }

  public getAllPublishedProducts(): Observable<ProductResponse[]> {
    const url = `${this.restUrl}/api/v1/products/published/all`;
    return this.httpClient.get<ProductResponse[]>(url).pipe(
      tap(products => {
        if (products) {
          const productsWithImages = products.map(product => {
            this.resolveProductImageUrls(product);
            return product;
          }).sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
          this.products.next(productsWithImages);
        }
      })
    );
  }

  public getProduct(productId: string): Observable<ProductResponse> {
    if (this.selectedProduct.value !== null && this.selectedProduct.value.productId === productId) {
      return of(this.selectedProduct.value);
    }
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const options = { headers: this.headers };
        let url: string;
        if (token) {
          url = `${this.restUrl}/api/v1/products/${productId}`;
        } else {
          url = `${this.restUrl}/api/v1/products/published/${productId}`;
        }
        return this.httpClient.get<ProductResponse>(url, options).pipe(
          share(),
          tap(product => {
            if (product) {
              this.resolveProductImageUrls(product);
              this.selectedProduct.next(product);
            }
          })
        );
      })
    );
  }

  /**
   * Gets all products by brandId with optional deleted items
   * @param brandId The brand ID
   * @param includeDeleted wether or not to include deleted items. false by default
   * @returns an Observable stream of products
   */
  public getProducts(brandId: string, includeDeleted: boolean = false, refresh: boolean = false): Observable<ProductResponse[]> {
    if (this.products.getValue() && this.products.getValue().length >= 1 && !refresh) {
      return this.products$;
    }
    return this.requestProducts(brandId, includeDeleted).pipe(
      shareReplay(),
      tap(products => {
        if (products) {
          products.forEach(x => {
            this.resolveProductImageUrls(x);
          });
          this.products.next(products);
        }
      })
    );
  }

  private resolveProductImageUrls(product: ProductResponse) {
    if (product.productImageId) {
      product.productImageUrl = this.getProductImageUrl(product.productImageId);
    } else {
      product.productImageId = null;
    }
    if (product.productPageImageId) {
      product.productPageImageUrl = this.getProductPageImageUrl(product.productPageImageId);
    } else {
      product.productPageImageId = null;
    }
  }

  public uploadProductImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('productImage', file, file.name);
    const options = { headers: this.fileHeaders, observe: 'response' as const };
    return this.httpClient.post<any>(`${this.restUrl}/api/v1/products/productImage`, formData, options)
      .pipe(map(resp => resp.body.imageId)); // return the imageId of the uploaded image
  }

  public uploadProductPageImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('productPageImage', file, file.name);
    const options = { headers: this.fileHeaders, observe: 'response' as const };
    return this.httpClient.post<any>(`${this.restUrl}/api/v1/products/productPageImage`, formData, options)
      .pipe(map(resp => resp.body.imageId)); // return the imageId of the uploaded image
  }

  public getProductImageUrl(imageId: string): string {
    return `${this.restUrl}/api/v1/products/productImage/${imageId}`;
  }

  public getProductPageImageUrl(imageId: string): string {
    return `${this.restUrl}/api/v1/products/productPageImage/${imageId}`;
  }

  public removeProductPageImage(imageId: string): Observable<HttpResponse<any>> {
    const options = { headers: this.headers, observe: 'response' as const };
    return this.httpClient.delete<HttpResponse<any>>(`${this.restUrl}/api/v1/products/productPageImage/${imageId}`, options).pipe(
      catchError(this.errorHandler)
    );
  }

  public removeProductImage(imageId: string): Observable<HttpResponse<any>> {
    const options = { headers: this.headers, observe: 'response' as const };
    return this.httpClient.delete<HttpResponse<any>>(`${this.restUrl}/api/v1/products/productImage/${imageId}`, options).pipe(
      catchError(this.errorHandler)
    );
  }

  public errorHandler(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(error.message || 'server error.');
  }

  private requestProducts(brandId: string, includeDeleted: boolean): Observable<ProductResponse[]> {
    const options = { headers: this.headers };

    if (includeDeleted) {
      return this.httpClient.get<ProductResponse[]>(`${this.restUrl}/api/v1/products/all/brand/${brandId}`, options).pipe(
        shareReplay(1),
        startWith(this.products.getValue())
      );
    }
    return this.httpClient.get<ProductResponse[]>(`${this.restUrl}/api/v1/products/brand/${brandId}`, options).pipe(
      shareReplay(1),
      startWith(this.products.getValue())
    );
  }

  public restoreProduct(productId: string): Observable<HttpResponse<any>> {
    const body = {
      productId,
      deleted: false
    };

    const options = { headers: this.headers, observe: 'response' as const };
    return this.httpClient.put<HttpResponse<any>>(`${this.restUrl}/api/v1/products/${productId}`, body, options).pipe(
      tap(response => {
        if (response.status === 204) {
          const products = this.products.getValue();
          products?.map(x => {
            if (x.productId === productId) {
              x.deleted = false;
            }
          });
          this.products.next(products);
          this.deleteRestoreOperation.next('restored product');
        }
      })
    );
  }

  public deleteProduct(productId: string): Observable<HttpResponse<any>> {
    const options = { headers: this.headers, observe: 'response' as const };
    return this.httpClient.delete<HttpResponse<any>>(`${this.restUrl}/api/v1/products/${productId}`, options).pipe(
      tap(response => {
        if (response.status === 204) {
          const products = this.products.getValue();
          products?.map(x => {
            if (x.productId === productId) {
              x.deleted = true;
            }
          });
          this.products.next(products);
          this.deleteRestoreOperation.next('product deleted');
        }
      })
    );
  }

  public addProduct(product: CreateProductRequest): Observable<ProductInsertResponse> {
    const options = { headers: this.headers };
    return this.httpClient.post<ProductInsertResponse>(`${this.restUrl}/api/v1/products`, product, options).pipe(
      tap(response => {
        if (response) {
          const currentProducts = this.products.getValue();
          const productToAdd: ProductResponse = {
            productId: response.id,
            brandName: product.brandName,
            brandId: product.brandId,
            brandAlias: product.brandAlias,
            creationDate: new Date().toJSON(),
            creatorId: product.creatorId,
            deleted: false,
            deploymentState: product.deploymentState as unknown as DeploymentStateResponse,
            lastUpdated: new Date().toJSON(),
            productImageId: product.productImageId,
            productImageUrl: product.productImageId ? this.getProductImageUrl(product.productImageId) : undefined,
            productPageImageId: product.productPageImageId,
            productPageImageUrl: product.productPageImageId ? this.getProductPageImageUrl(product.productPageImageId) : undefined,
            productName: product.productName,
            productAlias: response.alias,
            simpiCount: 0,
            brandLogoImageId: null,
            hideTitle: false
          };
          this.products.next([productToAdd, ...currentProducts]);
          this.selectedProduct.next(productToAdd);
        }
      })
    );
  }

  public changeProductPageImage(productId: string, newProductPageImageId: string): Observable<HttpResponse<void>> {
    const options = { headers: this.headers, observe: 'response' as const };
    const requestBody: ProductPageImageChangeRequest = {
      newProductPageImageId: newProductPageImageId
    };
    return this.httpClient.put<void>(`${this.restUrl}/api/v1/products/${productId}/productPageImage`, requestBody, options);
  }

  public changeProductImage(productId: string, newProductImageId: string): Observable<HttpResponse<void>> {
    const options = { headers: this.headers, observe: 'response' as const };
    const requestBody: ProductImageChangeRequest = {
      newProductImageId: newProductImageId
    };
    return this.httpClient.put<void>(`${this.restUrl}/api/v1/products/${productId}/productImage`, requestBody, options);
  }

  public renameProduct(productId: string, newProductName: string): Observable<HttpResponse<ChangeProductResponse>> {
    const options = { headers: this.headers, observe: 'response' as const };
    const requestBody: ProductNameChangeRequest = {
      newProductName: newProductName
    };
    return this.httpClient.put<ChangeProductResponse>(`${this.restUrl}/api/v1/products/${productId}/productName`, requestBody, options);
  }

  public changeHideTitle(productId: string, newHideTitle: boolean): Observable<HttpResponse<void>> {
    const options = { headers: this.headers, observe: 'response' as const };
    const requestBody: ProductHideTitleChangeRequest = {
      HideTitle: newHideTitle
    };
    return this.httpClient.put<void>(`${this.restUrl}/api/v1/products/${productId}/hideTitle`, requestBody, options);
  }

  public changeDeploymentState(productId: string, newDeploymentState: DeploymentStateRequest): Observable<HttpResponse<void>> {
    const options = { headers: this.headers, observe: 'response' as const };
    const requestBody: ProductDeploymentStateChangeRequest = {
      newDeploymentState: newDeploymentState
    };
    return this.httpClient.put<void>(`${this.restUrl}/api/v1/products/${productId}/deploymentState`, requestBody, options);
  }

  public getProductByAlias(brandAlias: string, productAlias: string): Observable<ProductResponse> {
    if (this.selectedProduct.value !== null
      && this.selectedProduct.value.brandAlias === brandAlias
      && this.selectedProduct.value.productAlias === productAlias) {
        return of(this.selectedProduct.value);
    }
    const options = { headers: this.headers };
    let url: string;
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        if (token) {
          url = `${this.restUrl}/api/v1/products/alias/${brandAlias}/${productAlias}`;
        } else {
          url = `${this.restUrl}/api/v1/products/published/alias/${brandAlias}/${productAlias}`;
        }
        return this.httpClient.get<ProductResponse>(url, options)
          .pipe(
            tap(product => {
              this.resolveProductImageUrls(product);
            }),
          );
      })
    );
  }

  public requestAddingProduct() {
    this.addProductRequested.next(true);
  }
}
