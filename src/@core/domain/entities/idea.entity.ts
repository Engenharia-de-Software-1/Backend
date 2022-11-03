import { IIdeaOutput } from "../dtos/IdeaDTO";
import { createUUID } from "../utils/createUUID";

export type IIdeaProps = {
    id?: string;
    title: string;
    description: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export class Idea {
    public readonly id: string;
    public title: Required<IIdeaProps['title']>;
    public description: Required<IIdeaProps['description']>;
    public userId: Required<IIdeaProps['userId']>;
    public readonly createdAt: IIdeaProps['createdAt'];
    public updatedAt: IIdeaProps['updatedAt'];

    private constructor(props: IIdeaProps, id?: string) {
        this.id = id || createUUID();

        if (!props) {
            this.title = null;
            this.description = null;
            this.userId = null;
            this.createdAt = null;
            this.updatedAt = null;
            return;
        }

        this.title = props.title;
        this.description = props.description;
        this.userId = props.userId;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || new Date();
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

    public toJson(): IIdeaOutput {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            userId: this.userId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}