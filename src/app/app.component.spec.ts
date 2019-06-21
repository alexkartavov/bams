import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { appRoutes } from './routes';

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

import { AppComponent } from 'src/app/app.component';
import { NavComponent } from 'src/app/nav/nav.component';
import { AllTicketsReportComponent } from './tabs/reporting/all-tickets-report/all-tickets-report.component';
import { TimeToResolveReportComponent } from './tabs/reporting/time-to-resolve-report/time-to-resolve-report.component';
import { OpenTicketsReportComponent } from './tabs/reporting/open-tickets-report/open-tickets-report.component';
import { MerchantDataReportComponent } from './tabs/reporting/merchant-data-report/merchant-data-report.component';
import { FilterTicketsComponent } from './tabs/my-support/filter-tickets/filter-tickets.component';
import { MerchantDetailsOrdersComponent } from './tabs/merchant-management/merchant-details-orders/merchant-details-orders.component';
import { MerchantNotesComponent } from './tabs/merchant-management/merchant-notes/merchant-notes.component';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { OAuthModule } from 'angular-oauth2-oidc';

describe('AppComponent', () => {
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
        AppComponent,
        NavComponent,
        AllTicketsReportComponent,
        TimeToResolveReportComponent,
        OpenTicketsReportComponent,
        MerchantDataReportComponent,
        FilterTicketsComponent,
        MerchantDetailsOrdersComponent,
        MerchantNotesComponent,
        ForgotPasswordComponent
      ],
      imports: [
        HttpClientModule,
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
        IgxCheckboxModule,
        OAuthModule.forRoot()
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-supporttool'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ng-supporttool');
  });

  it('should render lightgray background', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#rootContainer').className).toContain('bg-lightgray');
  });
});
