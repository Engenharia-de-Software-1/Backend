import { IIdeaFavoriteInput, IIdeaInput, IIdeaOutput } from "../dtos/IdeaDTO";

export type IIdeaRepository = {
    insert(idea: IIdeaInput): Promise<void>;
    findAll(): Promise<IIdeaOutput[] | null>;
    findById(id: string, returnNull?: boolean): Promise<IIdeaOutput | null>;
    findByUserId(userId: string, returnNull?: boolean): Promise<IIdeaOutput[] | null>
    findByUserIdAndTitle(userId: string, title: string, returnNull?: boolean): Promise<IIdeaOutput | null>
    update(id: string, data: IIdeaOutput): Promise<void>;
    updateSituation(id: string, situation: string): Promise<IIdeaOutput | null>;
    delete(id: string): Promise<void>;
};

export type IIdeaFavoriteRepository = {
    insert(ideaFavorite: IIdeaFavoriteInput): Promise<void>;
    findAll(userId: string): Promise<IIdeaOutput[] | null>;
    isIdeaFavoritedByUser(userId: string, ideaId: string): Promise<boolean>;
    delete(ideaId: string, userId: string): Promise<void>;
};