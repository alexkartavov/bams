import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.loggedIn()) {
      const userRole = this.auth.getUserRole();
      if (userRole) {
          // check if route is restricted by role
          if (route.data.roles && route.data.roles.indexOf(userRole) === -1) {
              // role not authorised so redirect to home page
              this.router.navigate(['/']);
              return false;
          }

          // authorised so return true
          return true;
      }
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
