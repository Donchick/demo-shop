import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router
} from '@angular/router';
import {AuthService} from './../services/auth/auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate{

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedIn = this._authService.isLoggedIn();

    if (!isLoggedIn) {
      this._router.navigate(['/login']);
    }

    return isLoggedIn;
  }
}
