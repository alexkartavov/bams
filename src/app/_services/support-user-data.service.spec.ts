/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SupportUserDataService } from './support-user-data.service';
import { environment } from 'src/environments/environment';
import { MsalModule, MsalConfig } from 'angular-msal';
import { RouterModule } from '@angular/router';

describe('Service: SupportUserData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupportUserDataService],
      imports: [
        HttpClientTestingModule,
        MsalModule.forRoot(<MsalConfig>environment.auth),
        RouterModule.forRoot([]),
      ]
    });
  });

  it('should ...', inject([SupportUserDataService], (service: SupportUserDataService) => {
    expect(service).toBeTruthy();
  }));
});
