/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlertifyService } from './alertify.service';

describe('Service: Alertify', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertifyService]
    });
  });

  it('should show success message', inject([AlertifyService], (service: AlertifyService) => {
    expect(service).toBeTruthy();
    expect(service.success('success')).toBeTruthy();
  }));

  it('should show error message', inject([AlertifyService], (service: AlertifyService) => {
    expect(service).toBeTruthy();
    expect(service.error('error')).toBeTruthy();
  }));

  it('should show message message', inject([AlertifyService], (service: AlertifyService) => {
    expect(service).toBeTruthy();
    expect(service.message('message')).toBeTruthy();
  }));

  it('should show warning message', inject([AlertifyService], (service: AlertifyService) => {
    expect(service).toBeTruthy();
    expect(service.warning('warning')).toBeTruthy();
  }));
});
