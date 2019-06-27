/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SupportDataService } from './support-data.service';
import { environment } from 'src/environments/environment';
import { MsalModule, MsalConfig } from 'angular-msal';
import { RouterModule } from '@angular/router';

describe('Service: SupportData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupportDataService],
      imports: [
        HttpClientTestingModule,
        MsalModule.forRoot(<MsalConfig>environment.auth),
        RouterModule.forRoot([]),
      ]
    });
  });

  it('should ...', inject([SupportDataService], (service: SupportDataService) => {
    expect(service).toBeTruthy();
  }));
});
