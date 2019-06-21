/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';

import { OpenTicketsReportComponent } from './open-tickets-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgxGridModule } from 'igniteui-angular';
import { AnimationBuilder } from '@angular/animations';
import { OAuthModule } from 'angular-oauth2-oidc';

describe('OpenTicketsComponent', () => {
  let component: OpenTicketsReportComponent;
  let fixture: ComponentFixture<OpenTicketsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenTicketsReportComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        PaginationModule.forRoot(),
        IgxGridModule,
        OAuthModule.forRoot()
      ],
      providers: [
        AnimationBuilder
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
