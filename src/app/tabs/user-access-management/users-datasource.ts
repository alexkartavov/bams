import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserAccessModel } from 'src/app/models/user-access-model';
import { SupportUserDataService } from 'src/app/_services/support-user-data.service';
import { catchError, finalize } from 'rxjs/operators';

export class UsersDataSource {

    public usersSubject = new BehaviorSubject<UserAccessModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private userDataService: SupportUserDataService) {}

    connect(): Observable<UserAccessModel[]> {
        return this.usersSubject.asObservable();
    }

    disconnect(): void {
        this.usersSubject.complete();
        this.loadingSubject.complete();
    }

    loadUsers(params: any) {
        this.loadingSubject.next(true);

        this.userDataService.getUsers(params).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(users => this.usersSubject.next(users));
    }

    getTotalCount(): Observable<number> {
        return this.userDataService.getTotalCount();
    }
}
