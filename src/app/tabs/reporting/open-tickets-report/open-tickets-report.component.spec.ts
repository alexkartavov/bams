/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { OpenTicketsReportComponent } from './open-tickets-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('OpenTicketsComponent', () => {
  let component: OpenTicketsReportComponent;
  let fixture: ComponentFixture<OpenTicketsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenTicketsReportComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenTicketsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
