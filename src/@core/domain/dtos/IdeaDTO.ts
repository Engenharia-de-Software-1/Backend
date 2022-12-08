export interface IIdeaInput{
    title: string;
    description: string;   
    userId: string;
}

export interface IIdeaOutput{
    id?: string;
    title: string;
    description: string;
    userId: string;
    situation: string;
    createdAt: Date;
    updatedAt: Date;
    views: number;
}

export interface ICreateIdea{
    title: string;
    description: string;
    userId: string;
}

export interface IIdeaUpdate{
    title?: string;
    description?: string;
}

export interface IIdeaFavoriteInput{
    userId?: string;
    ideaId: string;
}
