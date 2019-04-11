import { SupportMerchantModel } from './support-merchant-model';

export class SupportTicketModel {
    constructor() {
        this.merchant = new SupportMerchantModel();
    }
    assignedTo: string;
    assignedToId: number;
    assignedDate: number;
    attachments: Array<AttachmentModel>;
    createdBy: string;
    createdById: number;
    createdDate: number;
    desc: string;
    id: number;
    merchant: SupportMerchantModel;
    mid: number;
    priority: string;
    status: string;
    title: string;
    type: string;
    updatedBy: string;
    updatedById: number;
    updatedDate: number;
}

export class AttachmentModel {
    id: number;
    title: string;
}
