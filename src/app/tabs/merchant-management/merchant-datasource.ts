import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { MerchantModel } from 'src/app/models/merchant-model';
import { MerchantDataService } from 'src/app/_services/merchant-data.service';

export class MerchantDataSource {

    public merchantsSubject = new BehaviorSubject<MerchantModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private merchantService: MerchantDataService) {}

    connect(): Observable<MerchantModel[]> {
        return this.merchantsSubject.asObservable();
    }

    disconnect(): void {
        this.merchantsSubject.complete();
        this.loadingSubject.complete();
    }

    loadMerchants(params: any, loaded?: Function) {
        this.loadingSubject.next(true);

        this.merchantService.getMerchants(params).pipe(
            map((response) => {
                if (loaded) { loaded(response); }
                return response;
            }),
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(m => this.merchantsSubject.next(m));
    }

    getTotalCount(): Observable<number> {
        return this.merchantService.getTotalCount();
    }
}
