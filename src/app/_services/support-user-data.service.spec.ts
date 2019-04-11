/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SupportUserDataService } from './support-user-data.service';

describe('Service: SupportUserData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupportUserDataService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([SupportUserDataService], (service: SupportUserDataService) => {
    expect(service).toBeTruthy();
  }));
});
