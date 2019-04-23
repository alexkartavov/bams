import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MerchantStatementModel } from 'src/app/models/merchant-statement-model';
import { MerchantDataService } from 'src/app/_services/merchant-data.service';

export class StatementDataSource {

    public statementsData = new BehaviorSubject<MerchantStatementModel[]>([]);
    public statementYears = new BehaviorSubject<string[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private merchantService: MerchantDataService) {}

    connect(): Observable<MerchantStatementModel[]> {
        return this.statementsData.asObservable();
    }

    disconnect(): void {
        this.statementsData.complete();
        this.loadingSubject.complete();
    }

    loadStatements(params: any) {

        this.loadingSubject.next(true);

        this.merchantService.getStatements(params).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(s => this.statementsData.next(s));
    }
}
