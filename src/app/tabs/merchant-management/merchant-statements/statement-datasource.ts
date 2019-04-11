import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MerchantStatementModel } from 'src/app/models/merchant-statement-model';
import { MerchantDataService } from 'src/app/_services/merchant-data.service';
import { merchStatements } from 'src/app/_services/test-data/data.statements';

export class StatementDataSource {

    public statementsData = new BehaviorSubject<any[]>([]);
    public statementYears = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private merchantService: MerchantDataService) {}

    connect(): Observable<MerchantStatementModel[]> {
        return this.statementsData.asObservable();
    }

    disconnect(): void {
        this.statementsData.complete();
        this.statementYears.complete();
        this.loadingSubject.complete();
    }

    loadStatements(params: any) {
        /*** TEST ROUTINE ***/
        this.statementsData.next(merchStatements);
        this.statementYears.next([2018, 2019]);
        return;
        /*** ****/

        this.loadingSubject.next(true);

        this.merchantService.getStatements(params).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(s => this.statementsData.next(s));
    }

    getYears(): Observable<number[]> {
        return this.statementYears.asObservable();
    }
}
