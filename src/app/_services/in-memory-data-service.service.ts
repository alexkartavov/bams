import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { usersData } from './test-data/data.users';
import { faqData } from './test-data/data.faq';
import { merchData } from './test-data/data.merch';
import { merchStatements } from './test-data/data.statements';
import { ticketsData } from './test-data/data.tickets';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataServiceService implements InMemoryDbService {

constructor() { }

createDb() {
  return {
    supportUser: usersData,
    supportFAQ: faqData,
    application: merchData,
    statements: merchStatements,
    ticket: ticketsData
  };
}

}
