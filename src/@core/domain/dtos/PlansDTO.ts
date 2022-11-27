export interface IPlansInput {
    id: string;
    plan: string;
    permissions: string;
}

export interface IPlansOutput {
    id: string;
    plan: string;
    permissions: string;
}

export interface IPlansUpdate{
    plan?: string;
    permissions?: string;
}