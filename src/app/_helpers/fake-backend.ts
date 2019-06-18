import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Role } from '../models/role';
import { UserAccessModel } from '../models/user-access-model';
import { usersData } from '../_services/test-data/data.users';
import { merchData } from '../_services/test-data/data.merch';
import { faqData } from '../_services/test-data/data.faq';
import { ticketsData } from '../_services/test-data/data.tickets';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        const role = isLoggedIn && authHeader.split('.')[1];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            // authenticate - public
            if (request.url.endsWith('/user/authenticate') && request.method === 'POST') {
                const user = usersData.find(x => x.email === request.body.username && x.password === request.body.password);
                if (!user) {
                    return error('Email or password is incorrect');
                }
                return ok({
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    token: `fake-jwt-token.${user.role}`
                });
            }

            // get user profile by id
            if (request.url.match(/\/get-user-profile\/\d+$/) && request.method === 'GET') {
                if (!isLoggedIn) {
                    return unauthorised();
                }

                // get id from request url
                const urlParts = request.url.split('/');
                const id = parseInt(urlParts[urlParts.length - 1], 10);

                const user = usersData.find(x => x.id === id);
                return ok(user.userProfile ? JSON.parse(user.userProfile) : {});
            }

            // get user profile by id
            if (request.url.match(/\/save-user-profile\/\d+$/) && request.method === 'POST') {
                if (!isLoggedIn) {
                    return unauthorised();
                }

                // get id from request url
                const urlParts = request.url.split('/');
                const id = parseInt(urlParts[urlParts.length - 1], 10);

                const user = usersData.find(x => x.id === id);
                user.userProfile = JSON.stringify(request.body);
                return ok({});
            }

            // get user by id - admin or user (user can only access their own record)
            if (request.url.match(/\/user\/\d+$/) && request.method === 'GET') {
                if (!isLoggedIn) {
                    return unauthorised();
                }

                // get id from request url
                const urlParts = request.url.split('/');
                const id = parseInt(urlParts[urlParts.length - 1], 10);

                // only allow normal users access to their own record
                const currentUser = usersData.find(x => x.role === role);
                if (id !== currentUser.id && role !== Role.Admin) {
                    return unauthorised();
                }

                const user = usersData.find(x => x.id === id);
                return ok(user);
            }

            // get all users (admin only)
            if (request.url.endsWith('/list/user') && request.method === 'POST') {
                if (role !== Role.Admin) {
                    return unauthorised();
                }
                let users = usersData;
                if (request.body.search) {
                    users = users.filter(
                        x => x.firstName.indexOf(request.body.search) >= 0 ||
                            x.email.indexOf(request.body.search) >= 0 ||
                            x.lastName.indexOf(request.body.search) >= 0);
                }
                if (request.body.sortByName) {
                    users = users.sort((x1, x2) => {
                        if (x1[request.body.sortByName] > x2[request.body.sortByName]) {
                            return request.body.sortAscending ? 1 : -1;
                        }
                        if (x1[request.body.sortByName] < x2[request.body.sortByName]) {
                            return request.body.sortAscending ? -1 : 1;
                        }
                        return 0;
                    });
                }
                const totalCount = users.length;
                const start = request.body.page * request.body.pageSize;
                const end = start + request.body.pageSize > users.length ? users.length : start + request.body.pageSize;
                users = users.slice(start, end);
                return ok({
                    items: users,
                    totalCount: totalCount
                });
            }

            // get merchants
            if (request.url.endsWith('/list/merchants') && request.method === 'POST') {
                let merchants = merchData;
                if (request.body.search) {
                    merchants = merchants.filter(
                        x => x.dbaName.indexOf(request.body.search) >= 0 ||
                            x.emailAddress.indexOf(request.body.search) >= 0 ||
                            x.legalBusinessName.indexOf(request.body.search) >= 0 ||
                            x.merchantFirstName.indexOf(request.body.search) >= 0 ||
                            x.merchantLastName.indexOf(request.body.search) >= 0 ||
                            x.taxFilingName.indexOf(request.body.search) >= 0);
                }
                if (request.body.sortByName) {
                    merchants = merchants.sort((x1, x2) => {
                        if (x1[request.body.sortByName] > x2[request.body.sortByName]) {
                            return request.body.sortAscending ? 1 : -1;
                        }
                        if (x1[request.body.sortByName] < x2[request.body.sortByName]) {
                            return request.body.sortAscending ? -1 : 1;
                        }
                        return 0;
                    });
                }
                const totalCount = merchants.length;
                const start = request.body.page * request.body.pageSize;
                const end = start + request.body.pageSize > merchants.length ? merchants.length : start + request.body.pageSize;
                merchants = merchants.slice(start, end);
                return ok({
                    items: merchants,
                    totalCount: totalCount
                });
            }

            // get FAQs
            if (request.url.endsWith('/list/supportFAQ') && request.method === 'POST') {
                let faqs = faqData;
                if (request.body.search) {
                    faqs = faqs.filter(
                        x => x.question.indexOf(request.body.search) >= 0 ||
                            x.answer.indexOf(request.body.search) >= 0);
                }
                return ok({
                    items: faqs,
                    totalCount: faqs.length
                });
            }

            // get tickets
            if (request.url.endsWith('/list/ticket') && request.method === 'POST') {
                let tickets = ticketsData;
                if (request.body.search) {
                    tickets = tickets.filter(
                        x => x.title.indexOf(request.body.search) >= 0 ||
                            x.desc.indexOf(request.body.search) >= 0);
                }
                if (request.body.ticketPriority) {
                    tickets = tickets.filter(
                        x => x.priority === request.body.ticketPriority);
                }
                if (request.body.ticketStatus) {
                    tickets = tickets.filter(
                        x => x.status === request.body.ticketStatus);
                }
                if (request.body.ticketType) {
                    tickets = tickets.filter(
                        x => x.type === request.body.ticketType);
                }
                if (request.body.startDate) {
                    tickets = tickets.filter(
                        x => x.createdDate >= request.body.startDate);
                }
                if (request.body.endDate) {
                    tickets = tickets.filter(
                        x => x.createdDate <= request.body.endDate);
                }
                if (request.body.sortByName) {
                    tickets = tickets.sort((x1, x2) => {
                        if (x1[request.body.sortByName] > x2[request.body.sortByName]) {
                            return request.body.sortAscending ? 1 : -1;
                        }
                        if (x1[request.body.sortByName] < x2[request.body.sortByName]) {
                            return request.body.sortAscending ? -1 : 1;
                        }
                        return 0;
                    });
                }
                const totalCount = tickets.length;
                const start = request.body.page * request.body.pageSize;
                const end = start + request.body.pageSize > tickets.length ? tickets.length : start + request.body.pageSize;
                tickets = tickets.slice(start, end);
                return ok({
                    items: tickets,
                    totalCount: totalCount
                });
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))
        // call materialize and dematerialize to ensure delay even if an error is thrown
        // (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());

        // private helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, message: 'Unauthorised' });
        }

        function error(message) {
            return throwError({ status: 400, message });
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
