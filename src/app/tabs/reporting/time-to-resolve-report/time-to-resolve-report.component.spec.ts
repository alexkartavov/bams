/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimeToResolveReportComponent } from './time-to-resolve-report.component';

describe('TimeToResolveReportComponent', () => {
  let component: TimeToResolveReportComponent;
  let fixture: ComponentFixture<TimeToResolveReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeToResolveReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeToResolveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
