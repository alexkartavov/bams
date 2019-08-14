import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MerchantModel } from '../models/merchant-model';
import { MerchantDetailsModel } from '../models/merchant-details-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MerchantDataService implements OnDestroy {

  public postUrl = environment.merchants.listPostUrl;
  public getUrl = environment.merchantDetails.detailsGetUrl;
  httpOptions: any;
  totalCountSubject = new BehaviorSubject<number>(0);

  public getDetailsUrl = environment.merchantDetails.detailsGetUrl;
  public getStatementsUrl = environment.merchantDetails.statementsGetUrl;

  public getNotesUrl = environment.merchantDetails.notesGetUrl;
  public postNotesUrl = environment.merchantDetails.notesPostUrl;

  constructor(private http: HttpClient, private authService: AuthService) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
  }

  ngOnDestroy(): void {
    this.totalCountSubject.complete();
  }

  getMerchants(params: any):  Observable<MerchantModel[]> {
    return this.http.post(this.postUrl, params, this.httpOptions)
      .pipe(map<any, MerchantModel[]>(data => {
        this.totalCountSubject.next(data.totalCount);

        // TODO remove once the endpoint returns proper MIDs from FirstData
        if (!environment.production) {
          if (data.items.length > 0) {
            data.items[0].midNumber = 1249308;
          }
          if (data.items.length > 1) {
            data.items[1].midNumber = 1249309;
          }
          if (data.items.length > 2) {
            data.items[2].midNumber = 1249310;
          }
        }
        // END TODO

        return data.items;
      })
    );
  }

  getTotalCount(): Observable<number> {
    return this.totalCountSubject.asObservable();
  }

  getById(mid: number): Observable<MerchantModel> {
    return this.http.post(this.getUrl.replace('{merchantId}', mid.toString()), this.authService.getCepSupportUser(), this.httpOptions)
      .pipe(map<any, MerchantModel>(data => data.items[0])
    );
  }

  getMerchantDelails(id: number): Observable<MerchantDetailsModel> {
    return this.http.post(this.getDetailsUrl.replace('{merchantId}', id.toString()), this.authService.getCepSupportUser(), this.httpOptions)
      .pipe(map<any, MerchantDetailsModel>(data => data)
    );
  }

  getStatements(params: any) {
    return this.http
      .get(this.getStatementsUrl.replace('{merchantId}', params.merchantId).replace('{dateFrom}', params.dateFrom)
        .replace('{dateTo}', params.dateTo), this.httpOptions)
      .pipe(
        map((data: any) => {
          const statements = [];

          if (!data || !data.result || !data.result.statementRespMap || data.responseCode !== 'success') {
            return statements;
          }

          for (const year in data.result.statementRespMap) {
            if (!data.result.statementRespMap.hasOwnProperty(year) || year !== params.year) {
              continue;
            }
            const yearStat = data.result.statementRespMap[year];
            if (yearStat && yearStat.length) {
              yearStat.forEach(element => {
                statements.push(element);
              });
            }
          }
          return statements;
        })
    );
  }

  getNotes(appRefNo: string) {
    return this.http
      .post(this.getNotesUrl.replace('{appRefNo}', appRefNo), this.authService.getCepSupportUser(), this.httpOptions)
      .pipe(
        map((data: any) => {
          let notes = [];
          if (!data /*|| !data.result || !data.result.statementRespMap || data.responseCode !== 'success'*/) {
            return notes;
          }
          notes = data;
          return notes;
        })
    );
  }

  postNote(appRefNo, note) {
    const params = {
      'id': null,
      'applicationRefNo': appRefNo,
      'createdBy': this.authService.getUserId(),
      'createdOn': new Date().toISOString(),
      'updatedBy': null,
      'updatedOn': null,
      'notes': note
    };
    return this.http.post(this.postNotesUrl, params, this.httpOptions);
  }
}
