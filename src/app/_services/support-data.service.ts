import { Injectable, OnDestroy } from '@angular/core';
import { SupportTicketModel } from '../models/support-ticket';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { ValueProcessingService } from './value-processing.service';
import { CommentModel, CommentCreateModel } from '../models/comment-model';
import { ExportService } from './export.service';

@Injectable({
  providedIn: 'root'
})
export class SupportDataService implements OnDestroy {

  postUrl = environment.tickets.listPostUrl;
  createUrl = environment.tickets.createPostUrl;
  updateStatusUrl = environment.tickets.statusPostUrl;
  assignUrl = environment.tickets.assignPostUrl;
  commentsUrl = environment.tickets.listCommentsUrl;
  createCommentUrl = environment.tickets.createCommentUrl;
  httpOptions: any;
  httpFileOptions: any;

  constructor(
      private http: HttpClient,
      private auth: AuthService,
      private valueService: ValueProcessingService,
      private exportService: ExportService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        // 'Ocp-Apim-Subscription-Key': environment.tickets.ocpApimSubscriptionKey,
        // 'Ocp-Api-Trace': 'true',
        // 'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        // 'token': ''
      })
    };

    this.httpFileOptions = {
      headers: new HttpHeaders({
        // 'Ocp-Apim-Subscription-Key': environment.tickets.ocpApimSubscriptionKey,
        // 'Ocp-Api-Trace': 'true',
        // 'Cache-Control': 'no-cache',
        // 'Content-Type': 'application/json',
        // 'token': ''
      }),
      responseType: 'blob' as 'json'
    };
  }

  ngOnDestroy(): void {
  }

  getTickets(params: any, totalCountFeedback?):  Observable<SupportTicketModel[]> {
    return this.http.post(this.postUrl, params, this.httpOptions)
      .pipe(map<any, SupportTicketModel[]>(data => {
        if (totalCountFeedback) {
          totalCountFeedback(data.totalCount);
        }
        return data.items;
      })
    );
  }

  createTicket(ticket: SupportTicketModel, successCallback, errorCallback) {
    const request = {
      desc: ticket.desc,
      mid: ticket.mid,
      priority: ticket.priority,
      title: ticket.title,
      type: ticket.type,
      userId: this.auth.getUserId()
    };

    this.http.post(this.createUrl, request, this.httpOptions)
      .pipe(
        retry(3),
        // catchError(this.handleError)
      ).subscribe(
        res => {
           successCallback(res);
        },
        err => {
           errorCallback(err.message);
        });
  }

  updateStatus(ticketId: number, status: string, successCallback, errorCallback) {
    let url = this.updateStatusUrl;
    url = url.replace('{ticket_id}', ticketId.toString());
    url = url.replace('{status}', status);
    const request: any = {};
    if (status === this.valueService.statusClosed) {
      request.resolvedDate = Date.now();
    }
    this.http.post(url, request, this.httpOptions)
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

  assign(ticketId: number, userId: number, successCallback, errorCallback) {
    let url = this.assignUrl;
    url = url.replace('{ticket_id}', ticketId.toString());
    url = url.replace('{user_id}', userId.toString());
    this.http.post(url, {}, this.httpOptions)
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

  uploadAttachment(ticketId: number, file, successCallback: Function, errorCallback: Function) {
    const formData = new FormData();
    formData.append('file', file, file.name);

    this.http.post(environment.tickets.uploadUrl.replace('{ticket_id}', ticketId.toString())
      + '?userId=' + this.auth.getUserId().toString(),
      formData, this.httpFileOptions)
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

  downloadAttachment(attachmentId: number, filename: string, successCallback?: Function, errorCallback?: Function) {
    this.http.get(environment.tickets.downloadUrl.replace('{attachment_id}', attachmentId.toString()), this.httpFileOptions)
    .subscribe(
      (res: any) => {
        this.exportService.download(filename, res, res.type);
        if (successCallback) { successCallback(); }
      },
      err => {
         if (errorCallback) { errorCallback(err); }
      });
  }

  getComments(ticketId): Observable<CommentModel[]> {
    return this.http.get(this.commentsUrl.replace('{ticket_id}', ticketId.toString()), this.httpOptions)
      .pipe(map<any, CommentModel[]>(data => data.items)
    );
  }

  createComment(comment: CommentCreateModel, successCallback, errorCallback) {

    this.http.post(this.createCommentUrl, comment, this.httpOptions)
      .pipe(
        retry(3),
        // catchError(this.handleError)
      ).subscribe(
        res => {
           successCallback();
        },
        err => {
           errorCallback(err.message);
        });
  }

  handleError(error: HttpErrorResponse)  {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
