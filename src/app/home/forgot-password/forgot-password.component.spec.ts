/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from 'src/app/confirm/confirm.component';
import { Router, RouterModule } from '@angular/router';
import { appRoutes } from 'src/app/routes';
import { HomeComponent } from '../home.component';
import { TabsComponent } from 'src/app/tabs/tabs.component';
import { SearchBoxComponent } from 'src/app/search-box/search-box.component';
import { IgxCheckboxComponent, IgxIconComponent, IgxTabsModule, IgxGridModule,
  IgxIconModule, IgxDialogModule, IgxNavbarModule, IgxColumnHidingModule,
  IgxAvatarModule, IgxListModule, IgxTooltipModule, IgxCheckboxModule } from 'igniteui-angular';
import { BsDropdownModule, BsDatepickerModule, TabsModule, ModalModule,
  PopoverModule, PaginationModule, TypeaheadModule, PagerComponent, ButtonsModule, ProgressbarModule } from 'ngx-bootstrap';
import { MerchantManagementComponent } from 'src/app/tabs/merchant-management/merchant-management.component';
import { UserAccessManagementComponent } from 'src/app/tabs/user-access-management/user-access-management.component';
import { KnowledgebaseComponent } from 'src/app/tabs/knowledgebase/knowledgebase.component';
import { ReportingComponent } from 'src/app/tabs/reporting/reporting.component';
import { MySupportComponent } from 'src/app/tabs/my-support/my-support.component';
import { MerchantDetailsComponent } from 'src/app/tabs/merchant-management/merchant-details/merchant-details.component';
import { NavMerchantComponent } from 'src/app/tabs/merchant-management/nav-merchant/nav-merchant.component';
import { MoreActionsMerchantComponent } from 'src/app/tabs/merchant-management/more-actions-merchant/more-actions-merchant.component';
import { MerchantStatementsComponent } from 'src/app/tabs/merchant-management/merchant-statements/merchant-statements.component';
import { UpdateUserAccessComponent } from 'src/app/tabs/user-access-management/update-user-access/update-user-access.component';
import { AddTicketComponent } from 'src/app/tabs/my-support/add-ticket/add-ticket.component';
import { ViewTicketComponent } from 'src/app/tabs/my-support/view-ticket/view-ticket.component';
import { TimeStampComponent } from 'src/app/time-stamp/time-stamp.component';
import { ColumnHidingComponent } from 'src/app/column-hiding/column-hiding.component';
import { AddFaqComponent } from 'src/app/tabs/knowledgebase/add-faq/add-faq.component';
import { SortIndicatorComponent } from 'src/app/sort-indicator/sort-indicator.component';
import { FilterTicketsComponent } from 'src/app/tabs/my-support/filter-tickets/filter-tickets.component';
import { AllTicketsReportComponent } from 'src/app/tabs/reporting/all-tickets-report/all-tickets-report.component';
import { TimeToResolveReportComponent } from 'src/app/tabs/reporting/time-to-resolve-report/time-to-resolve-report.component';
import { OpenTicketsReportComponent } from 'src/app/tabs/reporting/open-tickets-report/open-tickets-report.component';
import { MerchantDataReportComponent } from 'src/app/tabs/reporting/merchant-data-report/merchant-data-report.component';
import { MerchantDetailsOrdersComponent } from 'src/app/tabs/merchant-management/merchant-details-orders/merchant-details-orders.component';
import { MerchantNotesComponent } from 'src/app/tabs/merchant-management/merchant-notes/merchant-notes.component';
import { InitialsPipe } from 'src/app/_services/initials.pipe';
import { TimePassedPipe } from 'src/app/_services/time-passed.pipe';
import { BeneficialOwnersReportComponent } from 'src/app/tabs/reporting/beneficial-owners-report/beneficial-owners-report.component';
import { MfaComponent } from '../mfa/mfa.component';
import { BoReportProgressComponent } from 'src/app/tabs/reporting/beneficial-owners-report/bo-report-progress/bo-report-progress.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForgotPasswordComponent,
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
        BeneficialOwnersReportComponent,
        MerchantDetailsOrdersComponent,
        MerchantNotesComponent,
        MfaComponent,
        BoReportProgressComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
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
        IgxCheckboxModule,
        ButtonsModule.forRoot(),
        ProgressbarModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
