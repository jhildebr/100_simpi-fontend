import { HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress: boolean = false;

  private tokenRefreshed = new Subject();

  private tokenRefreshed$ = this.tokenRefreshed.asObservable();

  constructor(private authService: AuthService, private router: Router) {
  }

  private logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  private addAuthHeader(request: HttpRequest<any>): HttpRequest<any> {
    const value = this.authService.getAuthHeaderValue();
    if (value) {
      return request.clone({
        setHeaders: {
          'Authorization': value
        }
      });
    }
    return request;
  }

  private refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;
      return this.authService.refreshToken().pipe(
        tap(() => {
          this.refreshTokenInProgress = false;
          this.tokenRefreshed.next();
        }),
        catchError(() => {
          this.refreshTokenInProgress = false;
          this.logout();
          return undefined;
        }));
    }
  }

  private handleError(error: any, req?: HttpRequest<any>, next?: HttpHandler): any {
    if (error.status === 401) {
      return this.refreshToken().pipe(
        switchMap(() => {
          const reqWithAuthHeader = this.addAuthHeader(req);
          return next.handle(reqWithAuthHeader);
        }),
        catchError(e => {
          if (e.status !== 401) {
            return this.handleError(e);
          } else {
            this.logout();
          }
        }));
    }
    return throwError(error);
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(catchError(err => {
      return this.handleError(err, req, next);
    }));
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
