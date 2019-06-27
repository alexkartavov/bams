import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAccessModel } from '../models/user-access-model';
import { ValueProcessingService } from './value-processing.service';
import { MsalService } from 'angular-msal';
import { UserService } from './user.service';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: UserAccessModel = null;
  constructor(
    private httpClient: HttpClient,
    private msalService: MsalService,
    private userService: UserService,
    private alertify: AlertifyService) {
    }

  login(success, email?: string) {
    if (email) {
      localStorage.setItem('token', 'token');
      this.loadUserInfo(email, success);
    } else {
      this.msalService.loginPopup({}).then(() => {
        this.loadUserInfo(this.msalService.getAccount().name, success);
      },
      err => {
        if (!environment.production) {
        this.alertify.error(err.message);
        }
      });
    }
  }

  logout() {
    if (!localStorage.getItem('token')) {
      this.msalService.logout();
    }
    this.user = null;
    sessionStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  loggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    if (this.msalService.getLoginInProgress()) {
      return false;
    }
    const isLoggedIn =  !!this.msalService.getAccount();
    if (isLoggedIn) {
      const userData = sessionStorage.getItem('user');
      if (!userData) {
        this.loadUserInfo(this.msalService.getAccount().name);
      } else {
        this.user = JSON.parse(userData);
      }
    }
    return isLoggedIn;
  }

  loadUserInfo(email, success?) {
    this.userService.tryToGetUser(email).subscribe(user => {
      this.user = <UserAccessModel>{
        id: user.cepSupportUserId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.cepSupportRoleId === 1 ? Role.Admin : Role.User
      };
      sessionStorage.setItem('user', JSON.stringify(this.user));
      if (success) {
        success(this.user);
      }
    });
  }

  getUser() {
    return this.user;
  }

  getUserRole() {
    if (!this.user) {
      return null;
    }
    return this.user.role;
  }

  getToken() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    }
    if (this.loggedIn()) {
      return this.msalService.getAccount().idToken;
    }
    return null;
  }

  getUserName() {
    if (this.user) {
      return this.user.firstName + ' ' + this.user.lastName;
    }
    return '';
  }

  getUserId() {
    if (this.user) {
      return this.user.id;
    }
    return null;
  }

}
