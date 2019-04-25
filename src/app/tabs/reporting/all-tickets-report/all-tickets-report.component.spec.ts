/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AllTicketsReportComponent } from './all-tickets-report.component';
import { BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';
import { IgxGridModule } from 'igniteui-angular';
import { AnimationBuilder } from '@angular/animations';

describe('AllTicketsReportComponent', () => {
  let component: AllTicketsReportComponent;
  let fixture: ComponentFixture<AllTicketsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTicketsReportComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        PaginationModule.forRoot(),
        IgxGridModule
      ],
      providers: [
        AnimationBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTicketsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
