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
    createdAt: Date;
    updatedAt: Date;
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

    
