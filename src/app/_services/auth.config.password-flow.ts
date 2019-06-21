import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const authPasswordFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: environment.auth.url,

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'spa',

  dummyClientSecret: 'geheim',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  // scope: 'openid',

  showDebugInformation: true,

  oidc: false,

  // postLogoutRedirectUri: '/'
};
