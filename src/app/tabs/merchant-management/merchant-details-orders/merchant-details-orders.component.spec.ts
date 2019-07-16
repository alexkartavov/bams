/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MerchantDetailsOrdersComponent } from './merchant-details-orders.component';
import { TabsModule, ModalModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OAuthModule } from 'angular-oauth2-oidc';

describe('MerchantDetailsOrdersComponent', () => {
  let component: MerchantDetailsOrdersComponent;
  let fixture: ComponentFixture<MerchantDetailsOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MerchantDetailsOrdersComponent
      ],
      imports: [
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        HttpClientTestingModule,
        OAuthModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantDetailsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
