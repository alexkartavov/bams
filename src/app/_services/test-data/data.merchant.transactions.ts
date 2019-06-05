import { OrderDetailModel } from 'src/app/models/order-detail';
import { OrderSummaryModel } from 'src/app/models/order-summary';

/* tslint:disable */
export const merchantOrderSummary: OrderSummaryModel = {
    currentStatus: 'Order Pending',
    lastUpdateDate: 1548968416000,
    merchantIdentifier: '',
    orderHistoryId: 102,
    orderId: 'kL8XE',
    orderStatus: 'Order Pending',
    orderStatusTime: 1548968401000
};

/* tslint:disable */
export const merchantOrderDetails: Array<OrderDetailModel> = [
    {
        orderId: 1,
        productName: 'Clover® Flex',
        price: 649,
        purchaseType: 'Purchase',
        quantity: 1
    },
    {
        orderId: 2,
        productName: 'Clover® Flex',
        price: 649,
        purchaseType: 'Purchase',
        quantity: 1
    }
];
