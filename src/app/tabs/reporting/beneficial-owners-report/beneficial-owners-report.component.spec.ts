/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BeneficialOwnersReportComponent } from './beneficial-owners-report.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonsModule, ProgressbarModule, ModalModule } from 'ngx-bootstrap';
import { OAuthService, OAuthModule } from 'angular-oauth2-oidc';
import { BoReportProgressComponent } from './bo-report-progress/bo-report-progress.component';

describe('BeneficialOwnersReportComponent', () => {
  let component: BeneficialOwnersReportComponent;
  let fixture: ComponentFixture<BeneficialOwnersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficialOwnersReportComponent,
        BoReportProgressComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        OAuthModule.forRoot(),
        ButtonsModule.forRoot(),
        ProgressbarModule.forRoot(),
        ModalModule.forRoot()
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
