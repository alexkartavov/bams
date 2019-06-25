/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BeneficialOwnersReportComponent } from './beneficial-owners-report.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonsModule } from 'ngx-bootstrap';
import { OAuthService, OAuthModule } from 'angular-oauth2-oidc';

describe('BeneficialOwnersReportComponent', () => {
  let component: BeneficialOwnersReportComponent;
  let fixture: ComponentFixture<BeneficialOwnersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficialOwnersReportComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        OAuthModule.forRoot(),
        ButtonsModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficialOwnersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
