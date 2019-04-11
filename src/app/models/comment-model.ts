export class CommentModel {
    id: number;
    parentPostId: number;
    title: string;
    body: string;
    createdBy: string;
    createdById: number;
    createdOn: number;
    updatedBy: string;
    updatedById: number;
    updatedOn: number;
}

export class CommentCreateModel {
    ticketId: number;
    userId: number;
    parentPostId: number;
    title: string;
    body: string;
}
