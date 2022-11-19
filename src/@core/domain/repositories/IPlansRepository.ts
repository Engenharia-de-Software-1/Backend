import { IPlansInput, IPlansOutput, IPlansUpdate } from "../dtos/PlansDTO";


export type IPlansRepository = {
    insert(plan: IPlansInput): Promise<void>;
    findByUserId(id: string, returnNull?: boolean): Promise<IPlansOutput | null>;
    findAll(): Promise<IPlansOutput[] | null>;
    update(id: string, data: IPlansUpdate): Promise<IPlansOutput>;
    delete(id: string): Promise<void>;
};