/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule, BsDatepickerModule, ButtonsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { IgxTabsModule, IgxGridModule, IgxIconModule,
  IgxDialogModule, IgxNavbarModule, IgxColumnHidingModule,
  IgxAvatarModule, IgxListModule, IgxTooltipModule,
  IgxCheckboxModule } from 'igniteui-angular';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { MsalModule, MsalConfig } from 'angular-msal';
import { RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { TabsComponent } from '../../tabs.component';
import { ForgotPasswordComponent } from 'src/app/home/forgot-password/forgot-password.component';
import { MerchantManagementComponent } from '../../merchant-management/merchant-management.component';
import { UserAccessManagementComponent } from '../../user-access-management/user-access-management.component';
import { KnowledgebaseComponent } from '../../knowledgebase/knowledgebase.component';
import { ReportingComponent } from '../reporting.component';
import { MySupportComponent } from '../../my-support/my-support.component';
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
import { FilterTicketsComponent } from '../../my-support/filter-tickets/filter-tickets.component';
import { AllTicketsReportComponent } from '../all-tickets-report/all-tickets-report.component';
import { TimeToResolveReportComponent } from '../time-to-resolve-report/time-to-resolve-report.component';
import { OpenTicketsReportComponent } from '../open-tickets-report/open-tickets-report.component';
import { MerchantDataReportComponent } from '../merchant-data-report/merchant-data-report.component';
import { MerchantDetailsOrdersComponent } from '../../merchant-management/merchant-details-orders/merchant-details-orders.component';
import { MerchantNotesComponent } from '../../merchant-management/merchant-notes/merchant-notes.component';
import { InitialsPipe } from 'src/app/_services/initials.pipe';
import { TimePassedPipe } from 'src/app/_services/time-passed.pipe';
import { BeneficialOwnersReportComponent } from '../beneficial-owners-report/beneficial-owners-report.component';
import { AnimationBuilder } from '@angular/animations';

describe('AllTicketsReportComponent', () => {
  let component: AllTicketsReportComponent;
  let fixture: ComponentFixture<AllTicketsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AllTicketsReportComponent,
        InitialsPipe,
        TimePassedPipe,
        BeneficialOwnersReportComponent,
        HomeComponent,
        TabsComponent,
        ForgotPasswordComponent,
        SearchBoxComponent,
        MerchantManagementComponent,
        UserAccessManagementComponent,
        KnowledgebaseComponent,
        ReportingComponent,
        MySupportComponent,
        MerchantDetailsComponent,
        NavMerchantComponent,
        MoreActionsMerchantComponent,
        MerchantStatementsComponent,
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
        TimeToResolveReportComponent,
        OpenTicketsReportComponent,
        MerchantDataReportComponent,
        MerchantDetailsOrdersComponent,
        MerchantNotesComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ButtonsModule.forRoot(),
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        PaginationModule.forRoot(),
        TypeaheadModule.forRoot(),
        RouterModule.forRoot([]),
        MsalModule.forRoot(<MsalConfig>environment.auth),
        IgxTabsModule, IgxGridModule, IgxIconModule,
        IgxDialogModule, IgxNavbarModule, IgxColumnHidingModule,
        IgxAvatarModule, IgxListModule, IgxTooltipModule,
      ],
      providers: [
        AnimationBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTicketsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
