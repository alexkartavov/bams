import { Component, OnInit, ViewChild, OnDestroy, TemplateRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SupportDataService } from 'src/app/_services/support-data.service';
import { SupportTicketModel } from 'src/app/models/support-ticket';
import { IgxGridComponent, SortingDirection } from 'igniteui-angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { SupportDataSource } from './support-datasource';
import { ValueProcessingService } from 'src/app/_services/value-processing.service';
import { ExportService } from 'src/app/_services/export.service';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-my-support',
  templateUrl: './my-support.component.html',
  styleUrls: ['./my-support.component.scss']
})
export class MySupportComponent implements OnInit, OnDestroy, AfterViewInit {

  public dataSource: SupportDataSource;
  public supportTicket: SupportTicketModel;
  @ViewChild('ticketsGrid', { static: false }) public ticketsGrid: IgxGridComponent;
  public selectedTicket: SupportTicketModel;

  public page = 0;
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

  public searchBoxText = '';

  public sortedColumn = '';
  public sortDirection = false;

  public filterType: string;
  public filterStatus: string;
  public filterPriority: string;

  constructor(private supportDataService: SupportDataService,
    private router: Router,
    private authService: AuthService,
    private valueService: ValueProcessingService,
    private exportService: ExportService,
    private profileService: ProfileService,
    private cd: ChangeDetectorRef) {
      this.dataSource = new SupportDataSource(supportDataService);
    }

  ngOnInit() {
    this.dataSource.getTotalCount().subscribe(count => this.totalCount = count);

    this.filterType = this.profileService.get('tickets.filterType');
    this.filterStatus = this.profileService.get('tickets.filterStatus');
    this.filterPriority = this.profileService.get('tickets.filterPriority');

    this.paginate(0);
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }

  ngAfterViewInit(): void {
    this.updateGridProfile();
  }

  refresh() {
    this.paginate(this.page - 1,
      (items) => {
        if (this.selectedTicket) { // refresh selectedTicket so the attachments are shown in the UI
          const newRow = items.find(row => row.id === this.selectedTicket.id);
          if (newRow) {
            this.selectRow(newRow);
          }
        }
      }
    );
  }

  pageChanged(event) {
    this.paginate(event.page - 1);
  }

  preloadData() {
    // TODO: read sorting infor from profile and apply to data binding
  }

  sortingDone() {
    while (this.ticketsGrid.sortingExpressions.length > 1) {
      this.ticketsGrid.sortingExpressions.shift();
    }
    const sort = this.ticketsGrid.sortingExpressions[0];
    if (sort && sort.fieldName) {
      this.sortedColumn = sort.fieldName;
      this.sortDirection = sort.dir === SortingDirection.Asc;
      this.profileService.set('tickets.grid.sortedColumn', this.sortedColumn);
      this.profileService.set('tickets.grid.sortDirection', this.sortDirection);
    } else {
      this.sortedColumn = null;
      this.sortDirection = true;
      this.profileService.remove('tickets.grid.sortedColumn');
      this.profileService.remove('tickets.grid.sortDirection');
    }
    this.paginate(0);
  }

  requestParams(page: number, perPage: number) {
    return {
      page: page,
      pageSize: perPage,
      ticketPriority: this.valueService.getTicketPriorityValue(this.filterPriority),
      ticketStatus: this.valueService.getTicketStatusValue(this.filterStatus),
      ticketType: this.valueService.getTicketTypeValue(this.filterType),
      search: this.searchBoxText ? this.searchBoxText : null,
      sortByName: this.sortedColumn ? this.sortedColumn : null,
      sortAscending: this.sortDirection
    };
  }

  public paginate(page: number, completed?: Function) {
    this.dataSource.loadTickets(this.requestParams(page, this.perPage),
      (items) => {
        if (completed) { completed(items); }
      });
    this.page = page + 1;
  }

  newSupportTicket() {
    this.supportTicket = new SupportTicketModel();
  }

  ticketAdded(ticket: SupportTicketModel) {
    this.refresh();
  }

  handleRowSelection(event) {
    const targetCell = event.cell;
    this.selectRow(targetCell.row.rowData);
  }

  selectRow(rowData) {
    this.ticketsGrid.deselectAllRows();
    this.ticketsGrid.selectRows([rowData.id]);
    this.selectedTicket = rowData;
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

  selectType(type) {
    this.filterType = type;
    this.profileService.set('tickets.filterType', this.filterType);
    this.paginate(0);
  }

  selectStatus(status) {
    this.filterStatus = status;
    this.profileService.set('tickets.filterStatus', this.filterStatus);
    this.paginate(0);
  }

  selectPriority(priority) {
    this.filterPriority = priority;
    this.profileService.set('tickets.filterPriority', this.filterPriority);
    this.paginate(0);
  }

  clearFilters() {
    this.filterPriority = '';
    this.filterStatus = '';
    this.filterType = '';
    this.profileService.remove('tickets.filterType');
    this.profileService.remove('tickets.filterStatus');
    this.profileService.remove('tickets.filterPriority');
    this.paginate(0);
  }

  search(text) {
    this.searchBoxText = text;
    this.paginate(0);
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

  print() {
    this.getAll((headers, items) => {
      this.exportService.print('Tickets', headers, items);
    });
  }

  download() {
    this.getAll((headers, items) => {
      this.exportService.exportXlsxFile(headers, items, 'ticketExport', 'Tickets');
    });
  }

  ////////////////////////////////////
  // #region Grid profile save/restore

  columnResized(event) {
    this.profileService.set('tickets.grid.columns.' + event.column.header + '.width', event.newWidth);
  }

  columnVisibility(columns) {
    columns.forEach((c) => {
      if (!c.hidden) {
        this.profileService.remove('tickets.grid.columns.' + c.header + '.hidden');
      } else {
        this.profileService.set('tickets.grid.columns.' + c.header + '.hidden', c.hidden);
      }
    });
  }

  updateGridProfile() {
    if (!this.ticketsGrid) { return; }

    const gridProfile = this.profileService.get('tickets.grid');

    if (gridProfile) {
      this.sortedColumn = <string>gridProfile.sortedColumn || '';
      const profileSortDir = <boolean>gridProfile.sortDirection;
      this.sortDirection = profileSortDir || typeof profileSortDir === 'undefined';

      if (this.sortedColumn) {
        this.ticketsGrid.sort({
          fieldName: this.sortedColumn,
          dir: this.sortDirection ? SortingDirection.Asc : SortingDirection.Desc
        });
      }

      if (gridProfile.columns) {
        for (const prop in gridProfile.columns) {
          if (!gridProfile.columns.hasOwnProperty(prop)) {
            continue;
          }
          const column = this.ticketsGrid.columns.find((col) => col.header === prop);
          if (column) {
            if (gridProfile.columns[prop].hidden) {
              column.hidden = true;
            }
            if (gridProfile.columns[prop].width) {
              column.width = gridProfile.columns[prop].width;
            }
          }
        }
      }
    }

    this.cd.detectChanges();
  }
  // #endregion Grid profile save/restore
  ////////////////////////////////////
}
