import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate() {
    const currentUserToken = this.authService.getToken();
    if (currentUserToken) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.authService.logout();
    return false;
  }
}
