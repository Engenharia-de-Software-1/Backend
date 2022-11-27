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
        plan: {
            type: String,
            nullable: false,
        },
        permissions: {
            type: 'json',
            nullable: false,
        },
    }
});