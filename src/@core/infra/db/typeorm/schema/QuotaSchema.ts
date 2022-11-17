import { EntitySchema } from "typeorm/entity-schema/EntitySchema";
import { Quota } from "../../../../domain/entities/quota.entity";

export const QuotaSchema = new EntitySchema({
    name: 'Quota',
    target: Quota,
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
        expiratonDate: {
            type: String,
            nullable: false,
        }
    }
});