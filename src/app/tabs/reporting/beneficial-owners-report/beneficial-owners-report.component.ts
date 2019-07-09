import { Component, OnInit, Input } from '@angular/core';
import { ExportService } from 'src/app/_services/export.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileService } from 'src/app/_services/profile.service';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-beneficial-owners-report',
  templateUrl: './beneficial-owners-report.component.html',
  styleUrls: ['./beneficial-owners-report.component.scss']
})
export class BeneficialOwnersReportComponent implements OnInit {

  public checkModel = [
    1, // completed: true,
    0, // in-progress: false (formerly draft),
    0, // in-progress: false (formerly sent),
    0, // archived: false,
    0, // declined: false,
    0, // optedout: false,
    0, // expired: false
  ];

  @Input()
  public startDate?: number;
  @Input()
  public endDate?: number;

  constructor(
    private httpClient: HttpClient,
    private exportService: ExportService,
    private profileService: ProfileService
    ) {
      const cm = profileService.get('reports.bo.checkModel');
      if (cm) {
        this.checkModel = cm;
      }
    }

  ngOnInit() {
  }

  click(n: number) {
    // doing it with a delay as Angular needs a pause to properly update the DOM
    window.setTimeout(() => {
      this.checkModel[2] = this.checkModel[1]; // draft and in-progress are the same

      let sel = 0;
      for (let i = 0; !sel && i < this.checkModel.length; i++) {
        sel = this.checkModel[i];
      }
      // not allowing to uncheck all
      if (!sel) {
        this.checkModel[n] = 1;
      }

      this.checkModel[2] = this.checkModel[1]; // in case in-progress was last unchecked

      this.profileService.set('reports.bo.checkModel', this.checkModel);
    });
  }

  download() {
    this.getAll((headers, items) => {
      // this.exportService.exportXlsxFile(headers, items, 'Beneficial_Owners_' + formatDate(new Date(), 'yyyy_MM_dd', 'en-US'), 'BO');
      this.exportService.download('Beneficial_Owners_' + formatDate(new Date(), 'yyyy_MM_dd', 'en-US') + '.csv', items);
    });
  }

  requestParams() {
    let status = 0;
    for (let i = 0; i < this.checkModel.length; i++) {
      // tslint:disable-next-line:no-bitwise
      status |= this.checkModel[i];
    }
    return {
      statuses: status,
      statusez: this.checkModel,
      startDate: formatDate(this.startDate ? new Date(this.startDate) : new Date(0), 'yyyy-MM-dd', 'en-US'),
      endDate: formatDate(this.endDate ? new Date(this.endDate) : new Date(), 'yyyy-MM-dd', 'en-US')
    };
  }

  getAll(ready: Function) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({
      // 'Accept': 'text/csv',
      // 'Content-Type': 'text/csv',
      'no-cache': 'true'
    });
    this.httpClient.post(environment.reports.boUrl, this.requestParams(), {headers: headers, responseType: 'text'})
      .subscribe(data => ready(null, data));
  }

}
