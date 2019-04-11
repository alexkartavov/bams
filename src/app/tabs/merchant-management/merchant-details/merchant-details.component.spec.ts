/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InitialsPipe } from 'src/app/_services/initials.pipe';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { IgxAvatarModule} from 'igniteui-angular';

import { MerchantDetailsComponent } from './merchant-details.component';

describe('MerchantDetailsComponent', () => {
  let component: MerchantDetailsComponent;
  let fixture: ComponentFixture<MerchantDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InitialsPipe,
        MerchantDetailsComponent
      ],
      imports: [
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        IgxAvatarModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
