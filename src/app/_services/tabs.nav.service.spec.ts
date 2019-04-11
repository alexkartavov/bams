/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TabsNavService } from './tabs.nav.service';

describe('Service: Tabs.nav', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabsNavService]
    });
  });

  it('should ...', inject([TabsNavService], (service: TabsNavService) => {
    expect(service).toBeTruthy();
  }));
});
