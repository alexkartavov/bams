import { Component, OnDestroy } from '@angular/core';
// import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
// import { authPasswordFlowConfig } from './_services/auth.config.password-flow';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-supporttool';
  // _subFail: any;
  // _subSuccess: any;
  // _subAcqTokenSuccess: any;
  // _subAcqTokenFail: any;

  constructor() {

  }
  // constructor(private oauthService: OAuthService) {
  //   this.oauthService.configure(authPasswordFlowConfig);

  //   this.oauthService.setStorage(sessionStorage);
  //   this.oauthService.tokenValidationHandler = new JwksValidationHandler();

  //   // this.oauthService.loadDiscoveryDocument();
  //   // this.oauthService.resource = 'urn:example:example';
  //   this.oauthService.userinfoEndpoint = authPasswordFlowConfig.issuer + '/api/userinfo';
  //   // this.oauthService.loginUrl = 'https://adfs-test.de/adfs/oauth2/authorize/';
  //   this.oauthService.tokenEndpoint = authPasswordFlowConfig.issuer + '/api/token/';

  //   // Optional
  //   this.oauthService.setupAutomaticSilentRefresh();

  //   this.oauthService.events.subscribe(e => {
  //     // tslint:disable-next-line:no-console
  //     console.debug('oauth/oidc event', e);
  //   });

  //   this.oauthService.events
  //     .pipe(filter(e => e.type === 'session_terminated'))
  //     .subscribe(e => {
  //       // tslint:disable-next-line:no-console
  //       console.debug('Your session has been terminated!', e);
  //     });

  //   this.oauthService.events
  //     .pipe(filter(e => e.type === 'token_received'))
  //     .subscribe(e => {
  //       // this.oauthService.loadUserProfile();
  //     // tslint:disable-next-line:no-console
  //       console.debug('token received', e);
  //     });
  // }
}
