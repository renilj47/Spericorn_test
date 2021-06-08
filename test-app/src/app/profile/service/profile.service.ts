import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as myGlobals from '../../global';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  getUserData() {
    return this.http.get(myGlobals.profileURL).pipe(map((res) => res));
  }

}
