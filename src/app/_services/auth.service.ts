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
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  jwtDecodedToken: any;
  user: UserAccessModel = null;
  mfaCode = '';

  testEmails = ['admin@email.com',
    'user@email.com',
    'admin@non-prod.core.bankofamericamerchant.com',
    'user@non-prod.core.bankofamericamerchant.com'];

  constructor(
    private httpClient: HttpClient,
    private valueService: ValueProcessingService,
    private oauthService: OAuthService) {
    }

  isTestEmail(email) {
    return email === this.testEmails[0] || email === this.testEmails[1] ||
    email === this.testEmails[2] || email === this.testEmails[3];
  }

  isTestAdmin(email) {
    return email === this.testEmails[0] || email === this.testEmails[2];
  }

  login(model: any, success?, mfa?, error?) {
    if (!environment.production && this.isTestEmail(model.username)) {
      // Test routine
      if (!model.pin) {
        mfa(model);
      } else {
        this.loadUserProfile(this.isTestAdmin(model.username) ?
            this.testEmails[2] : this.testEmails[3]
            ).then((user) => {
          if (user) {
            this.user = <UserAccessModel> {
              id: user.cepSupportUserId,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.cepSupportRoleId ? Role.Admin : Role.User
            };

            this.valueService.channels.forEach(c => {
              if (typeof user[c.property] !== 'undefined') {
                this.user[c.map] = user[c.property];
              }
            });

            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('cepSupportUser', JSON.stringify(user));
            localStorage.setItem(this.valueService.profileId, user.userProfile);
            if (success) {
              success(this.user);
            }
          }
        });
      }
      // End test routine
    } else {
      this.oauthService.fetchTokenUsingPasswordFlow(model.username, model.password).then(() => {
        // Loading data about the user
        return this.loadUserProfile(model.username);
      },
      err => {
        console.log(error);
        if (err.status === 428) {
          if (mfa) {
            mfa(err);
          }
        } else if (error) {
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

          this.valueService.channels.forEach(c => {
            if (typeof user[c.property] !== 'undefined') {
              this.user[c.map] = user[c.property];
            }
          });

          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('cepSupportUser', JSON.stringify(user));
          localStorage.setItem(this.valueService.profileId, user.userProfile);
          this.decodeToken(this.oauthService.getAccessToken());
          if (success) {
            success(this.user);
          }
        }
      });
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
    const token = this.getToken();
    if (token && token !== 'token') {
      this.oauthService.logOut();
    }
    localStorage.removeItem('user');
    localStorage.removeItem('cepSupportUser');
    localStorage.removeItem(this.valueService.profileId);
    this.user = null;
  }

  setMfaCode(code) {
    this.mfaCode = code;
  }

  getMfaCode() {
    return this.mfaCode;
  }

  getUser() {
    return this.user;
  }

  getCepSupportUser() {
    const user = localStorage.getItem('cepSupportUser');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  loggedIn(): boolean {
    const hasToken = !!this.getToken();
    if (!this.user) {
      const u = localStorage.getItem('user');
      if (u) {
        this.user = JSON.parse(u);
      }
      if (this.user && this.isTestEmail(this.user.email)) {
        return true;
      } else if (!hasToken) {
        this.logout();
        return false;
      }
    }
    return hasToken;
  }

  decodeToken(token) {
    this.jwtDecodedToken = this.jwtHelper.decodeToken(token);
  }

  getToken() {
    const token = this.oauthService.getAccessToken();
    if (this.user && this.isTestEmail(this.user.email)) {
        return 'token';
    }
    return token;
  }

  getUserName() {
    if (!this.loggedIn() || !this.getUser()) {
      return '';
    }
    return this.getUser().firstName + ' ' + this.getUser().lastName;
  }

  getUserId() {
    if (!this.loggedIn() || !this.getUser()) {
      return 0;
    }
    return this.getUser().id;
  }

  getUserRole() {
    if (!this.loggedIn() || !this.getUser()) {
      return null;
    }
    return this.getUser().role;
  }

}
