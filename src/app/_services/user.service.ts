import { Injectable } from '@angular/core';
import { MsalService } from 'angular-msal';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserAccessModel } from '../models/user-access-model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  cachedUser: any;

  constructor(private msalService: MsalService, private http: HttpClient, private router: Router) {
    // // register redirect call back (only for needed for loginRedirect)
    // this.msalService.handleRedirectCallback(() => {
    //   router.navigate(['myProfile']);
    // });
  }

  public tryToGetUser(email) {
      if (this.msalService.getAccount()) {
          return this.getUser(email);
      }
      return of(null);
  }

  public getUser(email) {
      return this.http.get(environment.users.userEmailUrl, {
        params: {
          'email': email
        }
      }).pipe(tap(user => this.cachedUser = user));
  }
}
