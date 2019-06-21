/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { IgxIconModule, IgxAvatarModule } from 'igniteui-angular';
import { InitialsPipe } from 'src/app/_services/initials.pipe';
import { TimePassedPipe } from 'src/app/_services/time-passed.pipe';

import { ViewTicketComponent } from './view-ticket.component';
import { OAuthModule } from 'angular-oauth2-oidc';

describe('ViewTicketComponent', () => {
  let component: ViewTicketComponent;
  let fixture: ComponentFixture<ViewTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InitialsPipe,
        TimePassedPipe,
        ViewTicketComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ModalModule.forRoot(),
        TypeaheadModule.forRoot(),
        IgxIconModule,
        IgxAvatarModule,
        OAuthModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
