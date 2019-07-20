import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authPasswordFlowConfig } from './_services/auth.config.password-flow';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-supporttool';

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authPasswordFlowConfig);

    this.oauthService.setStorage(sessionStorage);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    // this.oauthService.loadDiscoveryDocument();
    this.oauthService.userinfoEndpoint = authPasswordFlowConfig.issuer + '/api/userinfo';
    this.oauthService.tokenEndpoint = authPasswordFlowConfig.issuer + '/api/token/';

    // Silent refresh
    this.oauthService.setupAutomaticSilentRefresh();

    // this.oauthService.events.subscribe(e => {
    //   // tslint:disable-next-line:no-console
    //   console.debug('oauth/oidc event', e);
    // });

    // this.oauthService.events
    //   .pipe(filter(e => e.type === 'session_terminated'))
    //   .subscribe(e => {
    //     // tslint:disable-next-line:no-console
    //     console.debug('Your session has been terminated!', e);
    //   });

    // this.oauthService.events
    //   .pipe(filter(e => e.type === 'token_received'))
    //   .subscribe(e => {
    //     // this.oauthService.loadUserProfile();
    //   // tslint:disable-next-line:no-console
    //     console.debug('token received', e);
    //   });
  }
}
