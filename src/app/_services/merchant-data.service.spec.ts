/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MerchantDataService } from './merchant-data.service';
import { OAuthModule } from 'angular-oauth2-oidc';

describe('Service: MerchantData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MerchantDataService],
      imports: [
        HttpClientTestingModule,
        OAuthModule.forRoot()
      ]
    });
  });

  it('should ...', inject([MerchantDataService], (service: MerchantDataService) => {
    expect(service).toBeTruthy();
  }));
});
