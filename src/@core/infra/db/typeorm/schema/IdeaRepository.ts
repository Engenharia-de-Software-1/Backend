import { EntitySchema } from "typeorm";
import { Idea } from "src/@core/domain/entities/idea.entity";

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