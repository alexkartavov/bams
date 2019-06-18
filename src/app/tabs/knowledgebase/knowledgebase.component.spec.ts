/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { appRoutes } from 'src/app/routes';

import { InitialsPipe } from 'src/app/_services/initials.pipe';
import { TimePassedPipe } from 'src/app/_services/time-passed.pipe';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { IgxTabsModule, IgxGridModule, IgxIconModule,
  IgxDialogModule, IgxNavbarModule, IgxColumnHidingModule,
  IgxAvatarModule, IgxListModule, IgxTooltipModule,
  IgxCheckboxModule } from 'igniteui-angular';

import { TabsComponent } from 'src/app/tabs/tabs.component';
import { HomeComponent } from 'src/app/home/home.component';
import { MerchantManagementComponent } from 'src/app/tabs/merchant-management/merchant-management.component';
import { UserAccessManagementComponent } from 'src/app/tabs/user-access-management/user-access-management.component';
import { KnowledgebaseComponent } from 'src/app/tabs/knowledgebase/knowledgebase.component';
import { ReportingComponent } from 'src/app/tabs/reporting/reporting.component';
import { MySupportComponent } from 'src/app/tabs/my-support/my-support.component';
import { MerchantDetailsComponent } from 'src/app/tabs/merchant-management/merchant-details/merchant-details.component';
import { NavMerchantComponent } from 'src/app/tabs/merchant-management/nav-merchant/nav-merchant.component';
import { MoreActionsMerchantComponent } from 'src/app/tabs/merchant-management/more-actions-merchant/more-actions-merchant.component';
import { MerchantStatementsComponent } from 'src/app/tabs/merchant-management/merchant-statements/merchant-statements.component';
import { SearchBoxComponent } from 'src/app/search-box/search-box.component';
import { UpdateUserAccessComponent } from 'src/app/tabs/user-access-management/update-user-access/update-user-access.component';
import { AddTicketComponent } from 'src/app/tabs/my-support/add-ticket/add-ticket.component';
import { ViewTicketComponent } from 'src/app/tabs/my-support/view-ticket/view-ticket.component';
import { PagerComponent } from 'src/app/pager/pager.component';
import { TimeStampComponent } from 'src/app/time-stamp/time-stamp.component';
import { ColumnHidingComponent } from 'src/app/column-hiding/column-hiding.component';
import { AddFaqComponent } from 'src/app/tabs/knowledgebase/add-faq/add-faq.component';
import { SortIndicatorComponent } from 'src/app/sort-indicator/sort-indicator.component';
import { ConfirmComponent } from 'src/app/confirm/confirm.component';
import { FilterTicketsComponent } from '../my-support/filter-tickets/filter-tickets.component';
import { AllTicketsReportComponent } from '../reporting/all-tickets-report/all-tickets-report.component';
import { TimeToResolveReportComponent } from '../reporting/time-to-resolve-report/time-to-resolve-report.component';
import { OpenTicketsReportComponent } from '../reporting/open-tickets-report/open-tickets-report.component';
import { MerchantDataReportComponent } from '../reporting/merchant-data-report/merchant-data-report.component';
import { AnimationBuilder } from '@angular/animations';
import { MerchantDetailsOrdersComponent } from '../merchant-management/merchant-details-orders/merchant-details-orders.component';
import { MerchantNotesComponent } from '../merchant-management/merchant-notes/merchant-notes.component';
import { ForgotPasswordComponent } from 'src/app/home/forgot-password/forgot-password.component';

describe('KnowledgebaseComponent', () => {
  let component: KnowledgebaseComponent;
  let fixture: ComponentFixture<KnowledgebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        PaginationModule.forRoot(),
        TypeaheadModule.forRoot(),
        IgxTabsModule, IgxGridModule, IgxIconModule,
        IgxDialogModule, IgxNavbarModule, IgxColumnHidingModule,
        IgxAvatarModule, IgxListModule, IgxTooltipModule,
        IgxCheckboxModule
      ],
      declarations: [
        InitialsPipe,
        TimePassedPipe,
        HomeComponent,
        TabsComponent,
        MerchantManagementComponent,
        UserAccessManagementComponent,
        KnowledgebaseComponent,
        ReportingComponent,
        MySupportComponent,
        MerchantDetailsComponent,
        NavMerchantComponent,
        MoreActionsMerchantComponent,
        MerchantStatementsComponent,
        SearchBoxComponent,
        UpdateUserAccessComponent,
        AddTicketComponent,
        ViewTicketComponent,
        PagerComponent,
        TimeStampComponent,
        ColumnHidingComponent,
        AddFaqComponent,
        SortIndicatorComponent,
        ConfirmComponent,
        FilterTicketsComponent,
        AllTicketsReportComponent,
        TimeToResolveReportComponent,
        OpenTicketsReportComponent,
        MerchantDataReportComponent,
        MerchantDetailsOrdersComponent,
        MerchantNotesComponent,
        ForgotPasswordComponent
      ],
      providers: [
        AnimationBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
