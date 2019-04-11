import { Injectable } from '@angular/core';

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

  public userRoleData: any[] = ['Support Administrator', 'Support User'];
  userRoleValues = ['SUPPORT_ADMIN', 'SUPPORT_USER'];

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
  public reportTypeData: string[] = ['All Support Tickets', 'Resolved Tickets', 'Open Tickets', 'Merchant'];

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
}
