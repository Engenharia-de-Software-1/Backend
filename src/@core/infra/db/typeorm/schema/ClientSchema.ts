import { EntitySchema } from 'typeorm';
import { Client } from '../../../../domain/entities/client.entity';

export const ClientSchema = new EntitySchema({
  name: 'Client',
  target: Client,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    companyName: {
      type: String,
      nullable: true,
    },
    cnpj: {
      type: String,
      nullable: true,
    },
    profession: {
      type: String,
      nullable: false,
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
    viewsOnProfile: {
      type: Number,
      nullable: false,
    },
  },
});
