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
      this.oauthService.fetchTokenUsingPasswordFlow(model.username, model.password).then(() => {
        // Loading data about the user
        return this.loadUserProfile(model.username);
      },
      err => {
        console.log(error);
        if (error) {
          error(err.message);
        }
      }).then((user) => {
        if (user) {
          this.user = <UserAccessModel> {
            id: user.cepSupportUserId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.cepSupportRoleId ? Role.Admin : Role.User
          };
          this.decodeToken(this.oauthService.getAccessToken());
          if (success) {
            success(this.user);
          }
        }
      });
    } else if (!environment.production) {
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
          'Accept': 'application/json',
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
    return !!this.getToken() && !!this.getUser();
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
