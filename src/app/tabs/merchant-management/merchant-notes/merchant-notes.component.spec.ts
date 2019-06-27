/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MerchantNotesComponent } from './merchant-notes.component';
import { InitialsPipe } from 'src/app/_services/initials.pipe';
import { ModalModule } from 'ngx-bootstrap';
import { IgxAvatarModule } from 'igniteui-angular';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MsalModule, MsalConfig } from 'angular-msal';
import { RouterModule } from '@angular/router';

describe('MerchantNotesComponent', () => {
  let component: MerchantNotesComponent;
  let fixture: ComponentFixture<MerchantNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InitialsPipe,
        MerchantNotesComponent
      ],
      imports: [
        FormsModule,
        ModalModule.forRoot(),
        IgxAvatarModule,
        MsalModule.forRoot(<MsalConfig>environment.auth),
        RouterModule.forRoot([]),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
