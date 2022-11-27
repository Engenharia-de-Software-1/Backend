
export interface Permisisons{
    [key: string]: boolean;
}
export interface IPlansInput {
    id: string;
    plan: string;
    permissions: Permisisons;
}

export interface IPlansOutput {
    id: string;
    plan: string;
    permissions: Permisisons;
}

export interface IPlansUpdate{
    plan?: string;
    permissions?: Permisisons;
}