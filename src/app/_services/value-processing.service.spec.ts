/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValueProcessingService } from './value-processing.service';

describe('Service: ValueProcessing', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueProcessingService]
    });
  });

  it('should ...', inject([ValueProcessingService], (service: ValueProcessingService) => {
    expect(service).toBeTruthy();
  }));
});
