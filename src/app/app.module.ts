import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule, BsDatepickerModule, ButtonsModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { IgxTabsModule, IgxGridModule, IgxIconModule,
   IgxDialogModule, IgxNavbarModule, IgxColumnHidingModule,
   IgxAvatarModule, IgxListModule, IgxTooltipModule, IgxCheckboxModule } from 'igniteui-angular';
import { MsalModule, MsalInterceptor } from 'angular-msal';

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
import { MerchantDataReportComponent } from './tabs/reporting/merchant-data-report/merchant-data-report.component';
import { MerchantDetailsOrdersComponent } from './tabs/merchant-management/merchant-details-orders/merchant-details-orders.component';
import { MerchantNotesComponent } from './tabs/merchant-management/merchant-notes/merchant-notes.component';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { BeneficialOwnersReportComponent } from './tabs/reporting/beneficial-owners-report/beneficial-owners-report.component';

import { JwtInterceptor} from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { environment } from 'src/environments/environment';
import { LogLevel } from 'msal';
// import { fakeBackendProvider } from './_helpers/fake-backend';

export function baseUri() {
   return window.location.protocol + '//' + window.location.host + '/';
}

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
      OpenTicketsReportComponent,
      MerchantDataReportComponent,
      MerchantDetailsOrdersComponent,
      MerchantNotesComponent,
      ForgotPasswordComponent,
      BeneficialOwnersReportComponent
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
      RouterModule.forRoot(appRoutes),
      MsalModule.forRoot({
         clientID: environment.auth.clientID,
         authority: environment.auth.authority, // + environment.auth.userFlowTeacher,
         validateAuthority: true,
         cacheLocation: 'sessionStorage',
         postLogoutRedirectUri: baseUri,
         redirectUri: baseUri,
         navigateToLoginRequestUrl: true,
         popUp: true,
         consentScopes: environment.auth.scopes,
         // logger: loggerCallback,
         // correlationId: 'correlationId1234',
         // level: LogLevel.Info,
         // piiLoggingEnabled: true
      }),
      // MsalModule.forRoot({
      //    clientID: '32338b6d-d345-4c8a-a695-a07bd256ede0',
      //    authority: 'https://login.windows.net/bc8fea98-c3ce-4ff8-9f5c-cadeeebdf5a8/',
      //    redirectUri: '/',
      //    // validateAuthority : true,
      //    // cacheLocation : 'localStorage',
      //    postLogoutRedirectUri: '/',
      //    navigateToLoginRequestUrl : true,
      //    popUp: true,
      //    // consentScopes: ['user.read', 'api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user'],
      //    // unprotectedResources: ['https://angularjs.org/'],
      //    // protectedResourceMap : protectedResourceMap,
      //    // logger :loggerCallback,
      //    // correlationId: '1234',
      //    // level: LogLevel.Verbose,
      //    // piiLoggingEnabled: true,
      // }),
      ButtonsModule.forRoot()
   ],
   providers: [
      AlertifyService,
      SupportDataService,

      // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

      // provider used to create fake backend
      // fakeBackendProvider
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      MerchantDetailsComponent
   ]
})
export class AppModule { }
