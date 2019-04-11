/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FaqDataService } from './faq-data.service';

describe('Service: FaqData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaqDataService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([FaqDataService], (service: FaqDataService) => {
    expect(service).toBeTruthy();
  }));
});
