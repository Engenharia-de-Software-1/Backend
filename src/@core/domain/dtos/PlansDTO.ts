export interface IPlansInput {
    id: string;
    userId: string;
    plan: string;
}

export interface IPlansOutput {
    id: string;
    userId: string;
    plan: string;
    expirationDate: Date;
    createdAt: Date;
}

export interface IPlansUpdate{
    plan?: string;
    expirationDate?: Date;
}