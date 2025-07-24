import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../../../simpi-frontend-common/src/lib/services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.getToken().then(token => {
      if (token) {
        return this.authService.getDecodedToken().then(() => true);
      } else {
        return false;
      }
    })
      .then(authenticated => {
        if (!authenticated) {
          this.router.navigateByUrl('login').catch(console.error);
        }
        return authenticated;
      });
  }

}
