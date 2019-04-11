import { Component, OnInit, TemplateRef, ViewChild, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { SupportUserDataService } from 'src/app/_services/support-user-data.service';
import { UserAccessModel } from 'src/app/models/user-access-model';
import { IgxGridComponent, SortingDirection } from 'igniteui-angular';
import { Observable } from 'rxjs';
import { UsersDataSource } from './users-datasource';
import { ValueProcessingService } from 'src/app/_services/value-processing.service';
import { ExportService } from 'src/app/_services/export.service';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-user-access-management',
  templateUrl: './user-access-management.component.html',
  styleUrls: ['./user-access-management.component.css']
})
export class UserAccessManagementComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('usersGrid') public usersGrid: IgxGridComponent;
  public dataSource: UsersDataSource;

  public page = 1;
  public lastPage = false;
  public firstPage = true;
  public totalCount = 0;
  @ViewChild('pagerTemplate', { read: TemplateRef })
  public pager: TemplateRef<any>;

  selectedUserEmail: string;

  public searchBoxText = '';

  public sortedColumn = '';
  public sortDirection = false;

  private _perPage = 10;

  public get perPage(): number {
      return this._perPage;
  }

  public set perPage(val: number) {
      this._perPage = val;
      this.paginate(0);
  }

  constructor(private alertify: AlertifyService,
    private userDataService: SupportUserDataService,
    private valueService: ValueProcessingService,
    private exportService: ExportService,
    private profileService: ProfileService,
    private cd: ChangeDetectorRef) {
      this.dataSource = new UsersDataSource(userDataService);
  }

  ngOnInit() {
    this.dataSource.getTotalCount().subscribe(count => {
      this.totalCount = count;
    });
    this.paginate(0);
  }

  ngAfterViewInit(): void {
    this.updateGridProfile();
  }

  ngOnDestroy() {
    this.dataSource.disconnect();
  }

  refresh(user: UserAccessModel) {
    this.paginate(this.page - 1);
  }

  deleteUser(id: number) {
    this.userDataService.delete(id,
      () => {
        this.alertify.success('User has been deleted');
        this.paginate(this.page - 1);
      },
      (err => {
        this.alertify.error('An error has occured: ' + err);
      }));
  }

  createNewModel() {
    return new UserAccessModel();
  }

  pageChanged(event) {
    this.paginate(event.page - 1);
  }

  requestParams(page: number, perPage: number) {
    return {
      page: page,
      pageSize: perPage,
      search: this.searchBoxText ? this.searchBoxText : null,
      sortByName: this.sortedColumn ? this.sortedColumn : null,
      sortAscending: this.sortDirection
    };
  }

  public paginate(page: number) {
    this.dataSource.loadUsers(this.requestParams(page, this.perPage));
    this.page = page + 1;
  }

  public handleRowSelection(event) {
    const targetCell = event.cell;
    this.usersGrid.deselectAllRows();
    this.usersGrid.selectRows([targetCell.row.rowID]);
    this.selectedUserEmail = targetCell.row.rowData.email;
  }
  search(searchText) {
    this.searchBoxText = searchText;
    this.paginate(0);
  }

  userRoleTitle(value: string): string {
    return this.valueService.getUserRoleTitle(value);
  }

  sortingDone() {
    while (this.usersGrid.sortingExpressions.length > 1) {
      this.usersGrid.sortingExpressions.shift();
    }
    const sort = this.usersGrid.sortingExpressions[0];
    if (sort && sort.fieldName) {
      this.sortedColumn = sort.fieldName;
      this.sortDirection = sort.dir === SortingDirection.Asc;
      this.profileService.set('users.grid.sortedColumn', this.sortedColumn);
      this.profileService.set('users.grid.sortDirection', this.sortDirection);
    } else {
      this.sortedColumn = null;
      this.sortDirection = true;
      this.profileService.remove('users.grid.sortedColumn');
      this.profileService.remove('users.grid.sortDirection');
    }
    this.paginate(0);
  }

  exportRule(column): string | Function {
    switch (column.header) {
      case 'Role':
        return (item) => this.valueService.getUserRoleTitle(item.role);
    }
    return column.field;
  }

  getAll(ready) {
    const ds = new UsersDataSource(this.userDataService);
    ds.connect();
    ds.loadUsers(this.requestParams(0, this.totalCount));
    const _sub = ds.usersSubject.subscribe(items => {
      if (!items.length) {
        return;
      }

      const headers = {};
      this.usersGrid.columns.forEach(col => {
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
      this.exportService.print('Support users', headers, items);
    });
  }

  download() {
    this.getAll((headers, items) => {
      this.exportService.exportXlsxFile(headers, items, 'userExport', 'Users');
    });
  }

  ////////////////////////////////////
  // #region Grid profile save/restore

  columnResized(event) {
    this.profileService.set('users.grid.columns.' + event.column.header + '.width', event.newWidth);
  }

  columnVisibility(columns) {
    columns.forEach((c) => {
      if (!c.hidden) {
        this.profileService.remove('users.grid.columns.' + c.header + '.hidden');
      } else {
        this.profileService.set('users.grid.columns.' + c.header + '.hidden', c.hidden);
      }
    });
  }

  updateGridProfile() {
    if (!this.usersGrid) { return; }

    const gridProfile = this.profileService.get('users.grid');

    if (gridProfile) {
      this.sortedColumn = <string>gridProfile.sortedColumn || '';
      const profileSortDir = <boolean>gridProfile.sortDirection;
      this.sortDirection = profileSortDir || typeof profileSortDir === 'undefined';

      if (this.sortedColumn) {
        this.usersGrid.sort({
          fieldName: this.sortedColumn,
          dir: this.sortDirection ? SortingDirection.Asc : SortingDirection.Desc
        });
      }

      if (gridProfile.columns) {
        for (const prop in gridProfile.columns) {
          if (!gridProfile.columns.hasOwnProperty(prop)) {
            continue;
          }
          const column = this.usersGrid.columns.find((col) => col.header === prop);
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
