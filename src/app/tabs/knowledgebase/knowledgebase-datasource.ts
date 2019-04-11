import { BehaviorSubject, Observable, of } from 'rxjs';
import { FaqModel } from 'src/app/models/faq-model';
import { catchError, finalize } from 'rxjs/operators';
import { FaqDataService } from 'src/app/_services/faq-data.service';

export class KnowledgebaseDataSource {

    private faqSubject = new BehaviorSubject<FaqModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private faqService: FaqDataService) {}

    connect(): Observable<FaqModel[]> {

        return this.faqSubject.asObservable();
    }

    disconnect(): void {
        this.faqSubject.complete();
        this.loadingSubject.complete();
    }

    loadFaqs(params: any) {
        this.loadingSubject.next(true);

        this.faqService.getFaqs(params).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(faqs => this.faqSubject.next(faqs));
    }

    getTotalCount(): Observable<number> {
        return this.faqService.getTotalCount();
    }
}
