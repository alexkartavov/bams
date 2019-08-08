import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './auth.guard';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../routes';
import { HomeComponent } from '../home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from '../tabs/tabs.component';
import { ForgotPasswordComponent } from '../home/forgot-password/forgot-password.component';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { IgxCheckboxModule, IgxIconModule, IgxTabsModule, IgxGridModule, IgxDialogModule,
  IgxNavbarModule, IgxColumnHidingModule, IgxAvatarModule, IgxListModule, IgxTooltipModule } from 'igniteui-angular';
import { InitialsPipe } from '../_services/initials.pipe';
import { TimePassedPipe } from '../_services/time-passed.pipe';
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
import { BsDropdownModule, BsDatepickerModule, TabsModule, ModalModule, PopoverModule,
  PaginationModule, TypeaheadModule, ButtonsModule, ProgressbarModule } from 'ngx-bootstrap';
import { OAuthModule } from 'angular-oauth2-oidc';
import { BeneficialOwnersReportComponent } from '../tabs/reporting/beneficial-owners-report/beneficial-owners-report.component';
import { MfaComponent } from '../home/mfa/mfa.component';
import { BoReportProgressComponent } from '../tabs/reporting/beneficial-owners-report/bo-report-progress/bo-report-progress.component';

describe('AuthGuard', () => {
  beforeEach(() => {
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
        RouterModule.forRoot(appRoutes, { useHash: true }),
        FormsModule,
        ReactiveFormsModule,
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
        OAuthModule.forRoot(),
        ButtonsModule.forRoot(),
        ProgressbarModule.forRoot()
      ],
      providers: [AuthGuard]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
