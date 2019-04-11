import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ValueProcessingService } from 'src/app/_services/value-processing.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { AllTicketsReportComponent } from './all-tickets-report/all-tickets-report.component';
import {TimeToResolveReportComponent } from './time-to-resolve-report/time-to-resolve-report.component';
import { OpenTicketsReportComponent } from './open-tickets-report/open-tickets-report.component';

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
export class ReportingComponent implements OnInit {

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
  // #endregion AllTicketsReport

  // #region TimeToResolveReport
  @ViewChild('timeToResolveReport')
  public timeToResolveReport: TimeToResolveReportComponent;
  // #endregion TimeToResolveReport

  // #region OpenTicketsReport
  @ViewChild('openTicketsReport')
  public openTicketsReport: OpenTicketsReportComponent;
  // #endregion OpenTicketsReport

  constructor(private valueService: ValueProcessingService) {
    this.reportTypeData = valueService.reportTypeData;
    this.reportType = this.reportTypeData[0];

    this.reportRangeData = this.reportRangeData.concat(valueService.reportRangeData);

    const year = new Date().getFullYear();
    this.reportRangeData.push((year - 1).toString());
    this.reportRangeData.push((year - 2).toString());

    this.reportRange = this.reportRangeData[0];
  }

  ngOnInit() {
  }

  cancel(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  selectReport(i) {
    if (i >= 0 && i < this.reportTypeData.length) {
      this.reportType = this.reportTypeData[i];
    }
  }

  selectReportRange(i) {
    if (i >= 0 && i < this.reportRangeData.length) {
      this.reportRange = this.reportRangeData[i];
      this.fromDatePicker.nativeElement.value = '';
      this.toDatePicker.nativeElement.value = '';
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
    }
  }

  // #region AllTicketsReport
  selectType(type) {
    this.filterType = type;
    // this.profileService.set('tickets.filterType', this.filterType);
    // this.paginate(0);
  }

  selectStatus(status) {
    this.filterStatus = status;
    // this.profileService.set('tickets.filterStatus', this.filterStatus);
    // this.paginate(0);
  }

  selectPriority(priority) {
    this.filterPriority = priority;
    // this.profileService.set('tickets.filterPriority', this.filterPriority);
    // this.paginate(0);
  }

  clearFilters() {
    this.filterPriority = '';
    this.filterStatus = '';
    this.filterType = '';
    // this.profileService.remove('tickets.filterType');
    // this.profileService.remove('tickets.filterStatus');
    // this.profileService.remove('tickets.filterPriority');
    // this.paginate(0);
  }
  // #endregion AllTicketsReport

}
