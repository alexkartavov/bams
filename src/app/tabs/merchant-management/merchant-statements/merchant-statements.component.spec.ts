/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IgxIconModule, IgxAvatarModule } from 'igniteui-angular';
import { InitialsPipe } from 'src/app/_services/initials.pipe';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MerchantStatementsComponent } from './merchant-statements.component';

describe('MerchantStatementsComponent', () => {
  let component: MerchantStatementsComponent;
  let fixture: ComponentFixture<MerchantStatementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InitialsPipe,
        MerchantStatementsComponent
      ],
      imports: [
        FormsModule,
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        IgxIconModule,
        IgxAvatarModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
