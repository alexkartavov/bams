import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,
        private alertify: AlertifyService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([400, 401, 403].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.authService.logout();
                // location.reload(true);

                switch (err.status) {
                    case 400:
                        this.alertify.error('Unable to complete request. Verify user credentials.');
                        break;
                    case 401:
                    case 403:
                        this.alertify.error('User is unauthorized to access.');
                        break;
                }
            }

            const error = err.message || err.statusText;
            return throwError(error);
        }));
    }
}
