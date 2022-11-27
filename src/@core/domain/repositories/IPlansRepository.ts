import { IPlansInput, IPlansOutput, IPlansUpdate } from "../dtos/PlansDTO";


export type IPlansRepository = {
    insert(plan: IPlansInput): Promise<void>;
    findAll(): Promise<IPlansOutput[] | null>;
    findById(id: string, returnNull?: boolean): Promise<IPlansOutput | null>;
    findByName(name: string, returnNull?: boolean): Promise<IPlansOutput | null>;
    update(id: string, data: IPlansUpdate): Promise<IPlansOutput>;
    delete(id: string): Promise<void>;
};