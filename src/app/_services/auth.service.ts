import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(user: any) {
    localStorage.setItem('token', user.username);
    return Observable.create(observer => {
      observer.next(user);
    });
  }

  logout() {
    localStorage.removeItem('token');
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== undefined && token != null;
  }

  getUserName() {
    // const token = localStorage.getItem('token');
    // return token;
    return 'selva yugandhar';
  }

  getUserId() {
    return 3;
  }

  getUserRole() {
    if (!this.loggedIn()) {
      return null;
    }
    if (localStorage.getItem('token') === 'admin@email.com') {
      return Role.Admin;
    }
    return Role.User;
  }

}
