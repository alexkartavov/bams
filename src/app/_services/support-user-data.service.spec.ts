/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SupportUserDataService } from './support-user-data.service';
import { OAuthModule } from 'angular-oauth2-oidc';

describe('Service: SupportUserData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupportUserDataService],
      imports: [
        HttpClientTestingModule,
        OAuthModule.forRoot()
      ]
    });
  });

  it('should ...', inject([SupportUserDataService], (service: SupportUserDataService) => {
    expect(service).toBeTruthy();
  }));
});
