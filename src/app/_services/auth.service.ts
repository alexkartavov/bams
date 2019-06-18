import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserAccessModel } from '../models/user-access-model';
import { ValueProcessingService } from './value-processing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  jwtDecodedToken: any;
  user: UserAccessModel = null;
  constructor(
    private httpClient: HttpClient,
    private valueService: ValueProcessingService) {
    }

  login(model: any) {
    // if (!environment.production) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.httpClient.post(environment.authUrl, model, httpOptions).pipe(
        map((response: any) => {
          const user = response; // .find(u => u.email === model.username);
          if (user) {
            this.user = <UserAccessModel> {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role
            };
            this.decodeToken(user.token);
            localStorage.setItem('user', JSON.stringify({
              user: user,
              token: user.token
            }));
          }
        })
      );
    // } else {
    //   localStorage.setItem('user', model);
    //   return Observable.create(observer => {
    //     observer.next(model);
    //   });

      // return this.httpClient.post(this.authUrl, model).pipe(
      //   map((response: any) => {
      //     const user = response;
      //     localStorage.setItem('token', user.token);
      //     this.decodeToken(user.token);
      //   })
      // );
    // }
  }

  logout() {
    localStorage.removeItem('user');
    this.user = null;
  }

  getUser() {
    if (!this.user && localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.user = user.user;
    }
    return this.user;
  }

  loggedIn(): boolean {
    const user = this.getUser();
    return !!user;
  }

  decodeToken(token) {
    if (environment.production) {
      this.jwtDecodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  getToken() {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      return user.token;
    }
    return '';
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
    // if (localStorage.getItem('token') === 'admin@email.com') {
    //   return Role.Admin;
    // }
    // return Role.User;
  }

}
