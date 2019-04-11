export class FaqModel {
    topic: string;
    question: string;
    answer: string;
    // cepSupportFaqId: number;
    // createdBy: number;
    // createdOn: string;
    // isActive: boolean;
    // updatedBy: number;
    // updatedOn: string;
}

export class CreateFaqModel {
    topic: string;
    question: string;
    answer: string;
    createdBy: number;
    isActive: boolean;
}
