/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileService } from './profile.service';
import { OAuthModule } from 'angular-oauth2-oidc';

describe('Service: Profile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService],
      imports: [
        HttpClientTestingModule,
        OAuthModule.forRoot()
      ]
    });
  });

  it('should ...', inject([ProfileService], (service: ProfileService) => {
    expect(service).toBeTruthy();
  }));
});
