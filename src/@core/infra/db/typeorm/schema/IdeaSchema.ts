import { EntitySchema } from "typeorm";
import { Idea, IdeaFavorite } from "src/@core/domain/entities/idea.entity";

export const IdeaSchema = new EntitySchema({
    name: "Idea",
    target: Idea,
    columns: {
        id: {
            type: "uuid",
            primary: true,
        },
        title: {
            type: String,
            nullable: false,
        },
        description: {
            type: String,
            nullable: true,
        },
        userId: {
            type: String,
            nullable: false,
        },
        situation: {
            type: String,
            nullable: false,
        },
        favorites: {
            type: Number,
            nullable: false,
        },
        createdAt: {
            type: String,
            nullable: false,
        },
        updatedAt: {
            type: String,
            nullable: false,
        },
        views: {
            type: Number,
            nullable: false,
        },
    },
});

export const IdeaFavoriteSchema = new EntitySchema({
    name: "IdeaFavorite",
    target: IdeaFavorite,
    columns: {
        id: {
            type: "uuid",
            primary: true,
            nullable: false,
        },
        ideaId: {
            type: "uuid",
            primary: true,
            nullable: false,
        },
        userId: {
            type: String,
            primary: true,
            nullable: false,
        },
        createdAt: {
            type: String,
            nullable: false,
        },
        updatedAt: {
            type: String,
            nullable: false,
        },
    },
});