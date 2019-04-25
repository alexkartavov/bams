import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ValueProcessingService } from 'src/app/_services/value-processing.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { AllTicketsReportComponent } from './all-tickets-report/all-tickets-report.component';
import {TimeToResolveReportComponent } from './time-to-resolve-report/time-to-resolve-report.component';
import { OpenTicketsReportComponent } from './open-tickets-report/open-tickets-report.component';
import { MerchantDataReportComponent } from './merchant-data-report/merchant-data-report.component';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss'],
  animations: [
    trigger('showReport', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(250, style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class ReportingComponent implements OnInit, AfterViewInit {

  reportType: string;
  reportTypeData: string[];

  reportRange: string;
  reportRangeData: string[] = [];

  @ViewChild('fromDatePicker')
  public fromDatePicker: ElementRef;

  @ViewChild('toDatePicker')
  public toDatePicker: ElementRef;

  // #region AllTicketsReport
  @ViewChild('allTicketsReport')
  public allTicketsReport: AllTicketsReportComponent;

  public filterType: string;
  public filterStatus: string;
  public filterPriority: string;

  public startDate?: number = null;
  public endDate?: number = null;

  public fromDate?: number = null;
  public toDate?: number = null;
  // #endregion AllTicketsReport

  // #region TimeToResolveReport
  @ViewChild('timeToResolveReport')
  public timeToResolveReport: TimeToResolveReportComponent;
  // #endregion TimeToResolveReport

  // #region OpenTicketsReport
  @ViewChild('openTicketsReport')
  public openTicketsReport: OpenTicketsReportComponent;
  // #endregion OpenTicketsReport

  // #region MerchantDataReport
  @ViewChild('merchantDataReport')
  public merchantDataReport: MerchantDataReportComponent;
  // #endregion MerchantDataReport

  constructor(private valueService: ValueProcessingService,
              private profileService: ProfileService) {
    this.reportTypeData = valueService.reportTypeData;
    this.reportType = profileService.get('reports.reportType') || this.reportTypeData[0];

    this.reportRangeData = this.reportRangeData.concat(valueService.reportRangeData);

    const year = new Date().getFullYear();
    this.reportRangeData.push((year - 1).toString());
    this.reportRangeData.push((year - 2).toString());

    this.reportRange = profileService.get('reports.reportRange') || this.reportRangeData[0];
    this.filterType = this.profileService.get('reports.filterType') || null;
    this.filterStatus = this.profileService.get('reports.filterStatus') || null;
    this.filterPriority = this.profileService.get('reports.filterPriority') || null;
    this.fromDate = this.profileService.get('reports.fromDate') || null;
    this.toDate = this.profileService.get('reports.toDate') || null;
  }

  ngOnInit() {
    const reportIndex = this.reportRangeData.indexOf(this.reportRange);
    if (reportIndex >= 0) {
      this.selectReportRange(reportIndex);
    }
    if (this.fromDate || this.toDate) {
      this.selectCustomRange(this.fromDate, this.toDate);
    }
  }

  ngAfterViewInit() {
  }

  cancel(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  selectReport(i) {
    if (i >= 0 && i < this.reportTypeData.length) {
      this.reportType = this.reportTypeData[i];
      this.profileService.set('reports.reportType', this.reportType);
    }
  }

  selectReportRange(i) {
    if (i >= 0 && i < this.reportRangeData.length) {
      this.reportRange = this.reportRangeData[i];
      this.profileService.set('reports.reportRange', this.reportRange);
      if (this.fromDatePicker) {
        this.fromDatePicker.nativeElement.value = '';
      }
      if (this.toDatePicker) {
        this.toDatePicker.nativeElement.value = '';
      }
      const now = new Date();
      const thisYear = now.getFullYear().toString();
      const lastYear = (now.getFullYear() - 1).toString();
      const yearBefore = (now.getFullYear() - 2).toString();
      switch (this.reportRange) {
        case this.valueService.reportRangeAll: {
          this.startDate = null;
          this.endDate = null;
          break;
        }
        case this.valueService.reportRangeCurrentMonth: {
          this.endDate = null;
          this.startDate = new Date((now.getMonth() + 1).toString() + '/01/' + now.getFullYear()).getTime();
          break;
        }
        case this.valueService.reportRangePast3Months: {
          this.endDate = null;
          this.startDate = this.subtractMonths(now, 3).getTime();
          break;
        }
        case this.valueService.reportRangePast6Months: {
          this.endDate = null;
          this.startDate = this.subtractMonths(now, 6).getTime();
          break;
        }
        case this.valueService.reportRangePast12Months: {
          this.endDate = null;
          this.startDate = new Date((now.getMonth() + 1).toString() + '/' + now.getDate() + '/' +
            (now.getFullYear() - 1).toString()).getTime();
          break;
        }
        case lastYear: {
          this.startDate = new Date('01/01/' + lastYear).getTime();
          this.endDate = new Date('01/01/' + thisYear).getTime();
          break;
        }
        case yearBefore: {
          this.startDate = new Date('01/01/' + yearBefore).getTime();
          this.endDate = new Date('01/01/' + lastYear).getTime();
          break;
        }
      }
    }
  }

  subtractMonths(date: Date, months: number): Date {
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let y = date.getFullYear();

    m -= months;
    if (m <= 0) {
      m = 12 + m;
      y--;
    }

    if (d === 31 && [4, 6, 9, 11].indexOf(m) >= 0) {
      d = 30;
    }
    if (m === 2 && d > 28) {
      d = 28;
    }

    return new Date(m + '/' + d + '/' + y);
  }

  selectCustomRange(fromDate, toDate) {
    fromDate ?
      this.profileService.set('reports.fromDate', fromDate) :
      this.profileService.remove('reports.fromDate');
    toDate ?
      this.profileService.set('reports.toDate', toDate) :
      this.profileService.remove('reports.toDate');

    if (!fromDate && ! toDate) {
      this.startDate = null;
      this.endDate = null;
      this.reportRange = this.reportRangeData[0];
      return;
    }
    if (!fromDate) {
      this.startDate = null;
      this.endDate = new Date(toDate).getTime();
      this.reportRange = toDate + ' and earlier';
      return;
    }
    if (!toDate) {
      this.endDate = null;
      this.startDate = new Date(fromDate).getTime();
      this.reportRange = fromDate + ' and later';
      return;
    }
    this.startDate = new Date(fromDate).getTime();
    this.endDate = new Date(toDate).getTime();
    this.reportRange = fromDate + ' - ' + toDate;
  }

  downloadReport() {
    switch (this.reportType) {
      case this.reportTypeData[0]:
        this.allTicketsReport.download();
        break;
      case this.reportTypeData[1]:
        this.timeToResolveReport.download();
        break;
      case this.reportTypeData[2]:
        this.openTicketsReport.download();
        break;
      case this.reportTypeData[3]:
        this.merchantDataReport.download();
        break;
    }
  }

  // #region AllTicketsReport
  selectType(type) {
    this.filterType = type;
    this.profileService.set('reports.filterType', this.filterType);
  }

  selectStatus(status) {
    this.filterStatus = status;
    this.profileService.set('reports.filterStatus', this.filterStatus);
  }

  selectPriority(priority) {
    this.filterPriority = priority;
    this.profileService.set('reports.filterPriority', this.filterPriority);
  }

  clearFilters() {
    this.filterPriority = '';
    this.filterStatus = '';
    this.filterType = '';
    this.profileService.remove('reports.filterType');
    this.profileService.remove('reports.filterStatus');
    this.profileService.remove('reports.filterPriority');
  }
  // #endregion AllTicketsReport

}
