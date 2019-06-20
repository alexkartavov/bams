import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, Input, SimpleChanges, OnChanges } from '@angular/core';
import { SupportDataSource } from 'src/app/tabs/my-support/support-datasource';
import { SupportDataService } from 'src/app/_services/support-data.service';
import { ValueProcessingService } from 'src/app/_services/value-processing.service';
import { IgxGridComponent } from 'igniteui-angular';
import { ExportService } from 'src/app/_services/export.service';

@Component({
  selector: 'app-open-tickets-report',
  templateUrl: './open-tickets-report.component.html',
  styleUrls: ['./open-tickets-report.component.scss']
})
export class OpenTicketsReportComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  public type: string;
  @Input()
  public startDate?: number;
  @Input()
  public endDate?: number;

  @ViewChild('ticketsGrid', { static: false }) public ticketsGrid: IgxGridComponent;
  dataSource: SupportDataSource;

  public page = 1;
  public lastPage = false;
  public firstPage = true;
  public totalCount = 0;
  @ViewChild('pagerTemplate', { read: TemplateRef, static: false })
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
    private exportService: ExportService) {
      this.dataSource = new SupportDataSource(supportDataService);
    }

  ngOnInit() {
    this.dataSource.getTotalCount().subscribe(count => this.totalCount = count);
    this.paginate(0);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.paginate(0);
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }

  pageChanged(event) {
    this.paginate(event.page - 1);
  }

  requestParams(page: number, perPage: number) {
    return {
      page: page,
      pageSize: perPage,
      ticketStatuses: [this.valueService.statusOpen, this.valueService.statusInPropgress],
      ticketType: this.valueService.getTicketTypeValue(this.type),
      startDate: this.startDate,
      endDate: this.endDate,
      search: null,
      sortByName: null,
      sortAscending: true
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
      ticks = new Date().getTime();
    }
    const d = new Date();
    d.setTime(parseInt(ticks, 10));
    return d.toLocaleDateString();
  }

  getDaysSince(fromDate?: number): number {
    if (!fromDate) {
      return 0;
    }
    const toDate = new Date().getTime();
    return Math.floor((toDate - fromDate) / 86400000);
  }

  exportRule(column): string | Function {
    switch (column.header) {
      case 'Ticket Type':
        return (item) => this.valueService.getTicketTypeTitle(item.type);
      case 'Priority':
        return (item) => this.valueService.getTicketPriorityTitle(item.priority);
      case 'Ticket Status':
        return (item) => this.valueService.getTicketStatusTitle(item.status);
      case 'Created On':
        return (item) => this.getDateString(item.createdDate);
      case 'Days Open':
        return (item) => this.getDaysSince(item.createdDate);
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
      this.exportService.exportXlsxFile(headers, items, 'openTicketsExport', 'Tickets');
    });
  }
}
