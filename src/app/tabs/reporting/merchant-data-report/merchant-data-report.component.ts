import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { MerchantDataSource } from '../../merchant-management/merchant-datasource';
import { MerchantDataService } from 'src/app/_services/merchant-data.service';
import { ExportService } from 'src/app/_services/export.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-merchant-data-report',
  templateUrl: './merchant-data-report.component.html',
  styleUrls: ['./merchant-data-report.component.scss']
})
export class MerchantDataReportComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('merchGrid') public merchGrid: IgxGridComponent;
  dataSource: MerchantDataSource;

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

  constructor(private merchantDataService: MerchantDataService,
    private exportService: ExportService,
    private authService: AuthService) {
      this.dataSource = new MerchantDataSource(merchantDataService);
    }

  ngOnInit() {
    this.dataSource.getTotalCount().subscribe(count => this.totalCount = count);
    this.paginate(0);
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.paginate(0);
  }

  pageChanged(event) {
    this.paginate(event.page - 1);
  }

  requestParams(pageNo: number, count: number) {
    return {
      cepSupportUser: this.authService.getCepSupportUser(),
      listMerchantsRequest: {
        page: pageNo,
        pageSize: count,
        search: null,
        sortByName: null,
        sortAscending: null
      }
    };
  }

  public paginate(page: number, completed?: Function) {
    this.dataSource.loadMerchants(this.requestParams(page, this.perPage),
      (items) => {
        this.page = page + 1;
        if (completed) { completed(items); }
      });
  }

  exportRule(column): string | Function {
    switch (column.header) {
      case 'Merchant Name':
        return (item) => item.merchantFirstName + ' ' + item.merchantLastName;
    }
    return column.field;
  }

  getAll(ready: Function) {
    const ds = new MerchantDataSource(this.merchantDataService);
    ds.connect();
    ds.loadMerchants(this.requestParams(0, this.totalCount));
    const _sub = ds.merchantsSubject.subscribe(items => {
      if (!items.length) {
        return;
      }

      const headers = {};
      this.merchGrid.columns.forEach(col => {
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
      this.exportService.exportXlsxFile(headers, items, 'merchantDataExport', 'Merchants');
    });
  }

}
