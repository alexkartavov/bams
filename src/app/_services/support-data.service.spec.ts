/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SupportDataService } from './support-data.service';
import { OAuthModule } from 'angular-oauth2-oidc';

describe('Service: SupportData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupportDataService],
      imports: [
        HttpClientTestingModule,
        OAuthModule.forRoot()
      ]
    });
  });

  it('should ...', inject([SupportDataService], (service: SupportDataService) => {
    expect(service).toBeTruthy();
  }));
});
