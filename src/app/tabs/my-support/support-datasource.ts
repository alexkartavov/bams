import { BehaviorSubject, Observable, of } from 'rxjs';
import { SupportTicketModel } from 'src/app/models/support-ticket';
import { SupportDataService } from 'src/app/_services/support-data.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { CommentModel } from 'src/app/models/comment-model';

export class SupportDataSource {

    public ticketsSubject = new BehaviorSubject<SupportTicketModel[]>([]);
    private commentsSubject = new BehaviorSubject<CommentModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private supportService: SupportDataService) {}

    connect(): Observable<SupportTicketModel[]> {
        return this.ticketsSubject.asObservable();
    }

    connectComments(): Observable<CommentModel[]> {
        return this.commentsSubject.asObservable();
    }

    disconnect(): void {
        this.ticketsSubject.complete();
        this.commentsSubject.complete();
        this.loadingSubject.complete();
    }

    loadTickets(params: any, loaded?: Function) {
        this.loadingSubject.next(true);

        this.supportService.getTickets(params).pipe(
            map((response) => {
                if (loaded) { loaded(response); }
                return response;
            }),
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(tix => this.ticketsSubject.next(tix));
    }

    getTotalCount(): Observable<number> {
        return this.supportService.getTotalCount();
    }

    loadComments(ticketId: number) {
        this.loadingSubject.next(true);

        this.supportService.getComments(ticketId).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(posts => this.commentsSubject.next(posts));
    }
}
