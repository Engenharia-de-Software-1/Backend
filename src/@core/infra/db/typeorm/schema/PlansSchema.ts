import { EntitySchema } from "typeorm/entity-schema/EntitySchema";
import { Plans } from "../../../../domain/entities/plans.entity";

export const PlansSchema = new EntitySchema({
    name: 'Plans',
    target: Plans,
    columns: {
        id: {
            type: 'uuid',
            primary: true,
        },
        userId: {
            type: String,
            nullable: false,
        },
        plan: {
            type: String,
            nullable: false,
        },
        expirationDate: {
            type: String,
            nullable: false,
        },
        createdAt: {
            type: String,
            nullable: false,
        }
    }
});