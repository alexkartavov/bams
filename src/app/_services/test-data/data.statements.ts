import { MerchantStatementModel } from '../../models/merchant-statement-model';

/* tslint:disable */
export const merchStatements: Array<MerchantStatementModel> = [
    {
        id: 1,
        mid: 89710987,
        date: new Date("12/1/2018"),
        type: "Statement",
        size: "4 pages",
        url: "/statements?id=1"
    },
    {
        id: 2,
        mid: 89710987,
        date: new Date("1/1/2019"),
        type: "Statement",
        size: "4 pages",
        url: "/statements?id=2"
    },
    {
        id: 3,
        mid: 89710987,
        date: new Date("2/1/2019"),
        type: "Statement",
        size: "2 pages",
        url: "/statements?id=2"
    }
];
