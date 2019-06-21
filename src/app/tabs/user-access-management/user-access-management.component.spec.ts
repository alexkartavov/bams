/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { IgxTabsModule, IgxGridModule, IgxIconModule,
  IgxDialogModule, IgxNavbarModule, IgxColumnHidingModule,
  IgxAvatarModule, IgxListModule, IgxTooltipModule } from 'igniteui-angular';

import { SearchBoxComponent } from '../../search-box/search-box.component';
import { UpdateUserAccessComponent } from './update-user-access/update-user-access.component';
import { ColumnHidingComponent } from '../../column-hiding/column-hiding.component';
import { SortIndicatorComponent } from '../../sort-indicator/sort-indicator.component';
import { ConfirmComponent } from '../../confirm/confirm.component';

import { UserAccessManagementComponent } from './user-access-management.component';
import { AnimationBuilder } from '@angular/animations';
import { OAuthModule } from 'angular-oauth2-oidc';

describe('UserAccessManagementComponent', () => {
  let component: UserAccessManagementComponent;
  let fixture: ComponentFixture<UserAccessManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserAccessManagementComponent,
        SearchBoxComponent,
        UpdateUserAccessComponent,
        ColumnHidingComponent,
        SortIndicatorComponent,
        ConfirmComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        PaginationModule.forRoot(),
        TypeaheadModule.forRoot(),
        IgxTabsModule, IgxGridModule, IgxIconModule,
        IgxDialogModule, IgxNavbarModule, IgxColumnHidingModule,
        IgxAvatarModule, IgxListModule, IgxTooltipModule,
        OAuthModule.forRoot()
      ],
      providers: [
        AnimationBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccessManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
