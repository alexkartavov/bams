/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { appRoutes } from '../routes';

import { InitialsPipe } from '../_services/initials.pipe';
import { TimePassedPipe } from '../_services/time-passed.pipe';

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

import { HomeComponent } from './home.component';
import { TabsComponent } from '../tabs/tabs.component';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { MerchantManagementComponent } from '../tabs/merchant-management/merchant-management.component';
import { UserAccessManagementComponent } from '../tabs/user-access-management/user-access-management.component';
import { KnowledgebaseComponent } from '../tabs/knowledgebase/knowledgebase.component';
import { ReportingComponent } from '../tabs/reporting/reporting.component';
import { MySupportComponent } from '../tabs/my-support/my-support.component';
import { MerchantDetailsComponent } from '../tabs/merchant-management/merchant-details/merchant-details.component';
import { NavMerchantComponent } from '../tabs/merchant-management/nav-merchant/nav-merchant.component';
import { MoreActionsMerchantComponent } from '../tabs/merchant-management/more-actions-merchant/more-actions-merchant.component';
import { MerchantStatementsComponent } from '../tabs/merchant-management/merchant-statements/merchant-statements.component';
import { UpdateUserAccessComponent } from '../tabs/user-access-management/update-user-access/update-user-access.component';
import { AddTicketComponent } from '../tabs/my-support/add-ticket/add-ticket.component';
import { ViewTicketComponent } from '../tabs/my-support/view-ticket/view-ticket.component';
import { PagerComponent } from '../pager/pager.component';
import { TimeStampComponent } from '../time-stamp/time-stamp.component';
import { ColumnHidingComponent } from '../column-hiding/column-hiding.component';
import { AddFaqComponent } from '../tabs/knowledgebase/add-faq/add-faq.component';
import { SortIndicatorComponent } from '../sort-indicator/sort-indicator.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { FilterTicketsComponent } from '../tabs/my-support/filter-tickets/filter-tickets.component';
import { AllTicketsReportComponent } from '../tabs/reporting/all-tickets-report/all-tickets-report.component';
import { TimeToResolveReportComponent } from '../tabs/reporting/time-to-resolve-report/time-to-resolve-report.component';
import { OpenTicketsReportComponent } from '../tabs/reporting/open-tickets-report/open-tickets-report.component';
import { MerchantDataReportComponent } from '../tabs/reporting/merchant-data-report/merchant-data-report.component';
import { MerchantDetailsOrdersComponent } from '../tabs/merchant-management/merchant-details-orders/merchant-details-orders.component';
import { MerchantNotesComponent } from '../tabs/merchant-management/merchant-notes/merchant-notes.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        MerchantNotesComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
