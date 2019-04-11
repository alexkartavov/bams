/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MerchantDataService } from './merchant-data.service';

describe('Service: MerchantData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MerchantDataService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([MerchantDataService], (service: MerchantDataService) => {
    expect(service).toBeTruthy();
  }));
});
