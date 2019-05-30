import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserAccessModel } from '../models/user-access-model';
import { ValueProcessingService } from './value-processing.service';

@Injectable({
  providedIn: 'root'
})
export class SupportUserDataService implements OnDestroy {

  public postUrl = environment.users.listPostUrl;
  public createUrl = environment.users.createUrl;
  public userUrl = environment.users.userUrl;
  public profileGetUrl = environment.users.profileGetUrl;
  public profileSetUrl = environment.users.profileSetUrl;
  httpOptions: any;
  httpOptionsNoKey: any;
  totalCountSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private valueService: ValueProcessingService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': environment.users.ocpApimSubscriptionKey,
        'Ocp-Api-Trace': 'true',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'token': ''
      })
    };

    this.httpOptionsNoKey = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      })
    };
  }

  ngOnDestroy(): void {
    this.totalCountSubject.complete();
  }

  public getUsers(params: any): Observable<UserAccessModel[]> {
    return this.http.post(this.postUrl, params, this.httpOptions)
      .pipe(map<any, UserAccessModel[]>(data => {
        this.totalCountSubject.next(data.totalCount);
        return data.items;
      })
    );
  }

  getTotalCount(): Observable<number> {
    return this.totalCountSubject.asObservable();
  }

  getById(id: number): Observable<UserAccessModel> {
    return this.http.post(this.userUrl.replace('{user_id}', id.toString()), {}, this.httpOptions)
      .pipe(map<any, UserAccessModel>(data => data.items != null && data.items.length > 0 ? data.items[0] : null)
    );
  }

  createUser(user: UserAccessModel, successCallback, errorCallback) {
    const request = {
      user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          bana: false,
          lvmh: false,
          anet: true,
          bams: false
      },
      password: user.password
    };

    this.http.post(this.createUrl, request, this.httpOptions)
      .pipe(
        retry(3)
      ).subscribe(
        res => {
           successCallback();
        },
        err => {
          console.log(err);
          errorCallback(err.message);
        });
  }

  update(user: UserAccessModel, successCallback, errorCallback) {
    const request = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        userProfile: user.userProfile
    };

    this.http.put(this.userUrl.replace('{user_id}', user.id.toString()), request, this.httpOptions)
      .pipe(
        retry(3)
      ).subscribe(
        res => {
           successCallback();
        },
        err => {
          console.log(err);
          errorCallback(err.message);
        });
  }

  delete(userId: number, successCallback, errorCallback) {
    this.http.delete(this.userUrl.replace('{user_id}', userId.toString()), this.httpOptions)
      .pipe(
        retry(3)
      )
      .subscribe(
        res => {
           successCallback();
        },
        err => {
          console.log(err);
          errorCallback(err.message);
        }
    );
  }

  getProfile(userId: number): Observable<any> {
    return this.http.get<any>(this.profileGetUrl.replace('{user_id}', userId.toString()), this.httpOptionsNoKey);
  }

  setProfile(userId: number, profile: any) {
    this.http.post(this.profileSetUrl.replace('{user_id}', userId.toString()), profile, this.httpOptionsNoKey)
      .subscribe(
        () => {},
        err => {
          console.error(err);
        }
      );
  }
}
