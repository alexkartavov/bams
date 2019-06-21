/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FaqDataService } from './faq-data.service';
import { OAuthModule } from 'angular-oauth2-oidc';

describe('Service: FaqData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaqDataService],
      imports: [
        HttpClientTestingModule,
        OAuthModule.forRoot()
      ]
    });
  });

  it('should ...', inject([FaqDataService], (service: FaqDataService) => {
    expect(service).toBeTruthy();
  }));
});
