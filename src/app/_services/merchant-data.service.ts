import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MerchantModel } from '../models/merchant-model';

@Injectable({
  providedIn: 'root'
})
export class MerchantDataService implements OnDestroy {

  public postUrl = environment.merchants.listPostUrl;
  public getUrl = environment.merchants.getUrl;
  httpOptions: any;
  totalCountSubject = new BehaviorSubject<number>(0);

  public getStatementsUrl = environment.merchants.statementsGetUrl;

  constructor(private http: HttpClient) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': environment.merchants.ocpApimSubscriptionKey,
        'Ocp-Api-Trace': 'true',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'token': ''
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
        return data.items;
      })
    );
  }

  getTotalCount(): Observable<number> {
    return this.totalCountSubject.asObservable();
  }

  getById(mid: number): Observable<MerchantModel> {
    return this.http.get(this.getUrl.replace('{mid}', mid.toString()), this.httpOptions)
      .pipe(map<any, MerchantModel>(data => data.items[0])
    );
  }

  getStatements(params: any) {

    const groupBy = (array, funcProp) => {
      return array.reduce(function (acc, val) {
            (acc[funcProp(val)] = acc[funcProp(val)] || []).push(val);
            return acc;
        }, {});
    };

    const propsToArray = (data) => {
        const a = [];
        for (const i in data) {
          if (!data.hasOwnProperty(i)) {
            continue;
          }
          a.push(i);
        }
        return a;
    };

    return this.http
      .post(this.getStatementsUrl, params, this.httpOptions)
      .pipe(
        map((data: any) => {
          return data;
        })
    );
  }
}
