import { Injectable } from '@angular/core';
import { MsalService } from 'angular-msal';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserAccessModel } from '../models/user-access-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  cachedUser: UserAccessModel;

  constructor(private authService: MsalService, private http: HttpClient, private router: Router) {
    // register redirect call back (only for needed for loginRedirect)
    this.authService.handleRedirectCallback(() => {
      router.navigate(['myProfile']);
    });
  }

  public tryToGetUser() {
      if (this.authService.getAccount()) {
          return this.getUser();
      }
      return of(null);
  }

  public getUser() {
      return this.http.get<UserAccessModel>(`User/loggedinuser`).pipe(tap(user => {
          this.cachedUser = user;
      }));
  }
}
