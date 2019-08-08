import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ExportService } from 'src/app/_services/export.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileService } from 'src/app/_services/profile.service';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { BoReportProgressComponent } from './bo-report-progress/bo-report-progress.component';

@Component({
  selector: 'app-beneficial-owners-report',
  templateUrl: './beneficial-owners-report.component.html',
  styleUrls: ['./beneficial-owners-report.component.scss']
})
export class BeneficialOwnersReportComponent implements OnInit {

  isReq = true;
  isDiscover = true;
  isProgress = false;

  boBlob = null;
  boBlobName = null;

  boDiscover = [];
  boProgress = [];
  boProgressIdx = 0;

  formModel: any;

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

  @ViewChild('boProgressWindow') public boProgressWindow: BoReportProgressComponent;

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
    this.boProgressWindow.openModal();
    this.getAll();
  }

  resetParams() {
    this.isReq = true;
    this.isDiscover = true;
    this.isProgress = false;

    this.boBlob = null;
    this.boBlobName = null;

    this.boDiscover = [];
    this.boProgress = [];
    this.boProgressIdx = 0;

    this.formModel = {
      idx: 0,
      statuses: 0,
      statusez: [1],
      startDate: formatDate(this.startDate ? new Date(this.startDate) : new Date(0), 'yyyy-MM-dd', 'en-US'),
      endDate: formatDate(this.endDate ? new Date(this.endDate) : new Date(), 'yyyy-MM-dd', 'en-US'),
      pageFrom: 1,
      pageSize: 100,
      packageDocuments: null
    };
  }

  getAll() {
    this.resetParams();
    this.formModel.statusez = this.checkModel;

    this.reqDiscover(this.formModel, this.checkModel, 0, 0, 1, 100);
  }

  reqDiscover(p_v, p_statusez, p_statusIdx, p_idx, p_pageFrom, p_pageSize) {
    if (!this.isDiscover) {
      return;
    }

    p_v.idx = p_idx;
    p_v.pageFrom = p_pageFrom;
    p_v.pageSize = p_pageSize;
    // only request statuses that are set
    do {
      p_v.statuses = p_statusez[p_statusIdx] ? Math.pow(2, p_statusIdx) : 0;
    }
    while (p_v.statuses === 0 && ++p_statusIdx < p_statusez.length);

    // no statuses set
    if (p_v.statuses === 0) {
      this.isReq = false;
      this.isDiscover = false;
      return;
    }

    this.boProgressWindow.setProgressParams('Discovering range ' +
                  p_pageFrom + ' - ' +
                  (p_pageFrom + p_pageSize - 1), 0, true, false);

    const headers = new HttpHeaders({
      'no-cache': 'true'
    });

    this.httpClient.post(environment.reports.POSTCSVDISCOVERYURL, p_v, {headers: headers})
      .subscribe((response: any) => {
        if (response) {
          if (response.PackageDocuments) {
            this.boDiscover.push(...response.PackageDocuments);
          }

          if (response.IsDone) {
            let nextStatus = p_statusIdx + 1;
            while (nextStatus < p_statusez.length && !p_statusez[nextStatus]) {
              nextStatus++;
            }
            if (nextStatus < p_statusez.length) {
              setTimeout(() => {
                this.reqDiscover(p_v, p_statusez, nextStatus, 0, 1, 100);
              });
            } else {
              setTimeout(() => {
                this.isDiscover = false;
                this.isProgress = true;
                p_v.pageFrom = 1;
                p_v.pageSize = 20;
                this.reqProgress(p_v, 0);
              });
            }
          } else {
            setTimeout(() => {
              this.reqDiscover(p_v, p_statusez, p_statusIdx, response.Idx, response.PageFrom, response.PageSize);
            });
          }
        }
      },
      error => {
        this.isReq = false;
        this.isDiscover = false;
      },
      () => {
        // this.isReq = false;
        // this.isDiscover = false;
      });
  }

  reqProgress(p_v, p_idx) {
    if (!this.isProgress) {
      return;
    }

    p_v.idx = p_idx;

    const i0 = p_idx * p_v.pageSize;
    const i1 = i0 + p_v.pageSize;

    const boDiscover = this.boDiscover;

    p_v.packageDocuments = boDiscover.slice(i0, i1);

    const discovered = (boDiscover && boDiscover.length !== 0) ? boDiscover.length : 1;

    const pct = this.boProgressIdx / discovered * 100.0;

    this.boProgressWindow.setProgressParams('Downloading ' + pct.toFixed(2) + '%', pct, false, true);

    const headers = new HttpHeaders({
      'no-cache': 'true'
    });

    this.httpClient.post(environment.reports.POSTCSVPROGRESSURL, p_v, {headers: headers})
      .subscribe((response: any) => {
        if (response) {
          if (response.CsvString) {
            this.boProgress.push(response.CsvString);
            this.boProgressIdx = this.boProgressIdx + p_v.packageDocuments.length;
          }

          const i2 = response.Idx * p_v.pageSize;
          if (i2 < boDiscover.length) {
            setTimeout(() => {
              this.reqProgress(p_v, response.Idx);
            });
          } else {
            this.boProgressWindow.cancel();
            const csv = this.boProgress.join('\r\n');
            this.exportService.download('Beneficial_Owners_' + formatDate(new Date(), 'yyyy_MM_dd', 'en-US') + '.csv', csv);
          }
        }
      },
      error => {
        this.isReq = false;
        this.isProgress = false;
      },
      () => {
        // this.isReq = false;
        // this.isProgress = false;
      });
  }

  cancelled() {
    this.isReq = false;
    this.isDiscover = false;
    this.isProgress = false;
  }

}
