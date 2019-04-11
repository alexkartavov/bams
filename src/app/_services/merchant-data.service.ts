import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MerchantModel } from '../models/merchant-model';
import { MerchantDetailsModel } from '../models/merchant-details-model';
import { idLocale } from 'ngx-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class MerchantDataService implements OnDestroy {

  public postUrl = environment.merchants.listPostUrl;
  public getUrl = environment.merchants.getUrl;
  httpOptions: any;
  httpDetailsOptions: any;
  totalCountSubject = new BehaviorSubject<number>(0);

  public getDetailsUrl = environment.merchantDetails.detailsGetUrl;
  public getStatementsUrl = environment.merchantDetails.statementsGetUrl;

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
    this.httpDetailsOptions = {
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': environment.merchantDetails.ocpApimSubscriptionKey,
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

        // TODO remove once the endpoint returns merchantIds
        let id = 0;
        data.items.forEach(item => {
          item.id = ++id;
        });
        // END TODO

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

  getMerchantDelails(id: number): Observable<MerchantDetailsModel> {
    return this.http.get(this.getDetailsUrl.replace('{merchantId}', id.toString()), this.httpDetailsOptions)
      .pipe(map<any, MerchantDetailsModel>(data => data)
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
