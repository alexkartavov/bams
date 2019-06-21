import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserAccessModel } from '../models/user-access-model';
import { ValueProcessingService } from './value-processing.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  jwtDecodedToken: any;
  user: UserAccessModel = null;
  constructor(
    private httpClient: HttpClient,
    private valueService: ValueProcessingService,
    private oauthService: OAuthService) {
    }

  login(model: any, success?, error?) {
    if (environment.auth.url) {
    //   const httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type':  'application/json'
    //     })
    //   };
    //   return this.httpClient.post(environment.auth.url, model, httpOptions).pipe(
    //     map((response: any) => {
    //       const user = response; // .find(u => u.email === model.username);
    //       if (user) {
    //         this.user = <UserAccessModel> {
    //           id: user.id,
    //           email: user.email,
    //           firstName: user.firstName,
    //           lastName: user.lastName,
    //           role: user.role
    //         };
    //         this.decodeToken(user.token);
    //         localStorage.setItem('user', JSON.stringify({
    //           user: user,
    //           token: user.token
    //         }));
    //       }
    //     })
    //   );
      this.oauthService.fetchTokenUsingPasswordFlow(model.username, model.password).then(() => {
        // Loading data about the user
        return this.loadUserProfile(model.username);
      },
      err => {
        console.log(error);
        if (error) {
          error(err.message);
        }
      }).then(() => {
        // Using the loaded user data
        const claims: any = this.oauthService.getIdentityClaims();
        if (claims) {
          console.log(claims);
        }
        this.decodeToken(this.oauthService.getAccessToken());
        if (success) {
          success(this.user);
        }
      });
    } else {
      // Test routine
      this.user = <UserAccessModel> {
        id: 3,
        email: model.username,
        firstName: 'selva',
        lastName: 'yugandhar',
        role: model.username === 'admin@email.com' ? Role.Admin : Role.User
      };
      if (success) {
        success(this.user);
      }
    }
  }

  loadUserProfile(email): Promise<any> {
    return this.httpClient.get(environment.users.userEmailUrl.replace('{user_email}', email),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        params: {
          'email': email
        }
      }).toPromise();
  }

  logout() {
    if (environment.auth.url) {
      this.oauthService.logOut();
    }
    this.user = null;
  }

  getUser() {
    return this.user;
  }

  loggedIn(): boolean {
    return !!this.getToken();
  }

  decodeToken(token) {
    this.jwtDecodedToken = this.jwtHelper.decodeToken(token);
  }

  getToken() {
    if (environment.auth.url) {
      return this.oauthService.getAccessToken();
    }
    return this.user ? 'token' : null;
  }

  getUserName() {
    if (!this.loggedIn()) {
      return '';
    }
    return this.getUser().firstName + ' ' + this.getUser().lastName;
  }

  getUserId() {
    if (!this.loggedIn()) {
      return 0;
    }
    return this.getUser().id;
  }

  getUserRole() {
    if (!this.loggedIn()) {
      return null;
    }
    return this.getUser().role;
  }

}
