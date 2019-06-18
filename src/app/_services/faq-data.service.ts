import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FaqModel, CreateFaqModel } from '../models/faq-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FaqDataService implements OnDestroy {

  postUrl = environment.faqs.listPostUrl;
  createUrl = environment.faqs.createUrl;
  httpOptions: any;
  totalCountSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient,
    private auth: AuthService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        // 'Ocp-Apim-Subscription-Key': environment.faqs.ocpApimSubscriptionKey,
        // 'Ocp-Api-Trace': 'true',
        // 'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        // 'token': ''
      })
    };
  }

  ngOnDestroy(): void {
    this.totalCountSubject.complete();
  }

  getFaqs(params: any):  Observable<FaqModel[]> {
    return this.http.post(this.postUrl, params, this.httpOptions)
      .pipe(map<any, FaqModel[]>(data => {
        this.totalCountSubject.next(data.totalCount);
        return data.items;
      })
    );
  }

  getTotalCount(): Observable<number> {
    return this.totalCountSubject.asObservable();
  }

  createFaq(faq: FaqModel, successCallback, errorCallback) {
    const request = {
      topic: faq.topic,
      question: faq.question,
      answer: faq.answer,
      createdBy: this.auth.getUserId(),
      updatedBy: this.auth.getUserId(),
      isActive: true
    };

    this.http.post(this.createUrl, request, this.httpOptions)
      .pipe(
        retry(3),
        // catchError(this.handleError)
      ).subscribe(
        res => {
           successCallback();
        },
        err => {
           errorCallback(err);
        });
  }

}
