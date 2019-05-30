import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

}
