import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as myGlobals from '../../global';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  // To get token
  public getToken(): string {
    return localStorage.getItem('authToken');
  }

  login(payload) {
    return this.http.post(myGlobals.loginURL, payload).pipe(map((res) => res));
  }
  register(payload) {
    return this.http.post(myGlobals.registerURL, payload).pipe(map((res) => res));
  }

  checkExistingEmail(payload){
    return this.http.post(myGlobals.checkMailURL, payload).pipe(map((res) => res));
  }

  // logout service method
  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }
}
