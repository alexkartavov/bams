/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimeStampComponent } from './time-stamp.component';

describe('TimeStampComponent', () => {
  let component: TimeStampComponent;
  let fixture: ComponentFixture<TimeStampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeStampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeStampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
