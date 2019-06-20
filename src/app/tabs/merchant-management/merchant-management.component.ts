import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { IgxGridComponent, SortingDirection } from 'igniteui-angular';
import { MerchantDataService } from '../../_services/merchant-data.service';
import { AlertifyService } from '../../_services/alertify.service';
import { MerchantModel } from 'src/app/models/merchant-model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MerchantDetailsComponent } from './merchant-details/merchant-details.component';
import { SupportTicketModel } from 'src/app/models/support-ticket';
import { SupportDataService } from 'src/app/_services/support-data.service';
import { MerchantDataSource } from './merchant-datasource';
import { ActivatedRoute } from '@angular/router';
import { ExportService } from 'src/app/_services/export.service';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-merchant-management',
  templateUrl: './merchant-management.component.html',
  styleUrls: ['./merchant-management.component.scss']
})
export class MerchantManagementComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('merchGrid') public merchGrid: IgxGridComponent;
  public dataSource: MerchantDataSource;
  public cardData: MerchantModel[];

  merchColumns = [
    {
      header: 'MID Number',
      field: 'midNumber',
      hidden: false
    },
    {
      header: 'DBA Name',
      field: 'dbaName',
      hidden: false
    },
    {
      header: 'Legal Business Name',
      field: 'legalBusinessName',
      hidden: false
    },
    {
      header: 'Merchant Name',
      field: '',
      hidden: false
    },
    {
      header: 'Phone Number',
      field: 'phoneNumber',
      hidden: false
    },
    {
      header: 'Email Address',
      field: 'emailAddress',
      hidden: false
    },
    {
      header: 'Address',
      field: 'address',
      hidden: false
    },
    {
      header: 'MCC',
      field: 'mcc1',
      hidden: false
    },
    {
      header: 'Tax Filing Name',
      field: 'taxFilingName',
      hidden: false
    },
    {
      header: 'Tax ID Number',
      field: 'taxIdNumber',
      hidden: false
    },
    {
      header: 'Account Status',
      field: 'accountStatus',
      hidden: false
    },
    {
      header: 'Platform',
      field: 'platform',
      hidden: false
    },
    {
      header: 'Actions',
      field: '',
      hidden: false
    }
  ];

  public currentRowID: string;
  public updateModel: MerchantModel;
  bsModalRef: BsModalRef;
  public caseSensitive = false;
  public exactMatch = false;

  public page = 0;
  public lastPage = false;
  public firstPage = true;
  public totalCount = 0;
  public loadedCount = 0;
  @ViewChild('pagerTemplate', { read: TemplateRef })
  public pager: TemplateRef<any>;

  public showCards = false;
  public selectedMerchantId = -1;
  public cardsLoaded = 0;

  public currentRowData: MerchantModel;
  public supportTicket: SupportTicketModel;

  public searchBoxText = '';

  public sortedColumn = '';
  public sortDirection = true;

  private _perPage = 10;
  _dataSubscriber: any;

  public get perPage(): number {
      return this._perPage;
  }

  public set perPage(val: number) {
      this._perPage = val;
      this.paginate(0);
  }

  constructor(private alertify: AlertifyService,
    private modalService: BsModalService,
    private merchDataService: MerchantDataService,
    private supportDataService: SupportDataService,
    private activatedRoute: ActivatedRoute,
    private exportService: ExportService,
    private profileService: ProfileService,
    private cd: ChangeDetectorRef) {
      this.dataSource = new MerchantDataSource(merchDataService);
      this.updateModel = new MerchantModel();
      this.cardData = [];
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchBoxText = params['search'];
    });
    this._dataSubscriber = this.dataSource.merchantsSubject.subscribe((data) => {
      if (this.showCards) {
        data.forEach((item) => {
          this.cardData.push(Object.assign({}, item));
        });
      }
    });
    this.dataSource.getTotalCount().subscribe(count => {
      this.totalCount = count;
    });

    this.showCards = <boolean>this.profileService.get('merchants.showCards') || false;

    this.paginate(0);
  }

  ngAfterViewInit(): void {
    this.updateGridProfile();
  }

  ngOnDestroy(): void {
    if (this._dataSubscriber) {
      this._dataSubscriber.unsubscribe();
    }
    this.dataSource.disconnect();
  }

  columnObj(index) {
    return this.merchColumns[index];
  }

  setColumnHidden(header, hidden) {
    const c = this.merchColumns.find(col => col.header === header);
    if (c) {
      c.hidden = hidden;
    }
  }

  cardsView() {
    this.showCards = true;
    this.cardData = [];
    this.paginate(0);
    this.profileService.set('merchants.showCards', this.showCards);
  }

  gridView() {
    this.showCards = false;
    setTimeout(() => this.updateGridProfile());
    this.paginate(0);
    this.profileService.set('merchants.showCards', this.showCards);
  }

  showDetails(mid: number) {
    const initialState = {
      id: mid
    };
    this.bsModalRef = this.modalService.show(MerchantDetailsComponent, {initialState});
  }

  public handleRowSelection(event) {
    const targetCell = event.cell;
    this.merchGrid.deselectAllRows();
    this.merchGrid.selectRows([targetCell.row.rowID]);
    this.selectedMerchantId = targetCell.row.rowData.midNumber;

    this.currentRowData  = targetCell.row.rowData;
  }

  public prePopulateSupportTicket() {
    this.supportTicket = new SupportTicketModel();
    if (this.selectedMerchantId > 0) {
      this.supportTicket.merchant.dbaName = this.currentRowData.dbaName;
      this.supportTicket.merchant.firstName = this.currentRowData.merchantFirstName;
      this.supportTicket.merchant.lastName = this.currentRowData.merchantLastName;
      this.supportTicket.merchant.phoneNumber = this.currentRowData.phoneNumber;
      this.supportTicket.merchant.emailAddress = this.currentRowData.emailAddress;
      this.supportTicket.mid = this.currentRowData.midNumber;
      this.supportTicket.id = 0;
      this.supportTicket.type = '';
      this.supportTicket.priority = '';
      this.supportTicket.desc = '';
    }
  }

  ticketAdded(ticket: SupportTicketModel) {
  }

  pageChanged(event) {
    this.paginate(event.page - 1);
  }

  requestParams(pageNo: number, count: number) {
    return {
      page: pageNo,
      pageSize: count,
      search: this.searchBoxText ? this.searchBoxText : null,
      sortByName: this.sortedColumn,
      sortAscending: this.sortDirection
    };
  }

  public paginate(page: number) {
    this.dataSource.loadMerchants(this.requestParams(page, this.perPage));
    this.selectedMerchantId = -1;
    this.currentRowData = null;
    this.page = page + 1;
  }

  loadMoreCards() {
    this.paginate(this.loadedCount / this.perPage);
    this.loadedCount += this.perPage;
  }

  allCardsLoaded(): boolean {
    if (this.loadedCount === 0) {
      this.loadedCount = this.perPage;
    }

    if (this.loadedCount >= this.totalCount) {
      return true;
    }
    return false;
  }

  search(searchText) {
    this.searchBoxText = searchText;
    this.cardData = [];
    this.paginate(0);
  }

  sortingDone() {
    while (this.merchGrid.sortingExpressions.length > 1) {
      this.merchGrid.sortingExpressions.shift();
    }
    const sort = this.merchGrid.sortingExpressions[0];
    if (sort && sort.fieldName) {
      this.sortedColumn = sort.fieldName;
      this.sortDirection = sort.dir === SortingDirection.Asc;
      this.profileService.set('merchants.grid.sortedColumn', this.sortedColumn);
      this.profileService.set('merchants.grid.sortDirection', this.sortDirection);
    } else {
      this.sortedColumn = null;
      this.sortDirection = true;
      this.profileService.remove('merchants.grid.sortedColumn');
      this.profileService.remove('merchants.grid.sortDirection');
    }
    this.paginate(0);
  }

  exportRule(column): string | Function {
    switch (column.header) {
      case 'Merchant Name':
        return (item) => item.merchantFirstName + ' ' + item.merchantLastName;
    }
    return column.field;
  }

  getAll(ready) {
    const ds = new MerchantDataSource(this.merchDataService);
    ds.connect();

    ds.loadMerchants(this.requestParams(0, this.totalCount));
    const _sub = ds.merchantsSubject.subscribe(items => {
      if (!items.length) {
        return;
      }
      const headers = {};
      this.merchColumns.forEach(col => {
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
      this.exportService.print('Merchants', headers, items);
    });
  }

  download() {
    this.getAll((headers, items) => {
      this.exportService.exportXlsxFile(headers, items, 'merchantExport', 'Merchants');
    });
  }


  ////////////////////////////////////
  // #region Grid profile save/restore
  columnResized(event) {
    this.profileService.set('merchants.grid.columns.' + event.column.header + '.width', event.newWidth);
  }

  columnVisibility(columns) {
    columns.forEach((c) => {
      if (!c.hidden) {
        this.profileService.remove('merchants.grid.columns.' + c.header + '.hidden');
      } else {
        this.profileService.set('merchants.grid.columns.' + c.header + '.hidden', c.hidden);
      }
      this.setColumnHidden(c.header, c.hidden);
    });
  }

  updateGridProfile() {
    const gridProfile = this.profileService.get('merchants.grid');

    if (gridProfile) {
      this.sortedColumn = <string>gridProfile.sortedColumn || '';
      const profileSortDir = <boolean>gridProfile.sortDirection;
      this.sortDirection = profileSortDir || typeof profileSortDir === 'undefined';

      if (this.merchGrid && this.sortedColumn) {
        this.merchGrid.sort({
          fieldName: this.sortedColumn,
          dir: this.sortDirection ? SortingDirection.Asc : SortingDirection.Desc
        });
      }

      if (gridProfile.columns) {
        for (const prop in gridProfile.columns) {
          if (!gridProfile.columns.hasOwnProperty(prop)) {
            continue;
          }
          if (this.merchGrid) {
            const column = this.merchGrid.columns.find((col) => col.header === prop);
            if (column) {
              if (gridProfile.columns[prop].hidden) {
                column.hidden = true;
              }
              if (gridProfile.columns[prop].width) {
                column.width = gridProfile.columns[prop].width;
              }
            }
          }
          this.setColumnHidden(prop, gridProfile.columns[prop].hidden);
        }
      }
    }

    this.cd.detectChanges();
  }
  // #endregion Grid profile save/restore
  ////////////////////////////////////

  cardContainerStyle() {
    return {
      'overflow-y': 'auto',
      'max-height': (window.innerHeight - 300).toString() + 'px'
    };
  }

  platformColorStyle(platform) {
    let color = 'green';
    switch (platform) {
      case 'BANA':
        color = 'darkcyan';
        break;
      case 'ANET':
        color = 'orange';
        break;
    }
    return {
      'color': 'white',
      'padding-left': '2px',
      'padding-right': '2px',
      'background-color': color
    };
  }

  platformName(platform) {
    return platform;
  }
}
