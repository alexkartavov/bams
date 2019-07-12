import { Injectable } from '@angular/core';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class ValueProcessingService {

  public typeData: any[] = ['Account Update',
                            'DDA/Bank Account Update',
                            'Statement/Fee Enquiry',
                            'Client Complaint',
                            'Funding Day Change Request',
                            'Other'
                          ];
  typeValues = ['ACCOUNT_UPDATE',
                'DDA_BANK_ACCOUNT_UPDATE',
                'STATEMENT_FEE_ENQUIRY',
                'CLIENT_COMPLAINT',
                'FUNDING_DAY_CHANGE_REQUEST',
                'OTHER'];

  public statusData: any[] = ['Open', 'In Progress', 'Closed'];
  statusValues = ['OPEN', 'IN_PROGRESS', 'CLOSED'];

  public statusOpen = this.statusValues[0];
  public statusInPropgress = this.statusValues[1];
  public statusClosed = this.statusValues[2];

  public priorityData: any[] = ['Warm Call Transfer', 'Low', 'Medium', 'High'];
  priorityValues = ['WARM_CALL_TRANSFER', 'LOW', 'MEDIUM', 'HIGH'];

  public userRoleData: any[] = ['Support User', 'Support Administrator'];
  public userRoleValues = [Role.User, Role.Admin];

  public kbTopicsData: any[] = [{
      topic: 'General'
    },
    {
      topic: 'Merchant Management'
    },
    {
      topic: 'User Access Management'
    },
    {
      topic: 'Reporting'
    }
  ];

  public reportRangeAll = 'All Available History';
  public reportRangeCurrentMonth = 'Current Month';
  public reportRangePast3Months = 'Past 3 months';
  public reportRangePast6Months = 'Past 6 months';
  public reportRangePast12Months = 'Past 12 months';
  public reportRangeData: string[] = [this.reportRangeAll, this.reportRangeCurrentMonth, this.reportRangePast3Months,
    this.reportRangePast6Months, this.reportRangePast12Months];
  public reportTypeData: string[] = [
    'All Support Tickets',
    'Resolved Tickets',
    'Open Tickets',
    'Merchant',
    'Beneficial Owners'
  ];

  channels = [
    {
      title: 'ANET',
      property: 'isAnet',
      map: 'anet',
      color: 'darkblue'
    },
    {
      title: 'BAMS',
      property: 'isBams',
      map: 'bams', // if PUT payload expects a different field name, it can be specified here
      color: 'orange'
    },
    {
      title: 'BANA',
      property: 'isBana',
      map: 'bana',
      color: 'green'
    },
    {
      title: 'FB',
      property: 'isFb',
      map: 'fb',
      color: 'brown'
    },
    {
      title: 'IAO',
      property: 'isIao',
      map: 'iao',
      color: 'red'
    },
    {
      title: 'LVMH',
      property: 'isLvmh',
      map: 'lvmh',
      color: 'darkcyan'
    }
  ];

  constructor() { }

  private getValueByTitle(title: string, values: string[], titles: string[]): string {
    if (!title) {
      return null;
    }
    const i = titles.indexOf(title);
    return values[i];
  }

  private getTitleByValue(value: string, values: string[], titles: string[]): string {
    if (!value) {
      return null;
    }
    const i = values.indexOf(value);
    return titles[i];
  }

  /*************** Ticket Types ******************/
  public ticketTypes(): string[] {
    return this.typeData;
  }

  public getTicketTypeValue(title: string): string {
    return this.getValueByTitle(title, this.typeValues, this.typeData);
  }

  public getTicketTypeTitle(value: string): string {
    return this.getTitleByValue(value, this.typeValues, this.typeData);
  }

  /*************** Ticket Statuses ******************/
  public ticketStatuses(): string[] {
    return this.statusData;
  }

  public getTicketStatusValue(title: string): string {
    return this.getValueByTitle(title, this.statusValues, this.statusData);
  }

  public getTicketStatusTitle(value: string): string {
    return this.getTitleByValue(value, this.statusValues, this.statusData);
  }

  /*************** Ticket Priorities ******************/
  public ticketPriorities(): string[] {
    return this.priorityData;
  }

  public getTicketPriorityValue(title: string): string {
    return this.getValueByTitle(title, this.priorityValues, this.priorityData);
  }

  public getTicketPriorityTitle(value: string): string {
    return this.getTitleByValue(value, this.priorityValues, this.priorityData);
  }

  /*************** User Roles ******************/
  public userRoles(): string[] {
    return this.userRoleData;
  }

  public getUserRoleTitle(value: string): string {
    return this.getTitleByValue(value, this.userRoleValues, this.userRoleData);
  }

  public getUserRoleValue(title: string): string {
    return this.getValueByTitle(title, this.userRoleValues, this.userRoleData);
  }

  platformName(appRefNo: string) {
    if (appRefNo) {
      for (let i = 0; i < this.channels.length; i++) {
        if (appRefNo.startsWith(this.channels[i].title)) {
          return this.channels[i].title;
        }
      }
    }
    return appRefNo;
  }

  platformNameColor(appRefNo: string) {
    let color = 'darkblue';
    this.channels.forEach(c => {
      if (this.platformName(appRefNo) === c.title) {
        color = c.color;
      }
    });
    return color;
  }
}
