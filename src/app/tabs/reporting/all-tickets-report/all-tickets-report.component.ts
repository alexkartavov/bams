import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { SupportDataSource } from 'src/app/tabs/my-support/support-datasource';
import { SupportDataService } from 'src/app/_services/support-data.service';
import { ValueProcessingService } from 'src/app/_services/value-processing.service';
import { IgxGridComponent } from 'igniteui-angular';
import { ExportService } from 'src/app/_services/export.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-all-tickets-report',
  templateUrl: './all-tickets-report.component.html',
  styleUrls: ['./all-tickets-report.component.scss']
})
export class AllTicketsReportComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('ticketsGrid') public ticketsGrid: IgxGridComponent;
  dataSource: SupportDataSource;

  @Input()
  public type: string;
  @Input()
  public status: string;
  @Input()
  public priority: string;
  @Input()
  public startDate?: number;
  @Input()
  public endDate?: number;

  public page = 1;
  public lastPage = false;
  public firstPage = true;
  public totalCount = 0;
  @ViewChild('pagerTemplate', { read: TemplateRef })
  public pager: TemplateRef<any>;

  private _perPage = 10;
  public get perPage(): number {
      return this._perPage;
  }
  public set perPage(val: number) {
      this._perPage = val;
      this.paginate(0);
  }

  constructor(private supportDataService: SupportDataService,
    private valueService: ValueProcessingService,
    private exportService: ExportService,
    private authService: AuthService) {
    this.dataSource = new SupportDataSource(supportDataService);
  }

  ngOnInit() {
    this.dataSource.getTotalCount().subscribe(count => this.totalCount = count);
    this.paginate(0);
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.paginate(0);
  }

  pageChanged(event) {
    this.paginate(event.page - 1);
  }

  requestParams(page: number, perPage: number) {
    return {
      page: page,
      pageSize: perPage,
      ticketPriority: this.valueService.getTicketPriorityValue(this.priority),
      ticketStatus: this.valueService.getTicketStatusValue(this.status),
      ticketType: this.valueService.getTicketTypeValue(this.type),
      startDate: this.startDate,
      endDate: this.endDate,
      search: null,
      sortByName: null,
      sortAscending: true,
      cepSupportUser: this.authService.getCepSupportUser()
    };
  }

  public paginate(page: number, completed?: Function) {
    this.dataSource.loadTickets(this.requestParams(page, this.perPage),
      (items) => {
        this.page = page + 1;
        if (completed) { completed(items); }
      });
  }

  handleRowSelection(event) {
    const targetCell = event.cell;
    this.selectRow(targetCell.row.rowData);
  }

  selectRow(rowData) {
    this.ticketsGrid.deselectAllRows();
    this.ticketsGrid.selectRows([rowData.id]);
  }

  ticketTypeTitle(value: string): string {
    return this.valueService.getTicketTypeTitle(value);
  }

  ticketPriorityTitle(value: string): string {
    return this.valueService.getTicketPriorityTitle(value);
  }

  ticketStatusTitle(value: string): string {
    return this.valueService.getTicketStatusTitle(value);
  }

  getDateString(ticks): string {
    if (!ticks) {
      return '';
    }
    const d = new Date();
    d.setTime(parseInt(ticks, 10));
    return d.toLocaleDateString();
  }

  exportRule(column): string | Function {
    switch (column.header) {
      case 'DBA Name':
        return (item) => item.merchant ? item.merchant.dbaName : '';
      case 'Merchant Name':
        return (item) => item.merchant ? item.merchant.firstName + ' ' + item.merchant.lastName : '';
      case 'Phone Number':
        return (item) => item.merchant ? item.merchant.phoneNumber : '';
      case 'Email Address':
        return (item) => item.merchant ? item.merchant.emailAddress : '';
      case 'Ticket Type':
        return (item) => this.valueService.getTicketTypeTitle(item.type);
      case 'Priority':
        return (item) => this.valueService.getTicketPriorityTitle(item.priority);
      case 'Ticket Status':
        return (item) => this.valueService.getTicketStatusTitle(item.status);
      case 'Created On':
        return (item) => this.getDateString(item.createdDate);
    }
    return column.field;
  }

  getAll(ready: Function) {
    const ds = new SupportDataSource(this.supportDataService);
    ds.connect();
    ds.loadTickets(this.requestParams(0, this.totalCount));
    const _sub = ds.ticketsSubject.subscribe(items => {
      if (!items.length) {
        return;
      }

      const headers = {};
      this.ticketsGrid.columns.forEach(col => {
        if (!col.hidden) {
          const rule = this.exportRule(col);
          if (rule) {
            headers[col.header] = rule;
          }
        }
      });

      ready(headers, items);

      _sub.unsubscribe();
      ds.disconnect();
    });
  }

  download() {
    this.getAll((headers, items) => {
      this.exportService.exportXlsxFile(headers, items, 'ticketExport', 'Tickets');
    });
  }
}
