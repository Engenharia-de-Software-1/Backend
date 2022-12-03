import { IIdeaOutput } from "../dtos/IdeaDTO";
import { createUUID } from "../utils/createUUID";

export type IIdeaProps = {
    id?: string;
    title: string;
    description: string;
    userId: string;
    situation?: string;
    createdAt?: Date;
    updatedAt?: Date;
    viewsOnIdea?: number;
};

export type IIdeaFavoriteProps = {
    id?: string;
    ideaId: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export class Idea {
    public readonly id: string;
    public title: Required<IIdeaProps['title']>;
    public description: Required<IIdeaProps['description']>;
    public userId: Required<IIdeaProps['userId']>;
    public situation: Required<IIdeaProps['situation']>;
    public readonly createdAt: IIdeaProps['createdAt'];
    public updatedAt: IIdeaProps['updatedAt'];
    public viewsOnIdea: IIdeaProps['viewsOnIdea'];

    private constructor(props: IIdeaProps, id?: string) {
        this.id = id || createUUID();

        if (!props) {
            this.title = null;
            this.description = null;
            this.userId = null;
            this.createdAt = null;
            this.updatedAt = null;
            this.viewsOnIdea = null;
            return;
        }

        this.title = props.title;
        this.description = props.description;
        this.userId = props.userId;
        this.situation = props.situation || 'pending';
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || new Date();
        this.viewsOnIdea = props.viewsOnIdea || 0;
    }

    static create(props: IIdeaProps, id?: string): Idea {
        return new Idea(props, id);
    }

    public updateTitle(title: string): void {
        this.title = title;
    }

    public updateDescription(description: string): void {
        this.description = description;
    }

    public updateViewsOnIdea(): void {
        this.viewsOnIdea = this.viewsOnIdea + 1;
    }

    public toJson(): IIdeaOutput {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            userId: this.userId,
            situation: this.situation,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            viewsOnIdea: this.viewsOnIdea,
        };
    }
}

export class IdeaFavorite {
    public readonly id: string;
    public readonly ideaId: IIdeaFavoriteProps['ideaId'];
    public readonly userId: IIdeaFavoriteProps['userId'];
    public readonly createdAt: IIdeaFavoriteProps['createdAt'];
    public readonly updatedAt: IIdeaFavoriteProps['updatedAt'];
    

    private constructor(props: IIdeaFavoriteProps, id?: string) {
        this.id = id || createUUID();

        if (!props) {
            this.ideaId = null;
            this.userId = null;
            this.createdAt = null;
            this.updatedAt = null;
            return;
        }

        this.ideaId = props.ideaId;
        this.userId = props.userId;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || new Date();
    }

    static create(props: IIdeaFavoriteProps, id?: string): IdeaFavorite {
        return new IdeaFavorite(props, id);
    }
}