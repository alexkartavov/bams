/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InitialsPipe } from 'src/app/_services/initials.pipe';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { IgxAvatarModule, IgxIconModule } from 'igniteui-angular';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MerchantDetailsComponent } from 'src/app/tabs/merchant-management/merchant-details/merchant-details.component';
import { MerchantStatementsComponent } from 'src/app/tabs/merchant-management/merchant-statements/merchant-statements.component';
import { MoreActionsMerchantComponent } from './more-actions-merchant.component';

describe('MoreActionsMerchantComponent', () => {
  let component: MoreActionsMerchantComponent;
  let fixture: ComponentFixture<MoreActionsMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        PopoverModule.forRoot(),
        IgxAvatarModule,
        IgxIconModule,
        TabsModule.forRoot(),
        ModalModule.forRoot()
      ],
      declarations: [
        InitialsPipe,
        MerchantDetailsComponent,
        MerchantStatementsComponent,
        MoreActionsMerchantComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreActionsMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
