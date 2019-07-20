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
              if (typeof user[c.map] !== 'undefined') {
                this.user[c.map] = user[c.map];
              }
            });

            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('cepSupportUser', JSON.stringify(user));
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
            if (typeof user[c.map] !== 'undefined') {
              this.user[c.map] = user[c.map];
            }
          });

          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('cepSupportUser', JSON.stringify(user));
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
    if (this.user && !this.isTestEmail(this.user.email)) {
      this.oauthService.logOut();
    }
    localStorage.removeItem('user');
    localStorage.removeItem('cepSupportUser');
    localStorage.removeItem(this.valueService.profileId);
    this.user = null;
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
        localStorage.removeItem('user');
        localStorage.removeItem('cepSupportUser');
        this.user = null;
        return false;
      }
    }
    return hasToken;
  }

  decodeToken(token) {
    this.jwtDecodedToken = this.jwtHelper.decodeToken(token);
  }

  getToken() {
    if (this.user && !this.isTestEmail(this.user.email)) {
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
