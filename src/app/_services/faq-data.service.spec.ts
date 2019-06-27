/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FaqDataService } from './faq-data.service';
import { environment } from 'src/environments/environment';
import { MsalModule, MsalConfig } from 'angular-msal';
import { RouterModule } from '@angular/router';

describe('Service: FaqData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaqDataService],
      imports: [
        HttpClientTestingModule,
        MsalModule.forRoot(<MsalConfig>environment.auth),
        RouterModule.forRoot([]),
      ]
    });
  });

  it('should ...', inject([FaqDataService], (service: FaqDataService) => {
    expect(service).toBeTruthy();
  }));
});
