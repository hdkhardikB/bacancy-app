import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  /**
   * To check if route is secured and throw user to login if not logged in.
   * @param route - routes being activated
   * @param state - state of the route.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const publicRoute = route.data.isPublic || false;
    if (!publicRoute && !this.authService.isLoggedIn()) { // If the route is not public and not logged in
      this.router.navigate(['login']);
    }
    return true;
  }
}
