import { IIdeaInput, IIdeaOutput } from "../dtos/IdeaDTO";

export type IIdeaRepository = {
    insert(idea: IIdeaInput): Promise<void>;
    findAll(): Promise<IIdeaOutput[] | null>;
    findById(id: string, returnNull?: boolean): Promise<IIdeaOutput | null>;
    findByUserId(userId: string, returnNull?: boolean): Promise<IIdeaOutput[] | null>
    findByUserIdAndTitle(userId: string, title: string, returnNull?: boolean): Promise<IIdeaOutput | null>
    update(id: string, data: IIdeaOutput): Promise<void>;
    delete(id: string): Promise<void>;
};