import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAccessModel } from '../models/user-access-model';
import { ValueProcessingService } from './value-processing.service';
import { MsalService } from 'angular-msal';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: UserAccessModel = null;
  constructor(
    private httpClient: HttpClient,
    private msalService: MsalService,
    private userService: UserService) {
    }

  login() {
    this.msalService.loginPopup().then(_ => {
      this.userService.tryToGetUser().subscribe(_ => {
        // this.router.navigate(['/']);
     });
    });
  }

}
