import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { IgxTabsModule, IgxGridModule, IgxIconModule,
   IgxDialogModule, IgxNavbarModule, IgxColumnHidingModule,
   IgxAvatarModule, IgxListModule, IgxTooltipModule, IgxCheckboxModule } from 'igniteui-angular';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataServiceService } from './_services/in-memory-data-service.service';

import { appRoutes } from './routes';

import { AlertifyService } from './_services/alertify.service';
import { InitialsPipe } from './_services/initials.pipe';
import { TimePassedPipe } from './_services/time-passed.pipe';
import { SupportDataService } from './_services/support-data.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { TabsComponent } from './tabs/tabs.component';
import { MerchantManagementComponent } from './tabs/merchant-management/merchant-management.component';
import { UserAccessManagementComponent } from './tabs/user-access-management/user-access-management.component';
import { KnowledgebaseComponent } from './tabs/knowledgebase/knowledgebase.component';
import { ReportingComponent } from './tabs/reporting/reporting.component';
import { MySupportComponent } from './tabs/my-support/my-support.component';
import { MerchantDetailsComponent } from './tabs/merchant-management/merchant-details/merchant-details.component';
import { NavMerchantComponent } from './tabs/merchant-management/nav-merchant/nav-merchant.component';
import { MoreActionsMerchantComponent } from './tabs/merchant-management/more-actions-merchant/more-actions-merchant.component';
import { MerchantStatementsComponent } from './tabs/merchant-management/merchant-statements/merchant-statements.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { UpdateUserAccessComponent } from './tabs/user-access-management/update-user-access/update-user-access.component';
import { AddTicketComponent } from './tabs/my-support/add-ticket/add-ticket.component';
import { ViewTicketComponent } from './tabs/my-support/view-ticket/view-ticket.component';
import { PagerComponent } from './pager/pager.component';
import { TimeStampComponent } from './time-stamp/time-stamp.component';
import { ColumnHidingComponent } from './column-hiding/column-hiding.component';
import { AddFaqComponent } from './tabs/knowledgebase/add-faq/add-faq.component';
import { SortIndicatorComponent } from './sort-indicator/sort-indicator.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { FilterTicketsComponent } from './tabs/my-support/filter-tickets/filter-tickets.component';
import { AllTicketsReportComponent } from './tabs/reporting/all-tickets-report/all-tickets-report.component';
import { TimeToResolveReportComponent } from './tabs/reporting/time-to-resolve-report/time-to-resolve-report.component';
import { OpenTicketsReportComponent } from './tabs/reporting/open-tickets-report/open-tickets-report.component';

@NgModule({
   declarations: [
      AppComponent,
      InitialsPipe,
      TimePassedPipe,
      HomeComponent,
      NavComponent,
      TabsComponent,
      MerchantManagementComponent,
      UserAccessManagementComponent,
      KnowledgebaseComponent,
      ReportingComponent,
      MySupportComponent,
      MerchantDetailsComponent,
      NavMerchantComponent,
      SearchBoxComponent,
      UpdateUserAccessComponent,
      AddTicketComponent,
      ViewTicketComponent,
      PagerComponent,
      TimeStampComponent,
      ColumnHidingComponent,
      MoreActionsMerchantComponent,
      MerchantStatementsComponent,
      AddFaqComponent,
      SortIndicatorComponent,
      ConfirmComponent,
      FilterTicketsComponent,
      AllTicketsReportComponent,
      TimeToResolveReportComponent,
      OpenTicketsReportComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      // InMemoryWebApiModule.forRoot(InMemoryDataServiceService),
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      ModalModule.forRoot(),
      PopoverModule.forRoot(),
      PaginationModule.forRoot(),
      TypeaheadModule.forRoot(),
      BrowserAnimationsModule,
      IgxTabsModule,
      IgxIconModule,
      IgxGridModule,
      IgxDialogModule,
      IgxNavbarModule,
      IgxColumnHidingModule,
      IgxAvatarModule,
      IgxListModule,
      IgxTooltipModule,
      IgxCheckboxModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      AlertifyService,
      SupportDataService
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      MerchantDetailsComponent
   ]
})
export class AppModule { }
