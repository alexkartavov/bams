/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';

import { TimeToResolveReportComponent } from './time-to-resolve-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgxGridModule } from 'igniteui-angular';

describe('TimeToResolveReportComponent', () => {
  let component: TimeToResolveReportComponent;
  let fixture: ComponentFixture<TimeToResolveReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeToResolveReportComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        PaginationModule.forRoot(),
        IgxGridModule
      ]
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
